<template>
	<Container>
		<div class="bg-white rounded-xl py-5 px-5 lg:px-10 my-6">
			<!-- setting icon -->
			<div class="flex justify-end gap-3">
				<div class="flex-shrink-0 sm:hidden block w-10">
					<img src="@/assets/img/pages/dashboard/invoice/sort-down.svg"
						class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"
						@click="sortAll"
						:class="!ascendAll ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'" />
				</div>
				<nuxt-link to="/dashboard/invoices/settings">
					<div class="ml-auto sm:w-10 w-10">
						<img src="@/assets/img/pages/dashboard/invoice/setting.svg"
							class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer" />
					</div>
				</nuxt-link>
			</div>

			<!-- table headers -->
			<div class="flex flex-col-reverse md:flex-row justify-between items-start gap-4 my-6 border-b">
				<div class="w-full overflow-x-scroll scrollbar-none">
					<div class="table-headers flex gap-2">
						<div v-for="(invoice, index) in invoiceOptions" :key="index" :class="
							invoice.name === selectedInvoiceOption &&
							'border-b border-gray-400'
						" class="text-sm pt-3 pb-5 px-3 cursor-pointer transition-all duration-200 ease-in-out"
							@click="invoiceFilter(invoice.name), selectedInvoiceOption = invoice.name">
							{{ invoice.name }}
						</div>
					</div>
				</div>
				<div class="flex-shrink-0 flex items-center sm:gap-7 gap-4 sm:pr-3 pb-0">
					<div class="flex-shrink-0 sm:block hidden" :class="!ascendAll || !clearFilter ? 'opacity-100 bg-gray-200 rounded-full' : ''">
						<img src="@/assets/img/pages/dashboard/invoice/sort-down.svg"
							class="opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"
							@click="sortAll"
							:class="!ascendAll ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'" />
					</div>
					<nuxt-link to="/dashboard/invoices/create-invoice">
						<div
							class="w-max rounded-full bg-normalBlue py-2 px-8 text-white sm:text-sm text-xs cursor-pointer">
							Create an Invoice
						</div>
					</nuxt-link>
					<button
						class="w-max bg-blackish text-white rounded-full py-2 px-8 sm:text-sm text-xs cursor-pointer"
						@click="exportInvoice" :disabled="loadingExportInvoice">
						<span v-if="!loadingExportInvoice" class="flex gap-2">
							<img src="@/assets/img/pages/dashboard/invoice/export.svg" class="w-5 h-5" />
							<span>Export</span>
						</span>
						<span v-if="loadingExportInvoice" class="flex">
							<svg class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg"
								fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
									stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
								</path>
							</svg>
							Export
						</span>
					</button>
				</div>
			</div>

			<!-- Table -->
			<div class="w-full overflow-x-auto">
				<div class="invoice-table w-full">
					<!-- Headings -->
					<div class="flex items-center pb-2">
						<div v-for="(heading, index) in invoiceHeadings" :key="index"
							class="flex items-center gap-2 min-w-52 w-full pl-2">
							<p class="text-xs 2xl:text-sm">{{ heading.name }}</p>
							<div :class="filter.sort.includes(heading.sortName) || filter.sort.includes(`-${heading.sortName}`) ? 'opacity-100 bg-gray-200 rounded-full' : ''">
							<img v-if="heading.name !== 'Status'" @click="sort(heading.sortName)"
								src="@/assets/img/pages/dashboard/invoice/filter.svg"
								class="opacity-60 hover:opacity-100 hover:bg-gray-200 p-2 hover:rounded-full cursor-pointer"								
								:class="filter.sort.includes(heading.sortName) ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'"
								alt="" />
								</div>
						</div>
					</div>

					<!-- Data rows -->
					<div v-if="!loadingCustomer" class="mt-4">
						<div v-for="(data, index) in invoices" :key="index"
							class="flex items-center border-t pt-4 pb-2">
							<p class="min-w-52 w-full truncate text-xs 2xl:text-sm pl-2">
								{{ data.customer_name }}
							</p>
							<p class="min-w-52 w-full truncate text-xs 2xl:text-sm pl-2">
								{{ data.invoice_num }}
							</p>
							<div
								class="w-7/12 mr-14 truncate flex items-center justify-between text-xs 2xl:text-sm pl-2">
								<span class="font-semibold">${{ data.amount }}</span>
								<span class="text-gray-300">USD</span>
							</div>
							<div class="min-w-52 w-full truncate text-xs 2xl:text-sm pl-2">
								<p :class="status(data.status)">
									{{ data.status }}
								</p>
							</div>
							<p class="min-w-52 w-full truncate text-xs 2xl:text-sm pl-2">
								{{ $moment((new Date(data.due_on * 1000))).format("DD-MM-YYYY") }}
							</p>
							<p class="min-w-52 w-full truncate text-xs 2xl:text-sm pl-2">
								{{ $moment((new Date(data.created_at * 1000))).format("DD-MM-YYYY") }}
							</p>
						</div>
					</div>
					<div v-else class="-mt-12">
						<Loader />
					</div>
				</div>
			</div>
		</div>
		<template v-if="invoices.length">
			<Pagination :num_page="filter.num_page" :total_pages="pagination.total_pages" @changePage='changePage' />
		</template>
	</Container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Pagination from '../../../components/ui/pagination.vue';
export default {
	layout: "dashboard-layout",
	components: { Pagination },
	data: () => ({
		// Invoice header
		invoices: [],
		ascendAll: true,
		clearFilter: true,
		pagination: {
			total_pages: 0
		},
		filter: {
			num_page: 1,
			per_page: 10,
			sort: [],
		},
		invoiceOptions: [
			{
				id: 1,
				name: "All Invoices",
			},
			{
				id: 2,
				name: "Drafts",
			},
			{
				id: 3,
				name: "Past Due",
			},
			{
				id: 4,
				name: "Paid",
			},
		],
		invoiceHeadings: [
			{
				id: 1,
				name: "Cutomer",
				sortName: 'name'
			},
			{
				id: 2,
				name: "Invoice Number",
				sortName: 'no'
			},
			{
				id: 3,
				name: "Amount",
				sortName: 'amount'
			},
			{
				id: 4,
				name: "Status",
			},
			{
				id: 5,
				name: "Due Date",
				sortName: 'due'
			},
			{
				id: 6,
				name: "Created",
				sortName: 'created'
			},
		],
		selectedInvoiceOption: "All Invoices",
		loadingCustomer: false,
		loadingExportInvoice: false,
	}),
	created() {
		this.invoiceFilter();
	},
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),

	},
	methods: {
		...mapActions({
			INVOICES_FILTER: 'invoice/INVOICES_FILTER',
			EXPORT_INVOICE: 'invoice/EXPORT_INVOICE'
		}),
		changePage(val) {
			switch (val) {
				case 0: this.filter.num_page = 1; break;
				case -1: this.filter.num_page = this.filter.num_page > 1 ? this.filter.num_page - 1 : this.filter.num_page; break;
				case 1: this.filter.num_page = this.filter.num_page < this.pagination.total_pages ? this.filter.num_page + 1 : this.filter.num_page; break;
				case this.pagination.total_pages: this.filter.num_page = this.pagination.total_pages; break;
			}
			this.invoiceFilter()
		},
		sortAll() {
			if (this.ascendAll) {
				if(!this.clearFilter){
					this.filter.sort = []
					this.clearFilter=true
				}
				else{
				this.filter.sort = [];
				this.invoiceHeadings.forEach(option => {
					if (option.sortName) {
						this.filter.sort.push(option.sortName)
					}
				});
				this.ascendAll = false;
				}
			} else {
				this.filter.sort = [];
				this.invoiceHeadings.forEach(option => {
					if (option.sortName) {
						this.filter.sort.push(`-${option.sortName}`)
					}
				});
				this.clearFilter=false
				this.ascendAll = true;
			}
			this.invoiceFilter()
		},
		status(options) {
			let className = ''
			if (options === 'draft') {
				className = 'w-max bg-gray-300 px-2.5 py-0.5 rounded-xl'
			}
			else if (options === 'paid') {
				className = 'bg-green-600 bg-opacity-50 text-white w-max px-2.5 py-0.5 rounded-xl'
			}
			else if (options === 'sent') {
				className = 'bg-green-600 bg-opacity-50 text-white  w-max px-2.5 py-0.5 rounded-xl'
			}
			else if (options === 'past_due') {
				className = 'bg-red-600 bg-opacity-50 text-white w-max px-2.5 py-0.5 rounded-xl'
			}
			else {
				className = 'bg-gray-600 w-max px-2.5 py-0.5 rounded-xl'
			}
			return className
		},
		invoiceFilter(name) {
			this.loadingCustomer = true
			let filterParams = `per_page=${this.filter.per_page}&num_page=${this.filter.num_page}`
			if (name === 'Past Due') {
				filterParams += `&status=past_due`
			}
			else if (name === 'Drafts') {
				filterParams += `&status=draft`
			}
			else if (name === 'Paid') {
				filterParams += `&status=paid`
			}
			if (this.filter.sort.length) {
				filterParams += `&sort=${this.filter.sort.toString()}`
			}
			if (this.GET_CURRENT_COMPANY) {
				this.invoices = []
				this.INVOICES_FILTER({ company_id: this.GET_CURRENT_COMPANY.id, filters: filterParams })
					.then(response => {
						this.loadingCustomer = false
						if (response.data.invoices) {
							this.invoices = response.data.invoices;
						}
						else {
							this.invoices = []
						}
						this.pagination.total_pages = response.data.pagination.total_pages
					})
					.catch(error => {
						this.loadingCustomer = false
					})
			}
		},
		sort(option) {
			let index = -1
			let asc=true,clearFilter
			for (let i = 0; i < this.filter.sort.length; i++) {
				if (this.filter.sort[i] === option) {
					index = i
					asc = false
					break
				} else if (this.filter.sort[i] === `-${option}`) {
					index = i
					clearFilter=false
					break
				}
			}
			if (index === -1) {
				this.filter.sort.push(option)
			} else if (asc) {
				if(!clearFilter){
					this.filter.sort.splice(index,1)
					clearFilter=true					
				}
				else{
					this.filter.sort[index] = option
				}				
			} else {
				this.filter.sort[index] = `-${option}`
			}
			this.invoiceFilter()
		},
		exportInvoice() {
			this.loadingExportInvoice = true
			this.EXPORT_INVOICE()
				.then(response => {
					console.log(response)
					let link = document.createElement('a');
					link.href = `${process.env.BASE_URL}/api${response.data.data}`;
					link.target = '_blank';
					link.download = 'data.csv';
					link.dispatchEvent(new MouseEvent('click'));
					this.loadingExportInvoice = false
				})
				.catch(error => {
					this.loadingExportInvoice = false
				})
		}
	},
};
</script>

<style scoped>
.table-headers {
	min-width: 380px;
}

.invoice-table {
	min-width: 800px;
}
</style>
