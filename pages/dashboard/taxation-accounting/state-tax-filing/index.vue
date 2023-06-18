<template>
	<div>
		<!-- TAX YEAR -->
		<div v-if="step === 1" class="flex justify-end">
			<FiscalYear :taxYear="taxYear" @changeTaxYear="changeTaxYear" />
		</div>
		<!-- STEPPER & STEPS -->
		<div v-if="step < steps.length"
			class="flex sm:grid grid-cols-3 first-line:overflow-x-scroll scrollbar-none m-auto mt-5 mb-8 lg:pb-0 pb-2 sm:pl-2 w-8/12 md:pl-24">
			<div v-for="(tax, index) in steps" :key="index" class="flex">
				<div class="flex-shrink-0 flex flex-col items-center w-20">
					<div :class="
						index === step - 1
							? 'border-4 border-normalBlue'
							: index > step - 1 && 'opacity-60'
					" class="flex-shrink-0 flex justify-center items-center sm:h-12 h-10 sm:w-12 w-10 rounded-full bg-white transition duration-200 ease-linear sm:p-2 p-2.5">
						<p v-if="index >= step - 1" class="font-semibold text-normalBlue">
							{{ index + 1 }}
						</p>
						<img v-else src="@/assets/img/pages/dashboard/service/check-lg.svg" />
					</div>
					<p v-if="index <= step - 1" class="text-sm text-center w-max truncate capitalize mt-3 font-bold">
						{{ tax.title }}
					</p>
				</div>
				<div v-if="index < steps.length - 1" class="bg-white h-px sm:w-full w-12 mt-6"></div>
			</div>
		</div>
		<div class="relative my-6">
			<div v-if="step === 1">
				<Step1 :taxYear="taxYear" @goNext="incrementStepWithData" />
			</div>
			<div v-else-if="step === 2">
				<Step2 @goNext="incrementStepWithData" :taxInfo="taxInfo" :taxYear="taxYear" />
			</div>
			<div v-else-if="step === 3">
				<Step3 @goto="incrementstep" :taxYear="taxYear" :taxInfo="taxInfo" />
			</div>
			<div v-else-if="step === 4">
				<SuccessScreen />
			</div>
		</div>
	</div>
</template>

<script>
import FiscalYear from '../../../../components/pages/dashboard/taxation-accounting/state-tax/fiscal-year.vue'
import Step1 from "../../../../components/pages/dashboard/taxation-accounting/state-tax/step1.vue";
import Step2 from "../../../../components/pages/dashboard/taxation-accounting/state-tax/step2.vue";
import Step3 from "../../../../components/pages/dashboard/taxation-accounting/state-tax/step3.vue";
import SuccessScreen from "../../../../components/pages/dashboard/taxation-accounting/success-screen.vue";
export default {
	layout: 'dashboard-layout',
	components: {
		FiscalYear,
		Step1,
		Step2,
		Step3,
		SuccessScreen
	},
	data: () => ({
		// TAX YEAR
		taxYear: new Date().getFullYear(),
		// STEPPER & STEPS
		steps: [
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
		],
		step: 1,
		taxInfo: {}
	}),
	methods: {
		incrementStepWithData(form) {
			this.taxInfo = form,
			this.incrementstep()
		},
		incrementstep() {
			this.step++
		},
		changeTaxYear(val) {
			this.taxYear = val
		}
	}
}
</script>
