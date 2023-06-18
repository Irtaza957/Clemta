<template>
	<DashboardModal :maxWidth="'max-w-4xl'" @close="$emit('close')">
		<h1 class="text-xl text-center mb-6 mt-44 sm:mt-auto">Edit Partner</h1>
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
					<ValidationProvider v-slot="{ errors }" name="Middle name" rules="required">
						<input v-model="partnerForm.middle_name" type="text" placeholder="Middle Name" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="Last name" rules="required">
						<input v-model="partnerForm.last_name" type="text" placeholder="Last Name" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
					<ValidationProvider v-slot="{ errors }" name="Title" rules="required">
						<input v-model="partnerForm.title" type="text" placeholder="Title" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<div class="flex items-center gap-2 my-2.5">
					<input v-model="partnerForm.non_us_address" disabled type="checkbox" id="non-us" class="cursor-pointer"/>
					<label for="non-us" class="text-sm">Non-us address</label>
				</div>
				<div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
					<ValidationProvider v-slot="{ errors }" name="Address" rules="required">
						<input v-model="partnerForm.address" type="text" placeholder="Street Address" :class="
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
					<ValidationProvider v-slot="{ errors }" name="Zipcode" rules="">
						<input disabled v-model="partnerForm.zip_code" type="text" placeholder="Zipcode" :class="
							errors[0]
								? 'border-red-600 placeholder-red-600'
								: 'border-gray-300'
						" class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
					</ValidationProvider>
				</div>
				<ValidationProvider v-slot="{ errors }" name="Country" rules="required">
					<div :class="
						errors[0]
							? 'border-red-600 placeholder-red-600'
							: 'border-gray-300'
					" class="relative w-full border rounded-lg pr-4">
						<select v-model="partnerForm.country"
							class="selectCountry py-3.5 px-3 rounded-lg text-sm sm:w-full w-52 outline-none">
							<option selected disabled :value="null">Country</option>
							<option value="USA">USA</option>
							<option value="UK">UK</option>
							<option value="UAE">UAE</option>
						</select>
						<svg class="-mr-1 ml-2 h-5 w-5 absolute top-4 right-3" xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd"
								d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
								clip-rule="evenodd" />
						</svg>
					</div>
				</ValidationProvider>
				<div class="sm:flex grid grid-cols-2 justify-end items-center flex-wrap gap-3 mt-3">
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
				role: 'partner',
				first_name: "",
				middle_name: "",
				last_name: "",
				title: '',
				// non_us_address: false,
				address: "",
				city: "",
				state: "",
				// zip_code: "",
				country: null,
			},
		}
	},
	computed: {
		...mapGetters({
			GET_STATE_ID: "stateTaxation/GET_STATE_ID",
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_STATE_STAKEHOLDERS: "stateTaxation/GET_STATE_STAKEHOLDERS"
		}),
	},
	mounted() {
		this.partnerForm = this.selectedPartner
	},
	methods: {
		...mapActions({
			UPDATE_PARTNER_DIRECTOR: "stateTaxation/UPDATE_PARTNER_DIRECTOR",
		}),
		...mapMutations({
			SET_STATE_PARTNERS: "stateTaxation/SET_STATE_PARTNERS"
		}),
		editPartner() {
			this.UPDATE_PARTNER_DIRECTOR({ company_id: this.GET_CURRENT_COMPANY.id, stateTaxID: this.GET_STATE_ID, partnerID: this.selectedPartner.id, form: this.partnerForm })
				.then((response) => {
					this.disableButton = false
					let arr = [];
					this.GET_STATE_STAKEHOLDERS.forEach((partner, index) => {
						if (this.selectedPartner.id === partner.id) {
							partner = this.selectedPartner
						}
						arr.push(partner);
					});
					this.SET_STATE_PARTNERS(arr)
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
.selectCountry {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}
</style>