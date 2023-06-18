<template>
	<div>
		<div class="w-full lg:w-11/12 2xl:w-10/12 mx-auto overflow-x-scroll scrollbar-none md:py-5 md:my-10 my-6">
			<div>
				<div class="grid lg:grid-cols-2 gap-7">
					<div class="bg-white rounded-xl lg:p-8 p-5">
						<h1 class="text-sm font-semibold uppercase mb-5">
							Billing information
						</h1>
						<div class="flex flex-col gap-2 text-sm">
							<div v-for="(info, index) in billingInformation" :key="index"
								class="bg-lighterBlue flex flex-col sm:flex-row justify-between sm:items-center bg-opacity-60 p-3 capitalize rounded-md">
								<h2 class="font-semibold">{{ info.title }}</h2>
								<p>{{ info.text }}</p>
							</div>
						</div>
					</div>
					<div class="relative lg:block hidden bg-lightestBlue rounded-xl overflow-hidden">
						<img src="@/assets/img/pages/dashboard/billing/credit-card.svg"
							class="h-full w-full object-cover" />
						<div class="absolute top-8 right-5 flex items-center gap-3">
							<button
								class="px-5 py-2 bg-blackish rounded-full text-white outline-none border-none text-sm">
								Change
							</button>
							<button
								class="px-5 py-2 bg-normalBlue rounded-full text-white outline-none border-none text-sm">
								Delete
							</button>
						</div>
					</div>
				</div>
				<div class="flex flex-col md:flex-row items-stretch md:gap-4 gap-6 mt-6">
					<div class="flex-shrink-0 w-full md:w-72 lg:w-5/12 bg-white rounded-xl lg:p-8 p-5">
						<h1 class="text-sm font-semibold uppercase mb-5">
							Billing History
						</h1>
						<div class="flex flex-col gap-2 text-sm">
							<div class="flex justify-between items-center px-3 my-1.5">
								<p>Date</p>
								<p>Amount</p>
							</div>
							<div v-for="(bill, index) in billingHistory" :key="index"
								class="bg-lighterBlue flex justify-between items-center bg-opacity-60 p-3 capitalize rounded-md">
								<p>{{ bill.date }}</p>
								<p>{{ bill.amount }}</p>
							</div>
							<div
								class="text-center mt-4 font-semibold cursor-pointer underline uppercase sm:text-sm text-xs">
								<nuxt-link to="billing/billing-history"> View all </nuxt-link>
							</div>
						</div>
					</div>
					<div class="w-full bg-white rounded-xl lg:p-8 p-5">
						<h1 class="text-sm font-semibold uppercase lg:mb-10 mb-6">
							Billing ADDRESS INFORMATıON
						</h1>
						<div>
							<ValidationObserver v-slot="{ handleSubmit }" ref="billingAddressForm">
								<form @submit.prevent="handleSubmit(onBillingAddress)">
									<div class="grid md:grid-cols-2 gap-x-4 gap-y-3">
										<div class="relative">
											<ValidationProvider v-slot="{ errors }" name="Country" rules="required">
												<input v-model="billingAddress.country" type="text" name="country"
													placeholder="USA" :class="
														errors[0]
															? 'border border-red-600 placeholder-red-600'
															: 'border border-gray-400 border-opacity-70'
													" class="w-full pt-6 pb-2 lg:px-4 px-2.5 rounded-lg focus:bg-lighterBlue focus:border-lighterBlue outline-none" />
											</ValidationProvider>
											<div
												class="custom-placeholder flex items-center absolute top-0.5 lg:left-4 left-2.5 uppercase text-normalBlue">
												Country
												<span class="text-red-600 text-base ml-0.5">*</span>
											</div>
										</div>
										<div class="relative">
											<ValidationProvider v-slot="{ errors }" name="City" rules="required">
												<input v-model="billingAddress.city" type="text" name="city"
													placeholder="New York" :class="
														errors[0]
															? 'border border-red-600 placeholder-red-600'
															: 'border border-gray-400 border-opacity-70'
													" class="w-full pt-6 pb-2 lg:px-4 px-2.5 rounded-lg focus:bg-lighterBlue focus:border-lighterBlue outline-none" />
											</ValidationProvider>
											<div
												class="custom-placeholder flex items-center absolute top-0.5 lg:left-4 left-2.5 uppercase text-normalBlue">
												City
												<span class="text-red-600 text-base ml-0.5">*</span>
											</div>
										</div>
										<div class="relative">
											<ValidationProvider v-slot="{ errors }" name="State" rules="required">
												<input v-model="billingAddress.state" type="text" name="state"
													placeholder="NYC" :class="
														errors[0]
															? 'border border-red-600 placeholder-red-600'
															: 'border border-gray-400 border-opacity-70'
													" class="w-full pt-6 pb-2 lg:px-4 px-2.5 rounded-lg focus:bg-lighterBlue focus:border-lighterBlue outline-none" />
											</ValidationProvider>
											<div
												class="custom-placeholder flex items-center absolute top-0.5 lg:left-4 left-2.5 uppercase text-normalBlue">
												State / Province / Region
												<span class="text-red-600 text-base ml-0.5">*</span>
											</div>
										</div>
										<div class="relative">
											<ValidationProvider v-slot="{ errors }" name="Postal code" rules="required">
												<input v-model="billingAddress.postalCode" type="text"
													name="postal-code" placeholder="10004" :class="
														errors[0]
															? 'border border-red-600 placeholder-red-600'
															: 'border border-gray-400 border-opacity-70'
													" class="w-full pt-6 pb-2 lg:px-4 px-2.5 rounded-lg focus:bg-lighterBlue focus:border-lighterBlue outline-none" />
											</ValidationProvider>
											<div
												class="custom-placeholder flex items-center absolute top-0.5 lg:left-4 left-2.5 uppercase text-normalBlue">
												Postal Code
												<span class="text-red-600 text-base ml-0.5">*</span>
											</div>
										</div>
										<div class="relative">
											<ValidationProvider v-slot="{ errors }" name="Street address"
												rules="required">
												<input v-model="billingAddress.address" type="text" name="address"
													placeholder="13th Street. 47 W 13th St, New York, NY 10011, USA"
													:class="
														errors[0]
															? 'border border-red-600 placeholder-red-600'
															: 'border border-gray-400 border-opacity-70'
													" class="w-full pt-6 pb-2 lg:px-4 px-2.5 rounded-lg focus:bg-lighterBlue focus:border-lighterBlue outline-none" />
											</ValidationProvider>
											<div
												class="custom-placeholder flex items-center absolute top-0.5 lg:left-4 left-2.5 uppercase text-normalBlue">
												Street Address
												<span class="text-red-600 text-base ml-0.5">*</span>
											</div>
										</div>
									</div>
									<button type="submit"
										class="bg-blackish rounded-full px-7 py-3 sm:text-sm text-xs uppercase text-white w-max block ml-auto md:mt-2 mt-4">
										Change
									</button>
								</form>
							</ValidationObserver>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	layout: 'dashboard-layout',

	data: () => ({
		// Billing information
		billingInformation: [
			{
				id: 1,
				title: "Account Owner",
				text: "emirhan.altug@vircongroup.com",
			},
			{
				id: 2,
				title: "Current Plan",
				text: "Premium",
			},
			{
				id: 3,
				title: "Subscription Start Date",
				text: "9 October 2021",
			},
			{
				id: 4,
				title: "Subscription Renewal Date",
				text: "9 October 2022",
			},
		],
		// Billing history
		billingHistory: [
			{
				id: 1,
				date: "10 October 2021",
				amount: "$128.01",
			},
			{
				id: 2,
				date: "11 October 2021",
				amount: "$158.07",
			},
			{
				id: 3,
				date: "12 October 2021",
				amount: "$43.25",
			},
		],
		// Billing address
		billingAddress: {
			country: "",
			city: "",
			state: "",
			postalCode: "",
			address: "",
		},
	}),

	methods: {
		onBillingAddress() {
			console.log(this.billingAddress);
			this.billingAddress.country = "";
			this.billingAddress.city = "";
			this.billingAddress.state = "";
			this.billingAddress.postalCode = "";
			this.billingAddress.address = "";
			this.$refs.billingAddressForm.reset();
		}
	}

};
</script>

<style scoped>
.custom-placeholder {
	font-size: 11px;
}
</style>
