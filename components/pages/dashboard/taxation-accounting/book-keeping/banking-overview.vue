<template>
	<div>
		<h1 class="text-xs uppercase font-semibold mb-7">Banking Overview</h1>
		<!-- BANKING OVERVIEW LIST -->
		<div>
			<div class="flex justify-end items-center gap-5 text-xs font-semibold px-3 mb-3">
				<p class="w-20 truncate uppercase">Expenses</p>
				<p class="w-20 truncate uppercase">Income</p>
			</div>
			<div v-for="(overview, index) in overviewList" :key="index"
				class="bg-lighterBlue text-sm p-3 rounded-md flex justify-between items-center mt-2">
				<p>{{ overview.title }}</p>
				<div class="flex items-center gap-5">
					<p class="w-20 truncate">${{ overview.expenses }}</p>
					<p class="w-20 truncate">${{ overview.income }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data: () => ({
		overviewList: [
			{
				id: 1,
				title: "Monthly",
				expenses: 1288.01,
				income: 1278.01,
			},
			{
				id: 2,
				title: "Weekly",
				expenses: 158.07,
				income: 158.07,
			},
			{
				id: 3,
				title: "Average",
				expenses: 43.25,
				income: 43.25,
			},
		],
	}),
};
</script>
<style lang=""></style>
