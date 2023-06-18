<template>
	<div class="flex flex-col gap-2 text-blackish">
		<h1 class="text-4xl font-light capitalize">{{ businessHeading }}</h1>
		<h1 class="text-4xl font-semibold">{{ dashboardText }}</h1>
		<p class="font-light">{{ detailText }}</p>
		<div class="flex">
			<h1 class="text-2xl">Join 500+ companies</h1>
			<img src="@/assets/img/pages/login/trustpilot.svg" class="h-16 ml-10" />
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		businessHeading: "Manage your business",
		dashboardText: "from One Dashboard",
		detailText: "Tax Filling, Legal Documents, Invoices, and many more...",
	}),
};
</script>
