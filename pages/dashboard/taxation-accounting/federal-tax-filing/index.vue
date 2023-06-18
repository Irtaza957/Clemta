<template>
	<div>
		<!-- DATE -->
		<div v-if="step == 1" class="relative text-right">
			<select v-model="taxYear" class="py-2 pr-8 pl-4 outline-none my-3 border rounded-full text-base">
				<option v-for="(year, index) in years" :key="index" :value="year">
					Tax Year {{ year }}
				</option>
			</select>
			<svg class="-mr-1 ml-2 h-5 w-5 absolute top-6 right-3" xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
				<path fill-rule="evenodd"
					d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
					clip-rule="evenodd" />
			</svg>
		</div>
		<!-- Stepper -->
		<div v-if="step < federalTaxSteps.length"
			class="flex sm:grid grid-cols-5 overflow-x-scroll scrollbar-none w-full mt-5 mb-8 lg:pb-0 pb-2 md:pl-8 pl-2">
			<div v-for="(tax, index) in federalTaxSteps" :key="index" class="flex items-start">
				<div class="flex-shrink-0 flex flex-col items-center w-20">
					<div :class="
						index === step - 1
							? 'border-2 border-normalBlue'
							: index > step - 1 && 'opacity-60'
					" class="flex-shrink-0 flex justify-center items-center sm:h-12 h-10 sm:w-12 w-10 rounded-full bg-white transition duration-200 ease-linear sm:p-2 p-2.5">
						<p v-if="index >= step - 1" class="font-semibold text-normalBlue">
							{{ index + 1 }}
						</p>
						<img v-else src="@/assets/img/pages/dashboard/service/check-lg.svg" alt="" />
					</div>
					<p v-if="index <= step - 1"
						class="text-sm font-semibold text-center w-max truncate capitalize mt-3">
						{{ tax.title }}
					</p>
				</div>
				<div v-if="index < federalTaxSteps.length - 1" class="bg-white h-px sm:w-full w-12 mt-6"></div>
			</div>
		</div>
		<!-- Dashboard Main Section -->
		<div class="relative my-6">
			<!-- Instruction -->
			<div v-if="step === 1">
				<Instruction :taxYear="taxYear" @goto="incrementStepWithData" />
			</div>

			<!-- Corp Inofo -->
			<div v-else-if="step === 2">
				<CorpInfo @goto="incrementstep" @gotoWithData="incrementStepWithData"
					@gotoWithYear="incrementStepWithUpdatedYear" :taxInfo="taxInfo" :taxYear="taxYear" />
			</div>

			<!-- Partner Info -->
			<div v-else-if="step === 3">
				<PartnerInfo @goto="incrementstep" :taxYear="taxYear" />
			</div>

			<!-- Expenses -->
			<div v-else-if="step === 4">
				<Expense @goto="incrementstep" />
			</div>

			<!-- Assets -->
			<div v-else-if="step === 5">
				<Assets @goto="incrementstep" />
			</div>

			<div v-else-if="step === 6">
				<SuccessScreen />
			</div>

		</div>
	</div>
</template>
<script>
import SuccessScreen from "../../../../components/pages/dashboard/taxation-accounting/success-screen.vue";
import Instruction from "../../../../components/pages/dashboard/taxation-accounting/federal-tax/Instruction.vue"
import CorpInfo from "../../../../components/pages/dashboard/taxation-accounting/federal-tax/corp-info.vue"
import PartnerInfo from "../../../../components/pages/dashboard/taxation-accounting/federal-tax/partner-info.vue"
import Expense from "../../../../components/pages/dashboard/taxation-accounting/federal-tax/Expense.vue"
import Assets from "../../../../components/pages/dashboard/taxation-accounting/federal-tax/Assets.vue"

export default {
	layout: 'dashboard-layout',
	components: {
		SuccessScreen,
		Instruction,
		CorpInfo,
		PartnerInfo,
		Expense,
		Assets

	},
	data: () => ({
		// Dashboard sidebar
		step: 1,
		federalTaxSteps: [
			{
				id: 1,
				title: "instruction",
			},
			{
				id: 2,
				title: "corp info",
			},
			{
				id: 3,
				title: "partner info",
			},
			{
				id: 4,
				title: "revenue & expences",
			},
			{
				id: 5,
				title: "fixed assets",
			},
		],
		taxInfo: {},
		taxYear: 2022,
		taxId: '',
		years: [],
	}),
	mounted() {
		this.yearList()
	},
	methods: {
		yearList() {
			for (let i = 2018; i <= new Date().getFullYear(); i++) {
				this.years.push(i)
			}
		},
		incrementstep() {
			this.step++;
		},
		incrementStepWithData(form) {
			this.taxInfo = form,
				this.step++
		},
		incrementStepWithUpdatedYear(year) {
			this.taxYear = year,
				this.step++
		},
	},
}
</script>
<style scoped>
select {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
}
</style>