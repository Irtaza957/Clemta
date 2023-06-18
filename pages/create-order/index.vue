<template>
	<div
		class="min-h-screen w-full bg-gradient-to-br from-lightestBlue to-normalBlue pt-3 pb-16 text-blackish select-none">
		<Container>
			<!-- Header section -->
			<div class="flex justify-between items-center text-blackish sm:px-3 px-0 py-3">
				<div class="flex items-center gap-3">
					<img src="@/assets/img/pages/login/logo.svg" class="w-7" />
					<h1 class="text-2xl font-semibold">Clemta</h1>
				</div>
				<div class="underline cursor-pointer" @click="isFillLater = true">
					I want to fill later
				</div>
			</div>

			<template v-if="isFillLater">
				<FillLaterModal @close="isFillLater = false" />
			</template>

			<!-- Main Section -->
			<div class="md:w-10/12 w-full mx-auto my-5">
				<!-- Headings -->
				<div class="flex flex-col lg:flex-row lg:items-center justify-between mt-12 mb-8">
					<h1 class="sm:text-3xl text-2xl font-semibold">
						{{ stepsHeading[step - 1].title }}
					</h1>
					<p class="text-sm lg:mt-0 mt-2">{{ stepsHeading[step - 1].query }}</p>
				</div>

				<!-- Stepper -->
				<div v-if="step > 1"
					class="hidden md:flex justify-between md:w-11/12 w-full mx-auto mb-12 md:px-3 px-0 z-10">
					<div v-for="(steps, idx) in stepsHeading" :key="idx"
						class="flex items-center gap-2 lg:gap-3 2xl:gap-4">
						<div :class="
							step === idx + 1
								? 'text-normalBlue border-2 border-normalBlue'
								: idx + 1 >= step && 'opacity-40'
						" class="flex-shrink-0 flex justify-center items-center lg:h-12 h-10 lg:w-12 w-10 rounded-full bg-white text-lg transition-all duration-200 ease-in-out">
							<div v-if="idx + 1 < step">
								<img src="@/assets/img/pages/create-order/check.svg" alt="" />
							</div>
							<p v-if="idx + 1 >= step">{{ ++idx }}</p>
						</div>
						<div v-if="idx !== 6" :class="idx + 1 >= step && 'opacity-40'"
							class="w-9 lg:w-14 xl:w-24 2xl:w-32 h-0.5 bg-white"></div>
					</div>
				</div>

				<!-- Help to choose type -->
				<div v-if="step < 3" @click="isChooseTypeModal=true"
					class="w-max flex items-center gap-2 ml-auto bg-normalBlue text-white rounded-full py-2.5 px-3 text-xs cursor-pointer">
					<img src="@/assets/img/pages/create-order/info.svg" />
					Help me choose the type.
				</div>

				<!-- Create Order -->
				<div>
					<template v-if="step === 1">
						<Step1 @nextStep="nextStepWithCompanyType" />
					</template>

					<template v-else-if="step === 2">
						<Step2 @prevStep="prevStep" @nextStep="nextStepWithState" />
					</template>

					<template v-else-if="step === 3">
						<Step3 @prevStep="prevStep" @nextStep="nextStepWithBusinessDetails"
							:companyType="form.company_type" />
					</template>

					<template v-else-if="step === 4 && form.company_type.toLowerCase() !== 'llc'">
						<Step4 @prevStep="prevStep" @nextStep="nextStepWithSharesDetails" />
					</template>

					<template v-else-if="step === 5">
						<Step5 :company_type="form.company_type" :no_of_shares="form.total_number_of_shares"  @prevStep="checkPrevStep"
							@nextStep="nextStepWithOfficerDetails"
							@nextStepFromPackageSelected="nextStepFromPackageSelected"
							@goBackToOfficer="goBackToOfficer" />
					</template>

					<template v-else-if="step === 6">
						<Step6 :orderID="orderID" :selected_package="selected_package" @prevStep="prevStep"
							@nextStep="nextStepWithBillingAddress" />
					</template>
				</div>
			</div>
			<div v-if="isChooseTypeModal">
			<ChooseCompanyTypeModal @close="isChooseTypeModal=false" :step="step"/>
			</div>
		</Container>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ChooseCompanyTypeModal from '../../components/pages/create-order/choose-company-type-modal.vue';
import FillLaterModal from '../../components/pages/create-order/fill-later-modal.vue';
import Step1 from '../../components/pages/create-order/Step1.vue';
import Step2 from '../../components/pages/create-order/Step2.vue';
import Step3 from '../../components/pages/create-order/Step3.vue';
import Step4 from '../../components/pages/create-order/Step4.vue';
import Step5 from '../../components/pages/create-order/Step5.vue';
import Step6 from '../../components/pages/create-order/Step6.vue';

export default {
	components: {
		FillLaterModal,
		Step1,
		Step2,
		Step3,
		Step4,
		Step5,
		Step6,
		ChooseCompanyTypeModal
	},
	data: () => ({
		orderID: null,
		isChooseTypeModal: false,
		isFillLater: false,
		step: 1,
		stepsHeading: [
			{
				id: 1,
				title: "Choose a company type",
				query: "Exiting news! You are forming your company now.",
			},
			{
				id: 2,
				title: "Choose a state",
				query: "Picking a state is fancy, right?",
			},
			{
				id: 3,
				title: "Let’s give your business a life",
				query: "We are slowly getting there, hang on!",
			},
			{
				id: 4,
				title: "Number of shares",
				query: "Some legal details, we know it’s boring.",
			},
			{
				id: 5,
				title: "Officers and details",
				query: "Only the best bosses around here",
			},
			{
				id: 6,
				title: "Purchase Summary",
				query: "Congratulations! One last step.",
			},
		],
		form: {
			company_type: '',
			company_state: '',
			company_info: {
				company_name: '',
				entity_ending: '',
				company_industry: '',
				company_industry_other: '',
				company_description: '',
				items_or_products: '',
			},
			total_number_of_shares: 0,
			shares_par_value: 0,
			shareholders: [],
			selected_package: '',
			billing_address: {
				addr1: "",
				addr2: "",
				city: "",
				state: "",
				country: "",
				zipcode: ""
			}
		},
		selected_package: null
	}),
	computed: {
		...mapGetters({
			GET_PENDING_ORDER_ID: 'createOrder/GET_PENDING_ORDER_ID'
		})
	},
	created() {
		this.getOrders();
		if (this.GET_PENDING_ORDER_ID) {
			this.orderID = this.GET_PENDING_ORDER_ID
		}
	},
	methods: {
		...mapActions({
			FETCH_ORDER: "createOrder/FETCH_ORDER",
			CREATE_ORDER: "createOrder/CREATE_ORDER",
			UPDATE_ORDER: "createOrder/UPDATE_ORDER"
		}),
		// Check if an order already exists for existing otherwise create new order
		async getOrders() {
			this.FETCH_ORDER('/awaiting')
				.then(response => {
					if (response.data.data.length) {
						if (response.data.success) {
							this.orderID = response.data.data[0].id
						}
					}
					else {
						this.CREATE_ORDER()
							.then(response => {
								if (response.data.success) {
									this.orderID = response.data.data
								}
							})
					}
				})
				.catch((error) => {
					this.$toast.error({
						title: "Authentication Status",
						message: "Token has been expired. Please Login again",
					});
				})
		},

		async updateOrder() {
			if (this.orderID) {
				await this.UPDATE_ORDER({ order_id: this.orderID, form: this.form })
			}
		},
		async nextStep() {
			if (this.orderID) {
				await this.updateOrder()
				this.step++;
			}
		},
		prevStep() {
			this.step--;
		},
		// #1
		nextStepWithCompanyType(companyType) {
			this.form.company_type = companyType
			this.nextStep()
		},
		// #2
		nextStepWithState(state) {
			this.form.company_state = state
			this.nextStep()
		},
		// #3
		nextStepWithBusinessDetails(businessForm) {
			this.form.company_info.company_name = businessForm.name
			this.form.company_info.entity_ending = businessForm.entity
			this.form.company_info.company_industry = businessForm.industry
			this.form.company_info.company_industry_other = businessForm.other
			this.form.company_info.company_description = businessForm.project
			this.form.company_info.items_or_products = businessForm.products
			if (this.form.company_type.toLowerCase() === "llc") {
				this.step = 5;
				this.form.total_number_of_shares = 100
				this.form.shares_par_value = 0
				this.updateOrder();
			} else {
				this.nextStep();
			}
		},
		// #4
		nextStepWithSharesDetails(shareForm) {
			this.form.total_number_of_shares = parseInt(shareForm.numberOfShares)
			this.form.shares_par_value = parseFloat(shareForm.value)
			this.nextStep();
		},
		// #5
		checkPrevStep() {
			if (this.form.company_type.toLowerCase() === "llc") {
				this.step = 3;
			} else {
				this.prevStep();
			}
		},
		nextStepWithOfficerDetails(officers) {
			this.form.shareholders = officers
			this.stepsHeading[4].title = 'Select a package'
			this.stepsHeading[4].query = 'We are happy to have you on board!'
			this.updateOrder()
		},
		goBackToOfficer() {
			this.stepsHeading[4].title = 'Officers and details'
			this.stepsHeading[4].query = 'Only the best bosses around here'
		},
		nextStepFromPackageSelected(selectedPackage) {
			this.selected_package = { ...selectedPackage }
			this.form.selected_package = selectedPackage.id
			this.nextStep()
		},
		nextStepWithBillingAddress(billingAddress) {
			this.form.billing_address = { ...billingAddress }
			this.updateOrder()
		}
	},
};
</script>
