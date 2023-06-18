<template>
	<DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
		<div class="max-w-xs w-full mx-auto">
			<h1 class="sm:text-2xl text-xl text-center font-semibold mb-6">
				Delete Transactions
			</h1>
			<div class="grid grid-cols-2 gap-4 mt-5">
				<button type="button" class="text-sm p-4 w-full rounded-full bg-normalBlue text-white uppercase"
					@click="$emit('close')">
					Cancel
				</button>
				<button @click="batchRemove" class="text-sm p-4 w-full rounded-full bg-blackish text-white uppercase">
					Confirm
				</button>
			</div>
		</div>
	</DashboardModal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	props: {
		selectedBookkeeping: {
			type: Array,
			default: () => [],
		}
	},
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
		}),
	},
	methods: {
		...mapActions({
			BATCH_REMOVE_TRANSACTION: "bookKeeping/BATCH_REMOVE_TRANSACTION",
		}),

		batchRemove() {
			let obj = {
				ids: []
			}
			for (let i = 0; i < this.selectedBookkeeping.length; i++) {
				obj.ids.push(this.selectedBookkeeping[i].id)
			}
			this.BATCH_REMOVE_TRANSACTION({ company_id: this.GET_CURRENT_COMPANY.id, obj: obj })
				.then(response => {
					this.$emit('batch')
					this.$toast.success({
						title: "Batch Removed",
						message: 'Batch removed successfully',
					});
				})
				.catch(error => {
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				})
		},

	}
}
</script>
