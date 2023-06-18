<template>
	<div class="md:my-20 my-16">
		<Container :padding="'xl:px-32'">
			<h1 class="flex-shrink-0 lg:text-5xl md:text-4xl text-3xl font-bold text-normalBlue">
				Pricing <span class="text-blackish">Plans</span>
			</h1>
			<!--  -->
			<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-5 mt-16 mb-20">
				<div v-for="(plan, index) in pricingPlans" :key="index" class="border-2 rounded-2xl overflow-hidden">
					<div :style="{ backgroundColor: plan.background }"
						class="flex flex-col justify-end items-center rounded-t-2xl h-32 py-4 px-6">
						<h2 class="text-xl font-semibold text-white mb-2 text-center">
							{{ plan.title }}
						</h2>
						<h1 :style="{ color: plan.textColor }" class="font-bold text-3xl">
							${{ plan.price }}
						</h1>
					</div>
					<!--  -->
					<div class="p-5">
						<p :style="{ color: plan.textColor }" class="font-bold opacity-90">
							{{ plan.heading }}
						</p>
						<div class="flex flex-col gap-3 mt-3.5 ml-1">
							<div v-for="(point, idx) in plan.points" :key="idx" class="flex items-start gap-5">
								<!-- ICON -->
								<div class="flex-shrink-0 flex justify-center items-start transform -rotate-45 mt-2.5">
									<div :style="{ backgroundColor: plan.textColor }"
										class="h-1.5 w-[1.5px] opacity-90"></div>
									<div :style="{ backgroundColor: plan.textColor }"
										class="h-3.5 w-[1.5px] opacity-90 transform rotate-90 translate-x-1.5 -ml-px translate-y-[.2px]">
									</div>
								</div>
								<!--  -->
								<p class="leading-5">{{ point.detail }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--  -->
			<div>
				<h1
					class="text-center sm:w-8/12 w-full mx-auto lg:text-3xl md:text-2xl text-xl font-bold text-blackish">
					Businesses have different needs, face different challenges, Clemta
					offers tailored solutions.
				</h1>
				<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-12">
					<div v-for="(offer, index) in offers" :key="index"
						class="border-2 border-t-0 rounded-3xl overflow-hidden">
						<div
							class="bg-lightestBlue h-[105px] flex items-center xl:text-2xl text-xl text-normalBlue font-semibold px-7 py-3">
							{{ offer.title }}
						</div>
						<!--  -->
						<div class="px-7 py-6">
							<div v-if="offer.price">
								<h1 class="xl:text-4xl text-3xl font-semibold">
									${{ offer.price }}
								</h1>
								<div class="flex items-center gap-3 text-sm font-semibold mt-3 cursor-pointer">
									Learn More
									<img src="@/assets/img/pages/homepage/arrow-right.svg" alt="" class="mt-0.5" />
								</div>
							</div>
							<div v-else class="flex items-center gap-3 text-sm font-semibold cursor-pointer">
								Get a Quote
								<img src="@/assets/img/pages/homepage/arrow-right.svg" alt="" class="mt-0.5" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</Container>
	</div>
</template>

<script>
export default {
	layout: "base-layout",

	data: () => ({
		pricingPlans: [
			{
				id: 1,
				title: "Form My Company",
				price: 349,
				heading: "Form My Company Package includes:",
				background: "#70BAC9",
				textColor: "#155D6B",
				points: [
					{
						id: 1,
						detail: "Name Check & Clearance",
					},
					{
						id: 2,
						detail: "Company Formation",
					},
					{
						id: 3,
						detail: "All Fees Included",
					},
					{
						id: 4,
						detail: "Purchase of Registered Agent Service for One Year",
					},
					{
						id: 5,
						detail: "Certified Copy of Formation Document",
					},
					{
						id: 6,
						detail: "EIN application (Tax I.D. of your new company)",
					},
				],
			},
			{
				id: 2,
				title: "Form and Structure My Company",
				price: 679,
				heading: 'All from "Form My Company" Package plus:',
				background: "#86b2ce",
				textColor: "#0D659D",
				points: [
					{
						id: 1,
						detail: "Name Check & Clearance",
					},
					{
						id: 2,
						detail: "Company Formation",
					},
					{
						id: 3,
						detail: "All Fees Included",
					},
					{
						id: 4,
						detail: "Purchase of Registered Agent Service for One Year",
					},
					{
						id: 5,
						detail: "Certified Copy of Formation Document",
					},
					{
						id: 6,
						detail: "EIN application (Tax I.D. of your new company)",
					},
				],
			},
			{
				id: 3,
				title: "Form and Structure My Company",
				price: 679,
				heading: 'All from "Form and Structure My Company" Package plus:',
				background: "#8696CE",
				textColor: "#413F84",
				points: [
					{
						id: 1,
						detail: "Name Check & Clearance",
					},
					{
						id: 2,
						detail: "Company Formation",
					},
					{
						id: 3,
						detail: "All Fees Included",
					},
					{
						id: 4,
						detail: "Purchase of Registered Agent Service for One Year",
					},
					{
						id: 5,
						detail: "Certified Copy of Formation Document",
					},
					{
						id: 6,
						detail: "EIN application (Tax I.D. of your new company)",
					},
				],
			},
		],
		offers: [
			{
				id: 1,
				title: "83(b) Election",
				price: 99,
			},
			{
				id: 2,
				title: "Employer Identification Number (EIN)",
				price: 99,
			},
			{
				id: 3,
				title: "Post Incorporation Assistance",
				price: 499,
			},
			{
				id: 4,
				title: "Federal Tax Filing for LLC",
				price: null,
			},
			{
				id: 5,
				title: "Federal Tax Filing for C-Corporations",
				price: null,
			},
			{
				id: 6,
				title: "Dissolution",
				price: null,
			},
		],
	}),
};
</script>
<style scoped>
</style>
