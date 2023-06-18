<template>
	<div id="uploaded-files" class="bg-white lg:p-6 px-4 py-6 overflow-y-scroll scrollbar-none rounded-xl" :class="!GET_CURRENT_COMPANY && 'blur-sm pointer-events-none'">
		<!-- Top heading -->
		<div class="flex justify-between items-center pl-4">
			<div class="flex items-center gap-3">
				<img src="@/assets/img/pages/dashboard/documents/icons/file.svg" class="w-5" />
				<h1 class="text-sm uppercase font-semibold">Uploaded files</h1>
			</div>
			<div v-if="uploadedFiles.length">
				<nuxt-link to="/dashboard/documents">
					<div
						class="hidden md:flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full cursor-pointer">
						<p class="text-xs font-semibold">Go to Files</p>
						<img src="@/assets/img/pages/dashboard/documents/arrow-right.svg" />
					</div>
				</nuxt-link>
			</div>
			<div v-else>
				<nuxt-link to="/dashboard/documents">
					<div
						class="hidden md:flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full cursor-pointer">
						<p class="text-xs font-semibold">Upload One</p>
						<img src="@/assets/img/pages/dashboard/documents/arrow-right.svg" />
					</div>
				</nuxt-link>
			</div>
		</div>
		<div v-if="uploadedFiles.length" class="my-5">
			<div v-for="(file, index) in uploadedFiles" :key="index"
				class="bg-lighterBlue hover:bg-lightestBlue transition-all duration-200 ease-linear bg-opacity-60 rounded-lg cursor-pointer px-4 py-5 my-3">
				<a :href="file.file" target="_blank">
					<div class="flex items-center gap-4">
						<div
							class="sm:h-12 h-10 sm:w-12 w-10 sm:rounded-2xl rounded-xl bg-blackish flex justify-center items-center sm:p-2 p-2.5">
							<img :src="
								require('@/assets/img/pages/dashboard/documents/icons/' +
									file.format.toLowerCase() +
									'.svg')
							" alt="" />
						</div>
						<h1 class="text-sm font-semibold">
							{{ file.name }}.{{ file.format }}
						</h1>
					</div>
				</a>
			</div>
			<nuxt-link to="/dashboard/documents">
				<div
					class="w-max ml-auto md:hidden flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full cursor-pointer mt-3">
					<p class="text-xs font-semibold">Go to Files</p>
					<img src="@/assets/img/pages/dashboard/documents/arrow-right.svg" />
				</div>
			</nuxt-link>
		</div>
		<div v-else>
			<NotFound heading="No Document Found" description="Unfortunatly You Haven't Uploaded Any Document." />
			<div>
				<nuxt-link to="/dashboard/documents">
					<div
						class="w-max ml-auto md:hidden flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full mt-3 cursor-pointer">
						<p class="text-xs font-semibold">Upload One</p>
						<img src="@/assets/img/pages/dashboard/documents/arrow-right.svg" />
					</div>
				</nuxt-link>
			</div>
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data: () => ({
		uploadedFiles: [
		]
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
	},
};
</script>

<style scoped>
#uploaded-files {
	height: 400px;
}

@media screen and (max-width: 1023px) {
	#uploaded-files {
		height: 370px;
	}
}
</style>
