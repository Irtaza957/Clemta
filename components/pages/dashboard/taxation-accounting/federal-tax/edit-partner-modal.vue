<template>
	<DashboardModal :maxWidth="'max-w-4xl'" @close="$emit('close')">
		<h1 class="text-xl text-center mb-6">Edit Partner</h1>
		<ValidationObserver v-slot="{ handleSubmit }" ref="addPartnerForm">
			<form class="flex flex-col gap-4" @submit.prevent="handleSubmit(editPartner)">
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="First name" rules="required">
						<input v-model="partnerForm.first_name" type="text" placeholder="First Name" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="Last name" rules="required">
						<input v-model="partnerForm.last_name" type="text" placeholder="Last Name" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="Capital Contribution" rules="required">
						<input v-model="partnerForm.capital_contribution" type="number"
							placeholder="Capital Contribution" :class="
								errors[0]
									? 'border-red-600 placeholder-red-600'
									: 'border-gray-300'
							" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="Owned" rules="required">
						<input v-model="partnerForm.owned" type="number" placeholder="%Owned" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="Address" rules="required">
						<input v-model="partnerForm.address" type="text" placeholder="Street Address" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="phone" rules="required">
						<input v-model="partnerForm.phone" type="text" placeholder="Phone #" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="SSN" rules="required">
						<input v-model="partnerForm.ssn" type="text" placeholder="Partner ssn" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="City" rules="required">
						<input v-model="partnerForm.city" type="text" placeholder="City" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="State" rules="required">
						<input v-model="partnerForm.state" type="text" placeholder="State" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="Zipcode" rules="required">
						<input v-model="partnerForm.zipcode" type="text" placeholder="Zipcode" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="flex justify-end items-center flex-wrap gap-3 mt-3">
					<button type='button' class="text-xs uppercase bg-normalBlue text-white p-3 w-32 rounded-full"
						@click="$emit('close')">
						Cancel
					</button>
					<button type="submit" class="text-xs uppercase bg-blackish text-white p-3 w-32 rounded-full"
						:disabled="disableButton">
						Update
					</button>
				</div>
			</form>
		</ValidationObserver>
	</DashboardModal>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
	props: {
		selectedPartner: {
			type: Object,
			default: () => { },
			required: true
		}
	},
	data() {
		return {
			disableButton: false,
			partnerForm: {
				owned: null,
				capital_contribution: null,
				ssn: '',
				first_name: '',
				last_name: '',
				address: '',
				city: '',
				state: '',
				zipcode: '',
				phone: ''
			},
		}
	},
	computed: {
		...mapGetters({
			GET_FEDERAL_ID: "federalTaxation/GET_FEDERAL_ID",
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_FEDERAL_PARTNER: "federalTaxation/GET_FEDERAL_PARTNER"

		}),
	},
	mounted() {
		this.partnerForm = this.selectedPartner
	},
	methods: {
		...mapActions({
			UPDATE_PARTNER: "federalTaxation/UPDATE_PARTNER",
		}),
		...mapMutations({
			SET_FEDERAL_PARTNERS: "federalTaxation/SET_FEDERAL_PARTNERS"
		}),
		editPartner() {
			this.partnerForm.owned = parseInt(this.partnerForm.owned)
			this.UPDATE_PARTNER({ company_id: this.GET_CURRENT_COMPANY.id, federalTaxID: this.GET_FEDERAL_ID, partnerID: this.selectedPartner.id, form: this.partnerForm })
				.then((response) => {
					this.disableButton = false
					let arr = [];
					this.GET_FEDERAL_PARTNER.forEach((partner, index) => {
						if (this.selectedPartner.id === partner.id) {
							partner = this.selectedPartner
						}
						arr.push(partner);
					});
					this.SET_FEDERAL_PARTNERS(arr)
					this.$toast.success({
						title: "Partner updated! ",
						message: "Partner has been updated successfully",
					})
					this.$emit("close");
				})
				.catch((error) => {
					this.disableButton = false
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				});
		},
	},
};
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}
</style>