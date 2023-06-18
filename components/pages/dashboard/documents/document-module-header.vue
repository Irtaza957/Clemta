<template>
	<div class="flex lg:flex-row flex-col items-center justify-between gap-y-4 mb-4 lg:px-0 px-5">
		<!-- SEARCH FORM -->
		<div class="w-full max-w-lg">
			<form @submit.prevent="onSearch">
				<div class="flex flex-row-reverse items-center gap-4 w-10/12 bg-white rounded-lg px-4">
					<input type="text" @keyup="debounce" placeholder="Search" class="py-2.5 outline-none text-sm w-full"
						v-model="searchInput" />
					<button type="submit" class="outline-none">
						<img src="@/assets/img/pages/dashboard/taxation/search.svg" />
					</button>
				</div>
			</form>
		</div>
		<div class="relative flex-shrink-0 flex flex-wrap md:items-center gap-4">
			<button class="bg-normalBlue text-white rounded-full py-2 px-5 text-sm uppercase"
				@click="showCreateFolderModal = true">
				Create folder
			</button>
			<button class="bg-blackish text-white rounded-full py-2 px-5 text-sm uppercase"
				@click="isUploadDocument = !isUploadDocument">
				Upload document
			</button>
			<!-- UPLOAD DOCUMENT POPUP -->
			<template v-if="isUploadDocument">
				<UploadFileModal @close="isUploadDocument = false" @getRecentFiles="$emit('getRecentFiles')" />
				<div class="fixed top-0 left-0 h-full w-screen z-10" @click="isUploadDocument = false" />
			</template>
		</div>
		<!-- CREATE NEW FOLDER MODAL -->
		<template v-if="showCreateFolderModal">
			<CreateFolderModal @close="showCreateFolderModal = false" />
		</template>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import CreateFolderModal from "./folder-modals/create-folder-modal.vue";
import UploadFileModal from "./file-modals/upload-file-modal.vue";

export default {
	components: {
		UploadFileModal,
		CreateFolderModal
	},

	data: () => ({
		searchInput: '',
		searchResult: [],
		showCreateFolderModal: false,
		isUploadDocument: false,
		timeout: null
	}),

	methods: {
		...mapActions({
			SEARCH_FILE: "fileManager/SEARCH_FILE",
		}),
		debounce() {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				this.onSearch();
			}, 1000);

		},
		onSearch() {
			let folder_id = this.$route.params.folderid
			if (folder_id === undefined) {
				folder_id = "0"
			}
			this.$emit('load', true)
			this.SEARCH_FILE({ search: this.searchInput, folderid: folder_id })
				.then((response) => {
					if (response.data.data) {
						this.searchResult = response.data.data
					} else {
						this.searchResult = []
					}
					this.$emit('load', false)
					this.$emit('showSearch', this.searchResult)
					this.searchInput === '' ? this.$emit('search', false) : this.$emit('search', true)
				})
		},
	}
}
</script>