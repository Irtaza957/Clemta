<template>
	<DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
		<div class="max-w-xs w-full mx-auto">
			<h1 class="sm:text-2xl text-xl font-semibold w-full text-center mb-5">
				Billing Address
			</h1>
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(onSubmit)">
					<div class="w-full flex flex-col items-center gap-3">
						<ValidationProvider v-slot="{ errors }" name="address line 1" class="w-full">
							<input v-model="form.addr1" type="text" placeholder="Address Line 1"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="address line 2" class="w-full">
							<input v-model="form.addr2" type="text" placeholder="Address Line 2"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="city" class="w-full">
							<input v-model="form.city" type="text" placeholder="City"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="state" class="w-full">
							<input v-model="form.state" type="text" placeholder="State"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="zipCode" class="w-full">
							<input v-model="form.zipcode" type="text" placeholder="Zip Code"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="country" class="w-full">
							<input v-model="form.country" type="text" placeholder="Country"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
					</div>
					<div class="flex items-center justify-center gap-4 mt-5">
						<button type="button"
							class="text-xs sm:text-sm w-28 sm:w-36 py-2 rounded-full bg-normalBlue text-white uppercase"
							@click="$emit('close')">
							Cancel
						</button>
						<button type="submit" v-bind:disabled="isLoading"
							class="text-xs sm:text-sm w-28 sm:w-36 py-2 rounded-full bg-blackish text-white uppercase">
							<span v-if="!isLoading">Save</span>
							<span v-if="isLoading" class="flex text-sm">
								<svg class="animate-spin ml-1 mr-3 h-5 w-5 text-white"
									xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
										stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor"
										d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
									</path>
								</svg>
								Processing
							</span>
						</button>
					</div>
				</form>
			</ValidationObserver>
		</div>
	</DashboardModal>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {

	data: () => ({
		isLoading: false,
		form: {
			addr1: '',
			addr2: '',
			city: '',
			state: '',
			country: '',
			zipcode: ''
		}
	}),

	created() {
		if (this.GET_CURRENT_COMPANY.billing_address) {
			this.form.addr1 = this.GET_CURRENT_COMPANY.billing_address.addr1 ? this.GET_CURRENT_COMPANY.billing_address.addr1 : ''
			this.form.addr2 = this.GET_CURRENT_COMPANY.billing_address.addr2 ? this.GET_CURRENT_COMPANY.billing_address.addr2 : ''
			this.form.city = this.GET_CURRENT_COMPANY.billing_address.city ? this.GET_CURRENT_COMPANY.billing_address.city : ''
			this.form.state = this.GET_CURRENT_COMPANY.billing_address.state ? this.GET_CURRENT_COMPANY.billing_address.state : ''
			this.form.country = this.GET_CURRENT_COMPANY.billing_address.country ? this.GET_CURRENT_COMPANY.billing_address.country : ''
			this.form.zipcode = this.GET_CURRENT_COMPANY.billing_address.zipcode ? this.GET_CURRENT_COMPANY.billing_address.zipcode : ''
		}
	},

	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
	},

	methods: {
		...mapActions({
			UPDATE_BILLING_ADDRESS: "settings/UPDATE_BILLING_ADDRESS",
			FETCH_USER_COMPANIES: "authentication/FETCH_USER_COMPANIES"
		}),
		...mapMutations({
			SET_CURRENT_COMPANY: "authentication/SET_CURRENT_COMPANY",
			SET_USER_COMPANIES: "authentication/SET_USER_COMPANIES",
		}),

		async onSubmit() {
			this.isLoading = true;

			this.UPDATE_BILLING_ADDRESS({ company_id: this.GET_CURRENT_COMPANY.id, form: this.form })
				.then(response => {
					this.FETCH_USER_COMPANIES().then(response => {
						console.log(response)
						for (let i = 0; i < response.data.data.companies.length; i++) {
							if (response.data.data.companies[i].id == this.GET_CURRENT_COMPANY.id) {
								this.$store.commit('authentication/SET_USER_COMPANIES', response.data.data.companies)
								this.$store.commit('authentication/SET_CURRENT_COMPANY', response.data.data.companies[i])
							}
						}
					})

					this.$emit('close')
					this.isLoading = false;
					this.$toast.success({
						title: "Billing Address Updated",
						message: response.data.message,
					});
				})
				.catch((error) => {
					this.isLoading = false;
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				})
		}
	}
}
</script>
