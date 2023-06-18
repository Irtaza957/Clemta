<template>
	<div class="tax-events bg-white lg:p-6 px-4 pt-6 overflow-y-scroll scrollbar-none rounded-xl"
		:class="!GET_CURRENT_COMPANY && 'blur-sm pointer-events-none'">
		<!-- Top heading -->
		<div class="flex justify-between items-center pl-4">
			<div class="flex items-center gap-3">
				<img src="@/assets/img/pages/dashboard/homepage/event.svg" class="w-5" />
				<h1 class="text-sm uppercase font-semibold">
					Tax events and reminders
				</h1>
			</div>
			<div v-if="eventsAndReminders.length"
				class="hidden md:flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full lg:mt-0 cursor-pointer">
				<p class="text-xs font-semibold">Calendar</p>
				<img src="@/assets/img/pages/dashboard/homepage/arrow-right.svg" />
			</div>
		</div>

		<!-- Middle section -->
		<div v-if="eventsAndReminders.length" class="my-5">
			<div v-for="(event, index) in eventsAndReminders" :key="index"
				class=" flex items-center gap-4 bg-lighterBlue  transition-all duration-200 ease-linear bg-opacity-60 rounded-lg px-4 py-5 my-3">
				<div class="border-2 border-gray-300 rounded-2xl p-2">
					<h1 class="md:text-3xl text-xl text-center font-semibold md:leading-7 leading-5">
						{{ event.date }}
					</h1>
					<p class="md:text-sm text-xs text-center uppercase">
						{{ event.month }}
					</p>
				</div>
				<div class="w-full">
					<h1 class="md:text-xl text-lg font-semibold">{{ event.name }}</h1>
					<div class="w-full flex flex-col lg:flex-row justify-between lg:items-center">
						<p class="text-sm mt-0.5">{{ event.detail }}</p>
						<p class="text-sm">
							<span class="lg:font-normal font-semibold">{{
									event.daysLeft
							}}</span>
							days left
						</p>
					</div>
				</div>
			</div>
			<div
				class="w-max ml-auto lg:hidden flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full mt-3 cursor-pointer">
				<p class="text-xs font-semibold">Calendar</p>
				<img src="@/assets/img/pages/dashboard/homepage/arrow-right.svg" />
			</div>
			<div
				class="lg:block hidden text-sm font-semibold text-center uppercase cursor-pointer border-b border-blackish pb-[.5px] w-max mx-auto mt-7">
				See all
			</div>
		</div>
		<div v-else>
			<NotFound heading="No Tax Event Found" description="Unfortunatly You Haven't Created Any Tax Event." />
		</div>

	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data: () => ({
		eventsAndReminders: [
		],
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
	},
};
</script>
<style scoped>
.tax-events {
	height: 400px;
}

@media screen and (max-width: 1023px) {
	.tax-events {
		height: 370px;
	}
}
</style>
