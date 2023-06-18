<template>
	<div>
		<!-- <button class="text-xs bg-normalBlue text-white py-3 px-7 rounded-full w-max block ml-auto my-4 md:mr-0 mr-5"
			@click="addShareHolderModal = true">
			Add Shareholder
		</button> -->
		<div v-if="allShareHolders.length && !loading" class="grid md:grid-cols-12 grid-cols-1 lg:gap-6">
			<div class="shareholders-container md:col-span-5 col-span-1 mt-7">
				<div class="shareholders flex flex-col gap-4 sm:mx-10 mx-6">
					<div v-for="(shareholder, index) in allShareHolders" :key="index" :class="
						shareholder.email === selectedShareHolder
							? 'border border-blackish cursor-default'
							: 'border border-white opacity-30 cursor-pointer'
					" class="flex items-center gap-4 bg-white rounded-lg transition-all duration-200 ease-linear lg:p-6 p-5"
						@click="selectShareholder(shareholder)">
						<div class="h-9 w-9 rounded-full bg-gray-200"></div>
						<div>
							<h2 class="font-bold text-xl mb-1 text-blackish">{{ shareholder.name }}</h2>
							<p class="text-base">{{ shareholder.title }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="w-full md:col-span-7 col-span-1 mt-6">
				<div class="flex flex-col gap-8 rounded-lg bg-white px-6 py-8 mx-6 md:mx-0">
					<div>
						<h2 class="font-extrabold text-sm mb-1 text-blackish">Mailing Address</h2>
						<p>{{ detail.mailing_address }}</p>
					</div>
					<div>
						<h2 class="font-extrabold text-sm mb-1 text-blackish">Email Address</h2>
						<p>{{ detail.email }}</p>
					</div>
					<div>
						<h2 class="font-extrabold text-sm mb-1 text-blackish">Phone Number</h2>
						<p>{{ detail.phone_number }}</p>
					</div>
					<div>
						<h2 class="font-extrabold text-sm mb-1 text-blackish">Social Media URL</h2>
						<p>{{ detail.social_media_url }}</p>
					</div>
				</div>
			</div>
		</div>
		<div v-else-if="loading">
			<shareholderLoader />
		</div>
		<!-- ADD SHAREHOLDER MODAL -->
		<!-- <template v-if="addShareHolderModal">
			<AddSharehoderModal @close='addShareHolderModal = false' />
		</template> -->
		<div v-else>
			<NotFound class="py-9" heading="No ShareHolder Found"
				description="Unfortunatly You Haven't Created Any ShareHolder Yet." />
		</div>
	</div>

</template>

<script>
import { mapActions } from 'vuex';
import shareholderLoader from './shareholder-loader.vue';
// import AddSharehoderModal from './add-sharehoder-modal.vue'
export default {
	components: {
		// AddSharehoderModal
		shareholderLoader
	},
	data: () => ({
		// addShareHolderModal: false,	
		loading: false,
		selectedShareHolder: '',
		allShareHolders: [],
		detail: {
			mailing_address: "",
			email: "",
			phone_number: "",
			social_media_url: "",
		}
	}),
	mounted() {
		this.getAllShareholders()
	},
	methods: {
		...mapActions({
			GET_ALL_SHAREHOLDERS: 'myCompany/GET_ALL_SHAREHOLDERS',
		}),

		getAllShareholders() {
			this.loading = true;
			this.GET_ALL_SHAREHOLDERS()
				.then((response) => {
					this.loading = false;
					if (response.data.data && response.data.data.length) {
						this.allShareHolders = response.data.data
						this.selectedShareHolder = this.allShareHolders[0].email
						this.detail.email = this.allShareHolders[0].email
					} else {
						this.allShareHolders = []
					}
				})
		},

		selectShareholder(shareholder) {
			this.selectedShareHolder = shareholder.email
			this.detail.mailing_address = shareholder.street_address
			this.detail.email = shareholder.email
			this.detail.phone_number = shareholder.phone_number
			this.detail.social_media_url = shareholder.social_media_url
		}
	}
};
</script>

<style scoped>
.shareholders-container {
	max-height: 90vh;
	overflow-y: auto;
	transform: rotateY(180deg);
}

.shareholders-container .shareholders {
	/* direction: ltr; */
	transform: rotateY(-180deg);
}

.add-issue-modal {
	max-height: 90vh;
}

/* width */
.shareholders-container::-webkit-scrollbar {
	width: 8px;
	border-radius: 1rem;
}

/* Track */
.shareholders-container::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 1rem;
}

/* Handle */
.shareholders-container::-webkit-scrollbar-thumb {
	background: #cbe7e8;
	border-radius: 1rem;
}
</style>
