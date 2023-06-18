<template>
	<Container>
		<!-- Back button on View History Section -->
		<div v-if="invoiceView === 'create-invoice'" @click="$router.push('/dashboard/invoices')"
			class="flex items-center gap-1.5 md:ml-0 ml-5 mt-4 text-sm uppercase cursor-pointer">
			<div class="h-4 w-4 rounded-full flex justify-center items-center border border-blackish p-0.5">
				<img src="@/assets/img/pages/login/arrow-down.svg" class="transform rotate-90" />
			</div>
			Back
		</div>

		<!-- Dashboard Main Section -->
		<div class="relative bg-white rounded-xl py-8 lg:px-16 px-5 my-6">
			<!-- *******************   CREATE INVOICE SECTION   ******************* -->
			<div v-if="invoiceView === 'create-invoice'">
				<ValidationObserver v-slot="{ handleSubmit }">
					<form @submit.prevent="handleSubmit(createInvoice)">
						<div class="grid md:grid-cols-2 grid-cols-1 gap-8 border-b pb-6">
							<div>
								<!-- Find or add new customer -->
								<h1 class="text-xl font-semibold mb-3">Customer</h1>
								<div class="relative">
									<ValidationProvider v-slot="{ errors }" name="Add Customer" rules="required">
										<input v-model="form.selectedCustomer" type="text" @keyup="debounce"
											placeholder="Find or add a customer..." :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="w-full py-2 px-4 rounded-lg border focus:outline-none"
											@focus="openCustomerList = true" />
									</ValidationProvider>
									<div v-if="openCustomerList"
										class="max-h-72 overflow-y-auto h-48 bg-white absolute top-full left-0 w-full px-1 z-10">
										<!-- Add new customer -->
										<div class="rounded-md border py-4 px-2 mt-1">
											<div class="flex items-center gap-2.5 capitalize cursor-pointer px-3"
												@click="
													(invoiceView = 'new-customer'),
													(openCustomerList = false)
												">
												<img src="@/assets/img/pages/dashboard/invoice/create-invoice/add.svg"
													class="w-3" />
												Add new customer
											</div>
											<p class="my-2 font-light px-3">Recent</p>
											<div>
												<div v-for="(list, index) in customerList" :key="index"
													class="flex flex-col justify-between sm:flex-row sm:items-center sm:gap-10 gap-0 py-1.5 px-3 rounded-md hover:bg-lightestBlue transition-all duration-150 ease-linear cursor-pointer"
													@click="
														(form.selectedCustomer = list.name),
														(openCustomerList = false)
													">
													<p>{{ list.name }}</p>
													<p class="text-gray-400 sm:text-blackish sm:mt-0 -mt-0.5">
														{{ list.email }}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="flex items-center sm:gap-12 gap-3 my-4 mb-1">
									<ValidationProvider v-slot="{ errors }" name="Issued on" rules='required'>
										<input onfocus="(this.type='date')" v-model="form.issuedOn" type="text"
											placeholder="ISSUED ON" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="w-40 py-2 px-4 rounded-lg border focus:outline-none" />
									</ValidationProvider>
									<ValidationProvider v-slot="{ errors }" name="Due on" rules='required'>
										<input onfocus="(this.type='date')" v-model="form.dueOn" type="text"
											placeholder="DUE ON" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="w-40 py-2 px-4 rounded-lg border focus:outline-none" />
									</ValidationProvider>
								</div>
								<p class="text-red-700 text-sm">{{ dateValidator }}</p>
							</div>
							<div>
								<div class="lg:px-5">
									<h1 class="text-xl font-semibold mb-3">Item</h1>
									<ValidationObserver v-slot="{ handleSubmit }" ref="itemForm">
										<form @submit.prevent="handleSubmit(itemAdd)">
											<ValidationProvider v-slot="{ errors }" name="Item name" :rules='required'>
												<input v-model="itemDetails.itemName" type="text"
													placeholder="Delaware C-Corp - State Compliance" :class="
														errors[0]
															? 'border border-red-600 placeholder-red-600'
															: 'border'
													" class="w-full py-2 px-4 rounded-lg focus:outline-none"
													 />
											</ValidationProvider>
											<div class="flex items-center gap-4 mt-2.5">
												<ValidationProvider v-slot="{ errors }" name="Item QTY"
													:rules="required">
													<input v-model="itemDetails.qty" type="number" placeholder="QTY"
														:class="
															errors[0]
																? 'border border-red-600 placeholder-red-600'
																: 'border'
														" class="w-full py-2 px-4 rounded-lg border focus:outline-none" />
												</ValidationProvider>
												<ValidationProvider v-slot="{ errors }" name="Item price"
													:rules="required">
													<input v-model="itemDetails.price" type="number" placeholder="Price"
														:class="
															errors[0]
																? 'border border-red-600 placeholder-red-600'
																: 'border'
														" class="w-full py-2 px-4 rounded-lg border focus:outline-none" />
												</ValidationProvider>
												<button type="submit"
													class="flex-shrink-0 flex justify-center items-center cursor-pointer w-7 h-7 rounded-lg bg-lightestBlue p-1">
													<img
														src="@/assets/img/pages/dashboard/invoice/create-invoice/add-circle.svg" />
												</button>
											</div>
										</form>
									</ValidationObserver>
								</div>							
								<!-- Items List -->
								<div v-if="itemsArray.length > 0"
									class="w-full bg-lightestBlue bg-opacity-20 my-6 py-3 rounded-lg border text-sm">
									<div v-for="(item, index) in itemsArray" :key="index"
										class="flex justify-between items-center gap-2 py-1.5 px-4">
										<p class="w-full truncate uppercase">
											{{ item.name }} × {{ item.qty }}
										</p>
										<div class="flex-shrink-0 flex items-center gap-6">
											<p>${{ item.price * item.qty }}</p>
											<div class="flex items-center gap-3">
												<div class="relative">
													<img src="@/assets/img/pages/dashboard/invoice/create-invoice/close.svg"
														class="cursor-pointer" @click="deleteItem(item)" />
													<div v-if="isEditItem"
														class="absolute top-0 left-0 h-full w-full bg-white opacity-70 cursor-not-allowed">
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- Tax & P.O # -->
								<div class="flex items-center gap-4 lg:px-5 mt-12">
									<div>
										<p class="text-sm mb-1.5">TAX</p>
										<ValidationProvider v-slot="{ errors }" name="%" rules="required">
											<input v-model="invoiceTax" type="number" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="w-full py-2 px-4 rounded-lg border focus:outline-none" placeholder="%" />
										</ValidationProvider>
									</div>
									<div>
										<p class="text-sm mb-1.5">P.O. #</p>
										<ValidationProvider v-slot="{ errors }" name="Purchase Order" rules="required">
											<input v-model="form.purchaseOrder" type="text" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600'
											: 'border'" class="w-full py-2 px-4 rounded-lg border focus:outline-none"
												placeholder="Purchase Order" />
										</ValidationProvider>
									</div>
								</div>
							</div>
						</div>
						<div class="md:w-1/2 w-full ml-auto md:pl-4">
							<div class="justify-self-end">
								<p class="text-sm mt-6 mb-4 text-gray-400 px-4">Add a coupan</p>
								<div
									class="w-full flex justify-between bg-lighterBlue bg-opacity-30 py-2 px-4 rounded-lg text-sm">
									<h2 class="font-semibold uppercase">Sub Total</h2>
									<p>${{ subTotal }}</p>
								</div>
								<div class="w-full flex justify-between py-2 px-4 rounded-lg my-1">
									<h2 class="">Sales Tax {{ invoiceTax }}%</h2>
									<p>${{ Math.floor(taxAmount) }}</p>
								</div>
								<div class="w-full flex justify-between bg-lightestBlue py-2 px-4 rounded-lg">
									<h2 class="font-semibold uppercase">Total</h2>
									<p>${{ Math.floor(subTotal + taxAmount) }}</p>
								</div>
								<div class="flex items-center gap-4 w-max ml-auto mt-8">
									<button class="text-sm py-2 px-6 rounded-full"
										@click="$router.push('/dashboard/invoices')">
										Cancel
									</button>									
									<DashboardButton title="Save" type="submit" :loading="loading" 
									class="uppercase px-8 py-2" fontSize="text-sm"/>
								</div>
							</div>
						</div>
					</form>
				</ValidationObserver>
			</div>

			<!-- *******************   SAVED INVOICE SECTION   ******************* -->
			<div v-else-if="invoiceView === 'saved-invoice'" class="relative">
				<SavedInvoice :invoiceData='invoiceData' :selectedCustomer='form.selectedCustomer' :subTotal='subTotal'
					:taxAmount='taxAmount' />
			</div>

			<!-- *******************   NEW CUSTOMER MODAL   ******************* -->
			<div v-else-if="invoiceView === 'new-customer'">
				<AddCustomer @close="invoiceView = 'create-invoice'" @customerAutocomplete="customerAutocomplete" :customerList="customerList" />
			</div>

		</div>
		<div v-if="openCustomerList" class="absolute w-full h-full top-0 left-0"
			@click="openCustomerList = false"></div>
	</Container>

</template>
<script>
import AddCustomer from "../../../components/pages/dashboard/customers/add-customer.vue";
import SavedInvoice from "../../../components/pages/dashboard/invoices/saved-invoice.vue";

import { mapActions, mapGetters } from "vuex";

export default {
	layout: 'dashboard-layout',
	components: {
		AddCustomer,
		SavedInvoice,
	},
	data: () => ({
		// Toggle sections   
		invoiceView: "create-invoice",
		required: 'required',
		subTotal: 0,
		taxAmount: 0,
		timeout: null,
		itemId: null,
		isEditItem: null,
		invoiceTax: null,
		form: {
			selectedCustomer: null,
			issuedOn: null,
			dueOn: null,
			purchaseOrder: "",
		},
		itemDetails: {
			itemName: "",
			qty: null,
			price: null,
		},
		invoiceData: {},
		itemsArray: [],
		customerList: {},
		openCustomerList: false,
		loading: false,
		dateValidator: '',
		itemId: 0
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
		computeSubTotal() {
			for (let i = 0; i < this.itemsArray.length; i++) {
				this.subTotal += this.itemsArray[i].qty * this.itemsArray[i].price
			}
		},

	},
	watch: {
		invoiceTax(newVal, oldVal) {
			this.taxAmount = newVal / 100 * this.subTotal
		},
		subTotal(newVal, oldVal) {
			this.taxAmount = this.invoiceTax / 100 * this.subTotal
		}
	},
	mounted() {
		this.customerAutocomplete()
	},
	methods: {

		...mapActions({
			CUSTOMER_AUTOCOMPLETE: 'invoice/CUSTOMER_AUTOCOMPLETE',		
			CREATE_INVOICE: 'invoice/CREATE_INVOICE',
		}),
		customerAutocomplete() {
			if (this.GET_CURRENT_COMPANY) {
				let term=''
				if(this.form.selectedCustomer){
					term+=`?term=${this.form.selectedCustomer}`
				}
				this.CUSTOMER_AUTOCOMPLETE({ term: term })
					.then(response => {
						this.customerList = { ...response.data.customers }
					})
					.catch(error => {
						console.log(error)
					})
			}
		},

		  debounce() {           
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.customerAutocomplete()
            }, 300)
        },
		createInvoice() {
			this.loading = true
			if (this.form.issuedOn > this.form.dueOn) {
				this.dateValidator = 'Due date should be greater then issued date*'
			}
			else if (!this.itemsArray.length) {
				this.$toast.error({
					title: 'Item',
					message: 'Please add atleast one item',
				});
			}
			else {
				let customer_id = null
				for (let i in this.customerList) {
					if (this.customerList[i].name == this.form.selectedCustomer) {
						customer_id = this.customerList[i].id
					}
				}
				let item = []
				for (let i = 0; i < this.itemsArray.length; i++) {
					item.push({
						name: this.itemsArray[i].name,
						qty: parseInt(this.itemsArray[i].qty),
						price: parseInt(this.itemsArray[i].price)
					})
				}
				const invoiceData = {
					customer_id: customer_id,
					tax_percent: parseInt(this.invoiceTax),
					po_number: this.form.purchaseOrder,
					issued_on: Date.parse(this.form.issuedOn) / 1000,
					due_on: Date.parse(this.form.dueOn) / 1000,
					items: item
				}
				this.CREATE_INVOICE({ company_id: this.GET_CURRENT_COMPANY.id, invoiceData: invoiceData })
					.then(response => {
						this.loading = false
						this.invoiceData = { ...response.data.invoice }
						this.invoiceView = "saved-invoice";
						this.$toast.success({
							title: 'Invoice Created',
							message: 'Invoice Created Successfully',
						});
					})
					.catch(error => {
						this.loading = false
						this.$toast.error({
							title: 'Error',
							message: error.message,
						});
					})
			}

		},

		itemAdd() {
			this.itemsArray.push({ id: ++this.itemId, name: this.itemDetails.itemName, qty: this.itemDetails.qty, price: this.itemDetails.price })			
			this.required = ''
			this.itemDetails.itemName = ""
			this.itemDetails.qty = null
			this.itemDetails.price = null
			this.subTotal = 0
			this.computeSubTotal
		},

		// Remove item
		deleteItem(item) {
			this.itemsArray = this.itemsArray.filter((arr) => arr.id !== item.id);
			this.subTotal = 0
			this.computeSubTotal
		},
	},
};
</script>
<style scoped>
/* width */
::-webkit-scrollbar {
	width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
	background: #CCCCCC;
	border-radius: 10em;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #2E465C;
	border-radius: 10em;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #555;
}
</style>
