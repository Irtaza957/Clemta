<template>
	<div>
		<div class="grid md:grid-cols-2 grid-cols-1 lg:gap-x-8 gap-x-5 gap-y-6 my-6">
			<!-- Company details -->
			<CompanyDetails />

			<!-- Service progress -->
			<ServiceProgress />

			<!-- Tax events -->
			<TaxEvents />

			<!-- Uploaded files -->
			<UploadedFiles />
		</div>
		<!-- <div v-if="pendingOrders.length">
			<PendingOrdersModal v-if="isPendingOrders" @close="isPendingOrders = false"
				:pendingOrders='pendingOrders' />
		</div> -->
	</div>
</template>

<script>
import PendingOrdersModal from "../../components/pages/dashboard/pending-orders-modal.vue";
import CompanyDetails from "../../components/pages/dashboard/homepage/company-details.vue";
import ServiceProgress from "../../components/pages/dashboard/homepage/service-progress.vue";
import TaxEvents from "../../components/pages/dashboard/homepage/tax-events.vue";
import UploadedFiles from "../../components/pages/dashboard/homepage/uploaded-files.vue";

export default {
	layout: 'dashboard-layout',
	data: () => ({
		isPendingOrders: true,
	}),
	components: {
		CompanyDetails,
		ServiceProgress,
		TaxEvents,
		UploadedFiles,
		PendingOrdersModal
	},
	mounted() {
		this.checkPaymentStatus()
		this.$store.dispatch('authentication/FETCH_USER_COMPANIES')
	},
	methods: {
		checkPaymentStatus() {
			if (this.$route.query.paid === 'success') {
				this.$toast.success({
					title: "Success",
					message: "Payment Successfull."
				});
			} else if (this.$route.query.paid === 'failed') {
				this.$toast.error({
					title: "Error",
					message: 'Payment Failed'
				});
			}
		}
	}
};
</script>
