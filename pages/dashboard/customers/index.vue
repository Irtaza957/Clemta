<template>
	<Container>
		<!-- FILTERS -->
		<div class="relative my-6 rounded-xl">
			<div class="flex flex-col items-start justify-between mb-4 gap-y-4 lg:px-0 lg:flex-row">
				<div class="w-full lg:w-4/12">
					<form @submit.prevent="filterCustomer">
						<div
							class="flex flex-row-reverse items-center justify-center gap-4 w-full bg-white rounded-lg px-4">
							<input type="text" placeholder="Search" class="py-2.5 outline-none text-sm w-full"
								v-model="filter.term" @keyup="debounce" />
							<button type="submit" class="outline-none">
								<img src="@/assets/img/pages/dashboard/taxation/search.svg" />
							</button>
						</div>
					</form>
				</div>
				<div class="w-full lg:w-10/12 relative  md:items-center">
					<div class="w-auto flex flex-col md:flex-row gap-4 justify-start lg:justify-end">
						<div class="flex items-center">
							<p>Filter by</p>
						</div>
						<div>
							<button @click="setView('spendView')" type="button"
								class="inline-flex items-center justify-between w-full h-10 rounded-md shadow-sm px-4 py-2 bg-white text-md  hover:bg-gray-50 ">
								Total Spend
								<svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
									fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd" />
								</svg>
							</button>
							<div v-if="showDropdownView === 'spendView'" :class="customSpendValidator ? 'h-52' : 'h-44'"
								class="mt-1.5 absolute -ml-4 w-44 h-44  bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-4  z-10 ">
								<ValidationObserver v-slot="{ handleSubmit }">
									<form @submit.prevent="handleSubmit(onSpendFilterSubmit)">
										<div class="inline-flex items-center gap-2 mb-3">
											<p>From </p>
											<ValidationProvider v-slot="{ errors }" rules="required">
												<input :class="
											errors[0]
												? 'text-red-600 border-red-600 placeholder-red-600'
												: 'text-blackish border-gray-300 focus:border-blue-600'" placeholder="$" type="number"
													v-model="filter.fromSpend"
													class="w-24 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
											</ValidationProvider>
										</div>
										<div class="ml-5 inline-flex items-center gap-2 mb-3">
											<p>to </p>
											<ValidationProvider v-slot="{ errors }" name="confirm" vid="confirm"
												rules="required">
												<input :class="
											errors[0]
												? 'text-red-600 border-red-600 placeholder-red-600'
												: 'text-blackish border-gray-300 focus:border-blue-600'" placeholder="$" type="number"
													v-model="filter.toSpend"
													class="w-24 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
											</ValidationProvider>
										</div>
										<p class="text-red-600 text-xs">{{ customSpendValidator }}</p>
										<div>
											<button type="submit"
												class="absolute bg-blackish text-white rounded-3xl w-24 h-10 text-center font-bold text-sm right-4 ">
												Apply
											</button>
										</div>
									</form>
								</ValidationObserver>
							</div>
						</div>
						<div>
							<button @click="setView('paymentView')" type="button"
								class="inline-flex items-center justify-between w-full h-10 rounded-md shadow-sm px-4 py-2 bg-white text-md  hover:bg-gray-50 ">
								Last Payment
								<svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
									fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd" />
								</svg>
							</button>
							<div v-if="showDropdownView === 'paymentView'"
								:class="paymentDateValidator ? 'h-52' : 'h-44'"
								class="mt-1.5 absolute md:-ml-9 w-56 h-44  bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-4  z-10 ">
								<ValidationObserver v-slot="{ handleSubmit }">
									<form @submit.prevent="handleSubmit(onPaymentFilterSubmit)">
										<div class="inline-flex items-center gap-2 mb-3">
											<p>From </p>
											<ValidationProvider v-slot="{ errors }" name="from date" rules="required">
												<input :class="
											errors[0]
												? 'text-red-600 border-red-600 placeholder-red-600'
												: 'text-blackish border-gray-300 focus:border-blue-600'" placeholder="$" type="date"
													v-model="filter.fromPayment"
													class="w-36 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
											</ValidationProvider>
										</div>
										<div class="ml-5 inline-flex items-center gap-2 mb-3">
											<p>to </p>
											<ValidationProvider v-slot="{ errors }" name="to date" rules="required">
												<input :class="
											errors[0]
												? 'text-red-600 border-red-600 placeholder-red-600'
												: 'text-blackish border-gray-300 focus:border-blue-600'" placeholder="$" type="date"
													v-model="filter.toPayment"
													class="w-36 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
											</ValidationProvider>
										</div>
										<p class="text-red-600 text-xs">{{ paymentDateValidator }}</p>
										<div>
											<button type="submit"
												class="absolute right-5 bg-blackish text-white rounded-3xl w-24 h-10 text-center font-bold text-sm ">
												Apply
											</button>
										</div>
									</form>
								</ValidationObserver>
							</div>
						</div>
						<div>
							<button @click="setView('createdView')" type="button"
								class="inline-flex items-center justify-between w-full h-10 rounded-md shadow-sm px-4 py-2 bg-white text-md  hover:bg-gray-50 ">
								Created
								<svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
									fill="currentColor" aria-hidden="true">
									<path fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd" />
								</svg>
							</button>
							<div v-if="showDropdownView === 'createdView'"
								:class="createdDateValidator ? 'h-52' : 'h-44'"
								class="mt-1.5 absolute md:-ml-16 w-56 h-44  bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-4  z-10 ">
								<ValidationObserver v-slot="{ handleSubmit }">
									<form @submit.prevent="handleSubmit(onCreatedFilterSubmit)">
										<div class="inline-flex items-center gap-2 mb-3">
											<p>From </p>
											<ValidationProvider v-slot="{ errors }" name="from date" rules="required">
												<input :class="
											errors[0]
												? 'text-red-600 border-red-600 placeholder-red-600'
												: 'text-blackish border-gray-300 focus:border-blue-600'" placeholder="$" type="date"
													v-model="filter.fromCreated"
													class="w-36 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
											</ValidationProvider>
										</div>
										<div class="ml-5 inline-flex items-center gap-2 mb-3">
											<p>to </p>
											<ValidationProvider v-slot="{ errors }" name="to date" rules="required">
												<input :class="
											errors[0]
												? 'text-red-600 border-red-600 placeholder-red-600'
												: 'text-blackish border-gray-300 focus:border-blue-600'" placeholder="$" type="date"
													v-model="filter.toCreated"
													class="w-36 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
											</ValidationProvider>
										</div>
										<p class="text-red-600 text-xs">{{ createdDateValidator }}</p>
										<div>
											<button type="submit"
												class="absolute right-5 bg-blackish text-white rounded-3xl w-24 h-10 text-center font-bold text-sm ">
												Apply
											</button>
										</div>
									</form>
								</ValidationObserver>
							</div>
						</div>
						<div>
							<button class="bg-normalBlue text-white rounded-full py-2 px-4 text-sm flex-shrink-0"
								@click="addCustomerModel = true">
								Add Customer
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-if="isFilterApplied" class="flex flex-wrap gap-4 mb-4">
			<div v-if="appliedFilters.isSpendFilter"
				class="inline-flex items-center justify-center gap-4 bg-lightBlue rounded-xl p-3 h-6">
				<p class="font-medium text-base text-black">
					<span> from {{ appliedFilters.fromSpendFilter }} to {{ appliedFilters.toSpendFilter }}</span>
				</p>
				<p @click="removeFilterSpend">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" viewBox="0 0 20 20"
						fill="currentColor">
						<path fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd" />
					</svg>
				</p>
			</div>
			<div v-if="appliedFilters.isPaymentFilter"
				class="inline-flex items-center gap-4 bg-lightBlue rounded-xl p-3 h-6">
				<p class="font-medium text-base text-black">
					<span> from {{ appliedFilters.fromPaymentFilter }} to {{ appliedFilters.toPaymentFilter }}</span>
				</p>
				<p @click="removeFilterPayment">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" viewBox="0 0 20 20"
						fill="currentColor">
						<path fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd" />
					</svg>
				</p>
			</div>
			<div v-if="appliedFilters.isCreatedFilter"
				class="inline-flex items-center gap-4 bg-lightBlue rounded-xl p-3 h-6">
				<p class="font-medium text-base text-black">
					<span> from {{ appliedFilters.fromCreatedFilter }} to {{ appliedFilters.toCreatedFilter }}</span>
				</p>
				<p @click="removeFilterCreated">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" viewBox="0 0 20 20"
						fill="currentColor">
						<path fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd" />
					</svg>
				</p>
			</div>

			<div>
				<p @click="clearHandler" class="cursor-pointer">Clear all</p>
			</div>
		</div>
		<!-- TABLE -->
		<div class="w-full overflow-x-auto">
			<div class="w-max lg:w-full bg-white rounded-xl lg:p-8 p-5">
				<div class="flex justify-between items-center text-xs uppercase font-semibold px-2">
					<div class="flex items-center">
						<div class="w-52 flex items-center gap-3">
							Name
							<div class="w-9"
								:class="filter.sort.includes('name') || filter.sort.includes(`-name`) ? 'opacity-100 bg-gray-200 rounded-full' : ''">
								<img @click="sort('name')" src="@/assets/img/pages/dashboard/invoice/sort-down.svg"
									class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"
									:class="filter.sort.includes('name') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'" />
							</div>
						</div>
						<h2 class="w-52">Email</h2>
					</div>
					<div class="flex-shrink-0 flex items-center">
						<div class="flex items-center gap-3 w-40">
							Total Spend
							<div class="w-9"
								:class="filter.sort.includes('spend') || filter.sort.includes(`-spend`) ? 'opacity-100 bg-gray-200 rounded-full' : ''">
								<img @click="sort('spend')" src="@/assets/img/pages/dashboard/invoice/sort-down.svg"
									class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"
									:class="filter.sort.includes('spend') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'" />
							</div>
						</div>
						<div class="flex items-center gap-3 w-40">
							Last Payment
							<div class="w-9"
								:class="filter.sort.includes('paid') || filter.sort.includes(`-paid`) ? 'opacity-100 bg-gray-200 rounded-full' : ''">
								<img @click="sort('paid')" src="@/assets/img/pages/dashboard/invoice/sort-down.svg"
									class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"
									:class="filter.sort.includes('paid') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'" />
							</div>
						</div>
						<div class="flex items-center gap-3 w-40">
							Created
							<div class="w-9"
								:class="filter.sort.includes('created') || filter.sort.includes(`-created`) ? 'opacity-100 bg-gray-200 rounded-full' : ''">
								<img @click="sort('created')" src="@/assets/img/pages/dashboard/invoice/sort-down.svg"
									class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"
									:class="filter.sort.includes('created') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'" />
							</div>
						</div>
					</div>
				</div>
				<div v-if="!loading" class="mt-4">
					<div v-for="(customer, index) in GET_ALL_CUSTOMERS" :key="index"
						class="flex justify-between items-center bg-lighterBlue bg-opacity-60 rounded-md px-2 py-2.5 text-xs my-2">
						<div class="flex items-center">
							<h2 class="w-52">
								{{ customer.name }}
							</h2>
							<h2 class="w-52">
								{{ customer.account_email }}
							</h2>
						</div>
						<div class="flex-shrink-0 flex items-center">
							<h2 class="w-40">
								$ {{ customer.total_spend }}
							</h2>
							<h2 class="w-40">
								{{ $moment((new Date(customer.updated_at * 1000))).format("DD-MM-YYYY") }}
							</h2>
							<div class="flex justify-between items-center w-36 2xl:w-40">
								<h2>
									{{ $moment((new Date(customer.created_at * 1000))).format("DD-MM-YYYY") }}
								</h2>
								<div class="bg-lightestBlue cursor-pointer py-1.5 px-3 rounded"
									@click="downloadInvoice(customer)">
									PDF
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-else class="-mt-10">
					<Loader />
				</div>
			</div>
		</div>
		<template v-if="customers.length">
			<Pagination :num_page="filter.num_page" :total_pages="pagination.total_pages" @changePage='changePage' />
		</template>
		<!-- NEW CUSTOMER MODAL -->
		<div v-if="addCustomerModel === true">
			<AddCustomer @close="addCustomerModel = false" />
		</div>
		<div v-if="showDropdownView === 'spendView' || showDropdownView === 'paymentView' || showDropdownView === 'createdView'"
			class="fixed top-0 left-0 h-full w-full" @click="showDropdownView = ''">
		</div>
	</Container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AddCustomer from '../../../components/pages/dashboard/customers/add-customer.vue';
import Pagination from "../../../components/ui/pagination.vue";
export default {
	layout: 'dashboard-layout',
	components: {
		AddCustomer,
		Pagination,
	},
	data: () => ({
		// FILTERS
		filter: {
			num_page: 1,
			per_page: 10,
			fromSpend: null,
			toSpend: null,
			fromPayment: null,
			toPayment: null,
			fromCreated: null,
			toCreated: null,
			sort: [],
			term: '',
		},
		customSpendValidator: '',
		showDropdownView: '',
		paymentDateValidator: '',
		createdDateValidator: '',
		appliedFilters: {
			isSpendFilter: false,
			isCreatedFilter: false,
			isPaymentFilter: false,
			toSpendFilter: '',
			fromSpendFilter: '',
			fromPaymentFilter: '',
			toPaymentFilter: '',
			fromCreatedFilter: '',
			toCreatedFilter: ''
		},
		timeout: null,
		// TABLE
		customers: [],
		pagination: {
			total_pages: 0
		},
		loading: false,
		// NEW CUSTOMER MODAL
		addCustomerModel: false,
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
			GET_ALL_CUSTOMERS: "customers/GET_ALL_CUSTOMERS"
		}),
		isFilterApplied() {
			return this.appliedFilters.isSpendFilter || this.appliedFilters.isCreatedFilter || this.appliedFilters.isPaymentFilter
		}
	},
	mounted() {
		this.filterCustomer();
	},
	methods: {
		...mapActions({
			FILTER_CUSTOMER: "customers/FILTER_CUSTOMER",
			DOWNLOAD_CUSTOMER_INVOICE: "customers/DOWNLOAD_CUSTOMER_INVOICE"
		}),
		// FILTERS
		setView(value) {
			if (this.showDropdownView === value) {
				this.showDropdownView = ''
			} else {
				this.showDropdownView = value
			}
		},
		onSpendFilterSubmit() {
			if (this.filter.fromSpend > this.filter.toSpend) {
				this.customSpendValidator = 'To spend should be greater than from spend *'
			} else {
				this.customSpendValidator = ''
				this.showDropdownView = ''
				this.appliedFilters.fromSpendFilter = this.filter.fromSpend
				this.appliedFilters.toSpendFilter = this.filter.toSpend
				this.appliedFilters.isSpendFilter = true
				this.filterCustomer()
			}
		},
		onPaymentFilterSubmit() {
			if (this.filter.fromPayment > this.filter.toPayment) {
				this.paymentDateValidator = 'To date should be greater than from date *'
			} else {
				this.paymentDateValidator = ''
				this.showDropdownView = ''
				this.appliedFilters.fromPaymentFilter = this.filter.fromPayment
				this.appliedFilters.toPaymentFilter = this.filter.toPayment
				this.appliedFilters.isPaymentFilter = true
				this.filterCustomer()
			}
		},
		onCreatedFilterSubmit() {
			if (this.filter.fromCreated > this.filter.toCreated) {
				this.createdDateValidator = 'To date should be greater than from date *'
			} else {
				this.createdDateValidator = ''
				this.showDropdownView = ''
				this.appliedFilters.fromCreatedFilter = this.filter.fromCreated
				this.appliedFilters.toCreatedFilter = this.filter.toCreated
				this.appliedFilters.isCreatedFilter = true
				this.filterCustomer()
			}
		},
		removeFilterSpend() {
			this.appliedFilters.isSpendFilter = false
			this.filter.fromSpend = null
			this.filter.toSpend = null
			this.filterCustomer()
		},
		removeFilterPayment() {
			this.appliedFilters.isPaymentFilter = false
			this.filter.fromPayment = null
			this.filter.toPayment = null
			this.filterCustomer()
		},
		removeFilterCreated() {
			this.appliedFilters.isCreatedFilter = false
			this.filter.fromCreated = null
			this.filter.toCreated = null
			this.filterCustomer()
		},
		clearHandler() {
			this.appliedFilters = {
				isSpendFilter: false,
				isCreatedFilter: false,
				isPaymentFilter: false
			}
			this.filter.fromSpend = null
			this.filter.toSpend = null
			this.filter.fromPayment = null
			this.filter.toPayment = null
			this.filter.fromCreated = null
			this.filter.toCreated = null
			this.filterCustomer()
		},
		sort(option) {
			let index = -1
			let asc = true, clearFilter
			for (let i = 0; i < this.filter.sort.length; i++) {
				if (this.filter.sort[i] === option) {
					index = i
					asc = false
					break
				} else if (this.filter.sort[i] === `-${option}`) {
					index = i
					clearFilter = false
					break
				}
			}
			if (index === -1) {
				this.filter.sort.push(option)
			} else if (asc) {
				if (!clearFilter) {
					this.filter.sort.splice(index, 1)
					clearFilter = true
				} else {
					this.filter.sort[index] = option
				}
			} else {
				this.filter.sort[index] = `-${option}`
			}
			this.filterCustomer()
		},
		debounce() {
			this.filter.num_page = 1
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				this.filterCustomer()
			}, 300)
		},
		// TABLE
		downloadInvoice(customer) {
			this.DOWNLOAD_CUSTOMER_INVOICE({ customerId: customer.id })
				.then((response) => {
					fetch(`${process.env.BASE_URL}/api${response.data.file}`)
						.then(response => response.blob())
						.then(blob => {
							const link = document.createElement("a");
							link.href = URL.createObjectURL(blob);
							link.download = 'invoice.pdf';
							link.click();
						})
					this.$toast.success({
						title: "Invoice downloaded",
						message: "Your file has been updated successfully",
					})
				})
				.catch((error) => {
					this.$toast.error({
						title: "Invoice downloaded error!",
						message: "No Invoice Found For This Customer",
					})
				})
		},
		filterCustomer() {
			this.loading = true
			let filterParams = `per_page=${this.filter.per_page}&num_page=${this.filter.num_page}`

			if (this.filter.fromSpend && this.filter.toSpend) {
				filterParams += `&from_spend=${this.filter.fromSpend}&to_spend=${this.filter.toSpend}`
			}
			if (this.filter.fromPayment && this.filter.toPayment) {
				filterParams += `&from_paid=${Date.parse(this.filter.fromPayment) / 1000}&to_paid=${Date.parse(this.filter.toPayment) / 1000}`
			}
			if (this.filter.fromCreated && this.filter.toCreated) {
				filterParams += `&from_created=${Date.parse(this.filter.fromCreated) / 1000}&to_created=${Date.parse(this.filter.toCreated) / 1000}`
			}
			if (this.filter.sort.length) {
				filterParams += `&sort=${this.filter.sort.toString()}`
			}
			if (this.filter.term) {
				filterParams += `&term=${this.filter.term}`
			}
			this.customers = []
			this.FILTER_CUSTOMER({ company_id: this.GET_CURRENT_COMPANY.id, filters: filterParams })
				.then(response => {
					this.loading = false
					this.pagination.total_pages = response.data.pagination.total_pages
					if (response.data.customers) {
						this.customers = response.data.customers
					} else {
						this.customers = []
					}
				})
				.catch(error => {
					this.loading = false
				})
		},
		changePage(val) {
			switch (val) {
				case 0: this.filter.num_page = 1; break;
				case -1: this.filter.num_page = this.filter.num_page > 1 ? this.filter.num_page - 1 : this.filter.num_page; break;
				case 1: this.filter.num_page = this.filter.num_page < this.pagination.total_pages ? this.filter.num_page + 1 : this.filter.num_page; break;
				case this.pagination.total_pages: this.filter.num_page = this.pagination.total_pages; break;
			}
			this.filterCustomer()
		}
	}
};
</script>

