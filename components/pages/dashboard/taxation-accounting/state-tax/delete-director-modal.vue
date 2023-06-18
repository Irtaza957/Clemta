<template>
	<DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
		<div class="max-w-xs w-full mx-auto">
			<h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
				Delete Director
			</h1>
			<p class="text-center text-base">
				Are you sure you want to delete this Director?
			</p>
			<div class="grid grid-cols-2 gap-4 mt-5">
				<button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
					@click="$emit('close')">
					Cancel
				</button>
				<button type="submit" class="text-sm p-4 w-full rounded-full bg-blackish text-white uppercase"
					:disabled="disableButton" @click="deleteDirector">
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
		selectedDirector: {
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
			GET_STATE_ID: "stateTaxation/GET_STATE_ID",
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_STATE_STAKEHOLDERS: "stateTaxation/GET_STATE_STAKEHOLDERS"

		}),
	},
	methods: {
		...mapActions({
			DELETE_PARTNER_DIRECTOR: "stateTaxation/DELETE_PARTNER_DIRECTOR",
		}),
		...mapMutations({
			SET_STATE_PARTNERS: "stateTaxation/SET_STATE_PARTNERS"
		}),
		deleteDirector() {
			this.DELETE_PARTNER_DIRECTOR({ company_id: this.GET_CURRENT_COMPANY.id, stateTaxID: this.GET_STATE_ID, partnerID: this.selectedDirector.id })
				.then((response) => {
					this.disableButton = false
					let arr = [];
					this.GET_STATE_STAKEHOLDERS.forEach((partner, index) => {
						if (partner.role === 'partner') {
							arr.push(partner)
						}
						else if (partner.role === 'director' && this.selectedDirector.id !== partner.id) {
							arr.push(partner)
						}
					});
					this.SET_STATE_PARTNERS(arr)
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
