<template>
	<DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
		<div class="max-w-xs w-full mx-auto">
			<h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
				Delete Partner
			</h1>
			<p class="text-center text-base">
				Are you sure you want to delete this partner?
			</p>
			<div class="grid grid-cols-2 gap-4 mt-5">
				<button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
					@click="$emit('close')">
					Cancel
				</button>
				<button type="submit" class="text-sm p-4 w-full rounded-full bg-blackish text-white uppercase"
					:disabled="disableButton" @click="deletePartner">
					Delete
				</button>
			</div>
		</div>
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
			disableButton: false
		}
	},
	computed: {
		...mapGetters({
			GET_FEDERAL_ID: "federalTaxation/GET_FEDERAL_ID",
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_FEDERAL_PARTNER: "federalTaxation/GET_FEDERAL_PARTNER"
		}),
	},
	methods: {
		...mapActions({
			DELETE_PARTNER: "federalTaxation/DELETE_PARTNER",
		}),
		...mapMutations({
			SET_FEDERAL_PARTNERS: "federalTaxation/SET_FEDERAL_PARTNERS"
		}),
		deletePartner() {
			this.DELETE_PARTNER({ company_id: this.GET_CURRENT_COMPANY.id, federalTaxID: this.GET_FEDERAL_ID, partnerID: this.selectedPartner.id })
				.then((response) => {
					this.disableButton = false
					let arr = [];
					this.GET_FEDERAL_PARTNER.forEach((partner, index) => {
						if (this.selectedPartner.id !== partner.id) {
							arr.push(partner)
						}
					});
					this.SET_FEDERAL_PARTNERS(arr)
					this.$toast.success({
						title: "Deleted! ",
						message: "Successfully deleted",
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
	}
}
</script>
