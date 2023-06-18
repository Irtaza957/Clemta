<template>
	<DashboardCard>
		<div class="flex justify-between items-start mb-3">
			<h1 class="text-xs uppercase font-extrabold">Payment Method</h1>
			<a :href="changePlanRedirect"
				class="text-xs py-2.5 px-6 rounded-full bg-normalBlue text-white uppercase hover:underline">Edit</a>
		</div>

		<div>
			<div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
				<p>Payment method</p>
				<p class="font-semibold">**** **** **** <span>{{ lastFour }}</span></p>
			</div>
			<div class="flex justify-between items-center font-extrabold uppercase text-xs mt-6 mb-3">
				<h1>Billing History</h1>
				<nuxt-link to="/settings/billing-history" class="border-b border-blackish pb-px">View all</nuxt-link>
			</div>
			<div class="h-40 overflow-y-auto">
				<div v-for="(item, index) in recentBillingHistory" :key="index"
					class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mb-2">
					<p>{{ $moment((new Date(item.paid_at * 1000))).format("DD MMMM YYYY") }}</p>
					<p>${{ (item.amount / 100).toFixed(2) }}</p>
				</div>
			</div>
		</div>
	</DashboardCard>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			lastFour: '',
			recentBillingHistory: []
		}
	},
	props: {
		changePlanRedirect: {
			type: String,
			default: () => ''
		}
	},

	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		})
	},

	mounted() {
		this.GET_COMPANY_PAYMENT_METHOD({ company_id: this.GET_CURRENT_COMPANY.id }).then(response => {
			this.lastFour = response.data.last4
		})
		this.GET_COMPANY_RECENT_BILLING_HISTORY({ company_id: this.GET_CURRENT_COMPANY.id }).then(response => {
			this.recentBillingHistory = response.data.histories
		})

	},

	methods: {
		...mapActions({
			GET_COMPANY_PAYMENT_METHOD: "settings/GET_COMPANY_PAYMENT_METHOD",
			GET_COMPANY_RECENT_BILLING_HISTORY: "settings/GET_COMPANY_RECENT_BILLING_HISTORY"
		}),
	}
}
</script>

<style scoped>
/* SCROLLBAR STYLING */

/* width */
::-webkit-scrollbar {
	width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #CCCCCC;
	border-radius: 10em;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #2E465C;
	border-radius: 10em;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>