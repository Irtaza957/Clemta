<template>
	<div>
		<div class="my-6">
			<!-- MY COMPANY TABS -->
			<div class="flex items-center gap-1.5 rounded-lg px-5 py-4 bg-white overflow-x-scroll scrollbar-none h-28">
				<h1 v-for="(company, index) in companyDetails" :key="index" :class="
					showDetails.toLowerCase() === company.title.toLowerCase()
						? 'bg-lighterBlue text-blackish'
						: 'bg-white text-gray-400'
				" class="py-2.5 px-5 rounded-full hover:text-blackish text-xl font-bold cursor-pointer transition-all duration-200 ease-linear"
					@click="showDetails = company.title">
					{{ company.title }}
				</h1>
			</div>

			<!-- COMPANY DETAILS SECTION -->
			<CompanyDetails v-if="showDetails.toLowerCase() === 'company'" />

			<!-- COMPANY DETAILS SECTION -->
			<Calendar v-if="showDetails.toLowerCase() === 'calendar'" />

			<!-- SHAREHOLDERS SECTION -->
			<ShareHolders v-if="showDetails.toLowerCase() === 'shareholders'" />

			<!-- SHAREHOLDERS SECTION -->
			<Banking v-if="showDetails.toLowerCase() === 'banking'" />
		</div>
	</div>
</template>

<script>
import CompanyDetails from "../../../components/pages/dashboard/my-company/company-details.vue";
import Calendar from "../../../components/pages/dashboard/my-company/calender/index.vue";
import ShareHolders from "../../../components/pages/dashboard/my-company/sharehoder/share-holders.vue";
import Banking from "../../../components/pages/dashboard/my-company/Banking.vue";

export default {
	layout: 'dashboard-layout',

	components: {
		CompanyDetails,
		Calendar,
		ShareHolders,
		Banking,
	},
	data: () => ({
		showDetails: "company",
		companyDetails: [
			{
				id: 1,
				title: "Company",
			},
			{
				id: 2,
				title: "Calendar",
			},
			{
				id: 3,
				title: "Shareholders",
			},
			{
				id: 4,
				title: "Banking",
			},
		],
	}),
};
</script>

