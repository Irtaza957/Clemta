<template>
<dashboard-modal @close="$emit('close')">
			<h1 class="text-xl font-semibold mb-7 text-center">Add Customer</h1>
			<ValidationObserver v-slot="{ handleSubmit }" ref="newCustomerDetails">
				<form @submit.prevent="handleSubmit(onNewCustomer)" class="text-sm">
					<div class="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-5">
						<div>
							<div>
								<ValidationProvider v-slot="{ errors }" name="Name" rules="required">
									<input v-model="newCustomer.name" type="text" name="name" placeholder="Name" :class="
										errors[0] ? 'border border-red-600 ' : 'border'
									" class="w-full py-2.5 px-3 rounded-lg focus:outline-none" />
								</ValidationProvider>
							</div>
							<div class="mt-3.5">
								<ValidationProvider v-slot="{ errors }" name="Account email" rules="required|email">
									<input v-model="newCustomer.account_email" @keyup="debounce($event, 'billing')"
										type="text" name="account-email" placeholder="Account Email" :class="
											errors[0] ? 'border border-red-600 ' : 'border'
										" class="w-full py-2.5 px-3 rounded-lg focus:outline-none" />
								</ValidationProvider>
							</div>
						</div>
						<div>
							<ValidationProvider v-slot="{ errors }" name="Description" rules="required">
								<input v-model="newCustomer.description" type="text" name="description"
									placeholder="Description" :class="errors[0] ? 'border border-red-600 ' : 'border'"
									class="w-full py-2.5 px-3 rounded-lg focus:outline-none" />
							</ValidationProvider>
						</div>
					</div>
					<div class="mt-8">
						<div class="grid md:grid-cols-2 grid-cols-1 gap-10 my-5">
							<div>
								<p class="text-sm font-semibold mb-2">Billing Details</p>
								<div class="flex items-center gap-3 mt-3.5">
									<input v-model="billingEmailCheckbox" @change="accountEmailCheck()" type="checkbox"
										value="accountemail" id="accountemail">
									<label class="text-base font-semibold" for="accountemail">
										Same as account email
									</label>
								</div>
								<div class="mt-3.5">
									<ValidationProvider v-slot="{ errors }" name="Billing email" rules="required|email">
										<input type="text" v-model="newCustomer.billing_email"
											placeholder="Billing Email" :disabled="disableBillingEmail" :class="
												errors[0] ? 'border border-red-600 ' : 'border'
											" class="w-full py-2.5 px-3 rounded-lg border focus:outline-none" />
									</ValidationProvider>
								</div>
								<div class="w-full mt-3.5 relative">
									<ValidationProvider v-slot="{ errors }" name="Billing country" rules="required">
										<div :class="
											errors[0] ? 'border border-red-600 ' : 'border'
										" class="px-3 py-2.5 rounded-lg flex justify-between items-center"
											@click="showCountryList = !showCountryList">
											<span v-if="newCustomer.billing_country">
												{{ newCustomer.billing_country }}
											</span>
											<span v-else> Choose a Country </span>
											<img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png"
												alt="down-arrow" class="w-2" />
											<input type="hidden" v-model="newCustomer.billing_country" />
										</div>
									</ValidationProvider>
									<div v-if="showCountryList"
										class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
										<div class="country-list max-h-52 overflow-y-scroll">
											<div v-for="(country, index) in countries" :key="index"
												class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
												@click="selectCountry(country)">
												<img :src="country.flag" alt="country" class="w-6" />
												{{ country.name }}
											</div>
										</div>
									</div>
								</div>
								<div class="mt-3.5">
									<ValidationProvider v-slot="{ errors }" name="Billing phone" rules="required">
										<input v-model="newCustomer.billing_phone" @keyup="debounce($event, 'shipping')"
											type="text" placeholder="Phone Number" :class="
												errors[0] ? 'border border-red-600 ' : 'border'
											" class="w-full py-2.5 px-3 rounded-lg border focus:outline-none" />
									</ValidationProvider>
								</div>
							</div>
							<div>
								<div class="w-full">
									<p class="text-sm font-semibold mb-2">
										Shipping Details
									</p>
									<div class="flex items-center gap-3 mt-3.5">
										<input v-model="shippingAddressCheckbox" @change="shippingDetailCheck()"
											type="checkbox" id="billing">
										<label class="text-base font-semibold" for="billing">
											Same as billing details
										</label>
									</div>
									<div class="mt-3.5">
										<ValidationProvider v-slot="{ errors }" name="Shipping name" rules="required">
											<input v-model="newCustomer.shipping_name" type="text" placeholder="Name"
												:class="
													errors[0] ? 'border border-red-600 ' : 'border'
												" class="w-full py-2.5 px-3 rounded-lg border focus:outline-none" />
										</ValidationProvider>
									</div>
									<div class="w-full mt-3.5 relative">
										<ValidationProvider v-slot="{ errors }" name="Shipping country"
											rules="required">
											<div :class="
												errors[0] ? 'border border-red-600 ' : 'border'
											" class="px-3 py-2.5 rounded-lg flex justify-between items-center"
												@click="showShippingCountryList = !showShippingCountryList">
												<span v-if="newCustomer.shipping_country">
													{{ newCustomer.shipping_country }}
												</span>
												<span v-else> Choose a Country </span>
												<img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png"
													alt="down-arrow" class="w-2" />
												<input type="hidden" v-model="newCustomer.shipping_country"
													:disabled="disableShipping" />
											</div>
										</ValidationProvider>
										<div v-if="showShippingCountryList && !disableShipping"
											class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
											<div class="country-list max-h-52 overflow-y-scroll">
												<div v-for="(country, index) in countries" :key="index"
													class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
													@click="
														(newCustomer.shipping_country = country.name),
														(showShippingCountryList = false)
													">
													<img :src="country.flag" alt="country" class="w-6" />
													{{ country.name }}
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="mt-3.5">
									<ValidationProvider v-slot="{ errors }" name="Shipping phone" rules="required">
										<input v-model="newCustomer.shipping_phone" type="text"
											placeholder="Phone Number" :disabled="disableShipping" :class="
												errors[0] ? 'border border-red-600 ' : 'border'
											" class="w-full py-2.5 px-3 rounded-lg border focus:outline-none" />
									</ValidationProvider>
								</div>
							</div>
						</div>
						<div class="mt-8">
							<p class="text-sm font-semibold mb-2">
								General Information
							</p>
							<div class="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-3.5">
								<div class="w-full relative rounded-lg">
									<ValidationProvider v-slot="{ errors }" name="Time Zone" rules="required">
										<div :class="
											errors[0] ? 'border border-red-600 ' : 'border'
										" class="px-3 py-2.5 rounded-lg flex justify-between items-center"
											@click="showTimeZoneList = !showTimeZoneList">
											<span v-if="newCustomer.timeZone">
												{{ newCustomer.timeZone }}
											</span>
											<span v-else> Choose a Time Zone </span>
											<img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png"
												alt="down-arrow" class="w-2" />
											<input type="hidden" v-model="newCustomer.timeZone" />
										</div>
									</ValidationProvider>
									<div v-if="showTimeZoneList"
										class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
										<div class="country-list max-h-44 overflow-y-scroll">
											<div v-for="(timeZone, index) in timezones" :key="index"
												class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
												@click="
													(newCustomer.timeZone = timeZone.abbr),
													(showTimeZoneList = false)
												">
												{{ timeZone.value }}
											</div>
										</div>
									</div>
								</div>
								<div class="w-full relative rounded-lg">
									<ValidationProvider v-slot="{ errors }" name="Currency" rules="required">
										<div :class="
											errors[0] ? 'border border-red-600 ' : 'border'
										" class="px-3 py-2.5 rounded-lg flex justify-between items-center"
											@click="showCurrencyList = !showCurrencyList">
											<span v-if="newCustomer.currency">
												{{ newCustomer.currency }}
											</span>
											<span v-else> Choose a Currency </span>
											<img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png"
												alt="down-arrow" class="w-2" />
											<input type="hidden" v-model="newCustomer.currency" />
										</div>
									</ValidationProvider>
									<div v-if="showCurrencyList"
										class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
										<div class="country-list max-h-44 overflow-y-scroll">
											<div v-for="(currency, index) in currencies" :key="index"
												class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
												@click="
													(newCustomer.currency = currency.code),
													(showCurrencyList = false)
												">
												{{ currency.symbol }} - {{ currency.name }}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="grid md:grid-cols-2 grid-cols-1 md:gap-10 gap-3.5 mt-3.5">
								<div class="w-full relative rounded-lg">
									<ValidationProvider v-slot="{ errors }" name="Language" rules="required">
										<div :class="
											errors[0] ? 'border border-red-600 ' : 'border'
										" class="px-3 py-2.5 rounded-lg flex justify-between items-center"
											@click="showLanguageList = !showLanguageList">
											<span v-if="newCustomer.language">
												{{ newCustomer.language }}
											</span>
											<span v-else> Choose a Language </span>
											<img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png"
												alt="down-arrow" class="w-2" />
											<input type="hidden" v-model="newCustomer.language" />
										</div>
									</ValidationProvider>
									<div v-if="showLanguageList"
										class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
										<div class="country-list max-h-44 overflow-y-scroll">
											<div v-for="(language, index) in languages" :key="index"
												class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
												@click="
													(newCustomer.language = language.name),
													(showLanguageList = false)
												">
												{{ language.name }}
											</div>
										</div>
									</div>
								</div>

								<div class="grid md:grid-cols-2 grid-cols-1 gap-4">
									<div>
										<ValidationProvider v-slot="{ errors }" name="Tax status">
											<input v-model="newCustomer.tax_status" type="text" placeholder="Tax Status"
												:class="
													errors[0] ? 'border border-red-600 ' : 'border'
												" class="w-full py-2.5 px-3 rounded-lg border focus:outline-none" />
										</ValidationProvider>
									</div>
									<div>
										<ValidationProvider v-slot="{ errors }" name="Tax ID">
											<input v-model="newCustomer.tax_id" type="text" placeholder="Tax ID" :class="
												errors[0] ? 'border border-red-600 ' : 'border'
											" class="w-full py-2.5 px-3 rounded-lg border focus:outline-none" />
										</ValidationProvider>
									</div>
								</div>
							</div>
							<div class="flex justify-end items-center flex-wrap gap-3 mt-3">
								<button
									class="w-max block ml-auto py-4 px-12 text-sm rounded-full text-white bg-normalBlue uppercase mt-5"
									@click="$emit('close')">
									Cancel
								</button>
								<button type="submit"
									class="text-sm bg-blackish text-white py-4 px-12 rounded-full uppercase mt-5">
									Add
								</button>
							</div>
						</div>
					</div>
				</form>
			</ValidationObserver>
</dashboard-modal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { countries } from "../../../../plugins/vue_country_list";
import { languages } from "../../../../plugins/vue_language_list";
import { currencies } from "../../../../plugins/vue_currency_list";
import { timezones } from "../../../../plugins/vue_timezone_list";

export default {
	props: {
		customerList: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			currentCompany: null,
			// add new customer details
			newCustomer: {
				name: "",
				description: "",
				account_email: "",
				// Billing info
				billing_email: "",
				billing_country: "",
				billing_phone: "",
				// Shipping info
				shipping_name: "",
				shipping_country: null,
				shipping_phone: "",
				// General info
				timeZone: null,
				language: null,
				currency: null,
				tax_status: null,
				tax_id: null,
			},
			billingEmailCheckbox: false,
			shippingAddressCheckbox: false,
			countries: countries,
			languages: languages,
			currencies: currencies,
			timezones: timezones,
			showCountryList: false,
			showShippingCountryList: false,
			showLanguageList: false,
			showCurrencyList: false,
			showTimeZoneList: false,
			disableBillingEmail: false,
			disableShipping: false,
			timeout: null

		}
	},
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),

	},
	created() {
		this.currentCompany = this.GET_CURRENT_COMPANY
	},
	methods: {
		...mapActions({
			CREATE_CUSTOMER: "customers/CREATE_CUSTOMER",
		}),
		debounce($event, type) {
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => {
				if (type === 'shipping') {
					this.shippingDetailCheck();
				} else {
					this.accountEmailCheck();
				}
			}, 100);
		},
		accountEmailCheck() {
			if (this.billingEmailCheckbox) {
				this.newCustomer.billing_email = this.newCustomer.account_email
				this.disableBillingEmail = true
			} else {
				this.newCustomer.billing_email = ''
				this.disableBillingEmail = false
			}
		},
		shippingDetailCheck() {
			if (this.shippingAddressCheckbox) {
				this.newCustomer.shipping_country = this.newCustomer.billing_country
				this.newCustomer.shipping_phone = this.newCustomer.billing_phone
				this.disableShipping = true
			} else {
				this.newCustomer.shipping_country = null
				this.newCustomer.shipping_phone = ''
				this.disableShipping = false
			}
		},
		selectCountry(country) {
			this.newCustomer.billing_country = country.name
			this.showCountryList = false
			this.shippingDetailCheck()
		},
		// add new customer form
		onNewCustomer() {
			this.CREATE_CUSTOMER({ form: this.newCustomer, company_id: this.GET_CURRENT_COMPANY.id })
				.then((response) => {
					this.$toast.success({
						title: "Customer created! ",
						message: "Customer has been created successfully",
					});	
					if(this.customerList){				
					if(Object.keys(this.customerList).length < 5){
						this.$emit('customerAutocomplete')						
					}}				
					this.$emit('close')
				})
				.catch((error) => {
					this.$toast.error({
						title: "Error!",
						message: error.message,
					});
				});
			this.clearNewCustomerDetails();

		},
		clearNewCustomerDetails() {
			this.newCustomer.name = "";
			this.newCustomer.description = "";
			this.newCustomer.account_email = "";
			//      Billing info
			this.newCustomer.billing_email = "";
			this.newCustomer.billing_country = null;
			this.newCustomer.billing_phone = "";
			//      Shipping info
			this.newCustomer.shipping_name = "";
			this.newCustomer.shipping_country = null;
			this.newCustomer.shipping_phone = "";
			//      General info
			this.newCustomer.time_zone = null;
			this.newCustomer.language = null;
			this.newCustomer.currency = null;
			this.newCustomer.tax_status = "";
			this.newCustomer.tax_id = "";

			this.$refs.newCustomerDetails.reset();
		},
	},
}
</script>
<style scoped>
.create-invoice-modal {
	max-height: 90vh;
	animation: slideDown 0.3s linear forwards;
}

@keyframes slideDown {
	0% {
		opacity: 0;
		transform: translateY(-3rem);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

/* width */
.country-list::-webkit-scrollbar {
	width: 6px;
}

/* Handle */
.country-list::-webkit-scrollbar-thumb {
	background: #cbe7e8;
}

input[type=checkbox]+label {
	display: block;
	margin: 0;
	cursor: pointer;
	padding: 0.2em;
}

input[type=checkbox] {
	display: none;
}

input[type=checkbox]+label:before {
	content: "\2714";
	border: 1px solid rgba(46, 59, 60, 0.4);
	margin-right: 0.2em;
	vertical-align: top;
	color: transparent;
	transition: .2s;
}

input[type=checkbox]:checked+label:before {
	display: inline;
	align-items: center;
	justify-content: center;
	background-color: white;
	border-color: gray;
	color: #0D659D;
}
</style>