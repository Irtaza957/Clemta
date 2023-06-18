<template>
	<div>
		<!-- Dashboard Main Section -->
		<div class="overflow-x-scroll scrollbar-none">
			<div v-if="!viewAllTransactions" class="my-6">
				<div class="grid md:grid-cols-2 grid-cols-1 gap-6">
					<div class="bg-white rounded-xl sm:p-7 p-3">
						<ClemtaGraph />
					</div>
					<div class="bg-white rounded-xl p-7">
						<BankingOverview />
					</div>
				</div>
				<!-- TRANSACTIONS LIST -->
				<div class="bg-white rounded-xl pb-6">
					<AllTransactions :show-small-list="6" />
					<p class="w-max mx-auto text-xs uppercase font-semibold pb-px cursor-pointer border-b border-blackish"
						@click="viewAllTransactions = true">
						View all transactions
					</p>
				</div>
			</div>
			<div v-else>
				<AllTransactions />
			</div>
		</div>
	</div>
</template>

<script>
import ClemtaGraph from "../../../../components/pages/dashboard/taxation-accounting/clemta-graph.vue";
import BankingOverview from "../../../../components/pages/dashboard/taxation-accounting/book-keeping/banking-overview.vue";
import AllTransactions from "../../../../components/pages/dashboard/taxation-accounting/book-keeping/all-transactions.vue";

export default {
	layout: 'dashboard-layout',

	components: {
		ClemtaGraph,
		BankingOverview,
		AllTransactions,
	},

	data: () => ({
		viewAllTransactions: false,
	})
};
</script>

