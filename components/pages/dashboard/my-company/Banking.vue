
<template>
	<div class="mt-4">
		<div
			class="flex justify-center items-center sm:flex-row flex-col md:gap-24 sm:gap-16 gap-7 bg-white rounded-xl px-5 md:py-12 py-8">
			<div class="w-max text-center">
				<p class="text-sm">Available</p>
				<h2 class="text-xl">$9324.15</h2>
			</div>
			<!--  -->
			<div class="w-max text-center">
				<p class="">Current Balance</p>
				<h2 class="text-3xl">$9324.15</h2>
			</div>
			<!--  -->
			<div class="w-max text-center">
				<p class="text-sm">Legal Business Name</p>
				<h2 class="font-semibold">Mercury Technologies Inc.</h2>
			</div>
		</div>
		<div class="grid md:grid-cols-2 grid-cols-1 gap-4 mt-4">
			<div class="bg-white rounded-xl p-5">
				<ClemtaGraph />
			</div>
			<div class="bg-white rounded-xl md:p-7 p-5">
				<div v-for="(transaction, index) in allTransactions" :key="index" class="md:max-w-xs w-full mx-auto">
					<p class="text-xs capitalize font-semibold mt-5">
						{{ transaction.date }}
					</p>
					<div v-for="(account, idx) in transaction.transactions" :key="idx"
						class="w-full bg-lighterBlue text-sm p-3 rounded-md flex justify-between items-center mt-2.5">
						<p>${{ account.name }}</p>
						<p>${{ account.amount }}</p>
					</div>
				</div>
				<p
					class="w-max block mx-auto pb-px border-b border-blackish text-xs font-semibold uppercase cursor-pointer mt-8">
					SEE ALL transactions
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import ClemtaGraph from "../taxation-accounting/clemta-graph.vue";
export default {
	components: {
		ClemtaGraph,
	},
	data: () => ({
		allTransactions: [
			{
				id: 1,
				date: "today",
				transactions: [
					{
						id: 1,
						name: "Rocco's Cafe",
						amount: "-$33",
					},
					{
						id: 2,
						name: "Fake P. Erson",
						amount: "-$150",
					},
				],
			},
			{
				id: 2,
				date: "21 Sept",
				transactions: [
					{
						id: 1,
						name: "Jack Clark",
						amount: "-$324",
					},
					{
						id: 2,
						name: "Damian Pavela",
						amount: "+$1400",
					},
				],
			},
		],
	}),
};
</script>

<style lang=""></style>
