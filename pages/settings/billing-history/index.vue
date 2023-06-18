<template>
    <Container>
        <!-- FILTERS -->
        <div>
            <div class="relative rounded-xl mt-10">
                <div class="flex flex-col items-start justify-start gap-y-4 mb-4 lg:px-0 lg:flex-row">
                    <div class="w-full lg:w-5/12">
                        <form @submit.prevent="billingHistoryFilter">
                            <div
                                class="flex flex-row-reverse items-center gap-4 w-full bg-white rounded-lg px-4 lg:w-10/12">
                                <input type="text" placeholder="Search" @keydown.enter.prevent v-model="filter.term"
                                    @keyup="debounce" class="py-2.5 outline-none text-sm w-full" />
                                <button type="submit" class="outline-none">
                                    <img src="@/assets/img/pages/dashboard/taxation/search.svg" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="w-full lg:w-7/12 relative  md:items-center">
                        <div class="w-auto flex flex-col md:flex-row gap-4 justify-start lg:justify-end">
                            <div class="flex items-center">
                                <p>Filter by</p>
                            </div>
                            <div>
                                <button @click="setView('dateView')" type="button"
                                    class="inline-flex items-center justify-between w-full h-10 rounded-md shadow-sm px-4 py-2 bg-white text-md  hover:bg-gray-50 ">
                                    Date
                                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div v-if="showDropdownView === 'dateView'"
                                    :class="customDateValidator ? 'h-52' : 'h-44'"
                                    class="mt-1.5 absolute left-10 -ml-4 w-56 bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-4  z-10 ">
                                    <ValidationObserver v-slot="{ handleSubmit }">
                                        <form @submit.prevent="handleSubmit(onDateFilterSubmit)">
                                            <div class="inline-flex items-center gap-2 mb-3">
                                                <p>From </p>
                                                <ValidationProvider v-slot="{ errors }" name="from date"
                                                    rules="required">
                                                    <input :class="
                                                errors[0]
                                                    ? 'text-red-600 border-red-600 placeholder-red-600'
                                                    : 'text-blackish border-gray-300 focus:border-blue-600'"
                                                        placeholder="$" type="date" v-model="filter.fromDate"
                                                        class="w-36 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
                                                </ValidationProvider>
                                            </div>
                                            <div class="ml-5 inline-flex items-center gap-2 mb-3">
                                                <p>to </p>
                                                <ValidationProvider v-slot="{ errors }" name="to date" rules="required">
                                                    <input :class="
                                                errors[0]
                                                    ? 'text-red-600 border-red-600 placeholder-red-600'
                                                    : 'text-blackish border-gray-300 focus:border-blue-600'"
                                                        placeholder="$" type="date" v-model="filter.toDate"
                                                        class="w-36 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
                                                </ValidationProvider>
                                            </div>
                                            <p class="text-red-600 text-xs">{{ customDateValidator }}</p>
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
                                <button @click="setView('commissionFeeView')" type="button"
                                    class="inline-flex items-center justify-between w-full h-10 rounded-md shadow-sm px-4 py-2 bg-white text-md  hover:bg-gray-50 ">
                                    Commission Fee
                                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div v-if="showDropdownView === 'commissionFeeView'"
                                    :class="customFeeValidator ? 'h-52' : 'h-44'"
                                    class="mt-1.5 absolute right-30 mr-1 w-44 h-44  bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-4  z-10 ">
                                    <ValidationObserver v-slot="{ handleSubmit }">
                                        <form @submit.prevent="handleSubmit(onCommissionFeeFilterSubmit)">
                                            <div class="inline-flex items-center gap-2 mb-3">
                                                <p>From </p>
                                                <ValidationProvider v-slot="{ errors }" name="from fee"
                                                    rules="required">
                                                    <input :class="
                                                errors[0]
                                                    ? 'text-red-600 border-red-600 placeholder-red-600'
                                                    : 'text-blackish border-gray-300 focus:border-blue-600'"
                                                        placeholder="$" type="number" v-model="filter.from_fee"
                                                        class="w-24 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
                                                </ValidationProvider>
                                            </div>
                                            <div class="ml-5 inline-flex items-center gap-2 mb-3">
                                                <p>to </p>
                                                <ValidationProvider v-slot="{ errors }" name="to fee" rules="required">
                                                    <input :class="
                                                errors[0]
                                                    ? 'text-red-600 border-red-600 placeholder-red-600'
                                                    : 'text-blackish border-gray-300 focus:border-blue-600'"
                                                        placeholder="$" type="number" v-model="filter.to_fee"
                                                        class="w-24 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
                                                </ValidationProvider>
                                            </div>
                                            <p class="text-red-600 text-xs">{{ customFeeValidator }}</p>
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
                                <button @click="setView('totalChargesView')" type="button"
                                    class="inline-flex items-center justify-between w-full h-10 rounded-md shadow-sm px-4 py-2 bg-white text-md  hover:bg-gray-50 ">
                                    Total Charges
                                    <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd"
                                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <div v-if="showDropdownView === 'totalChargesView'"
                                    :class="customChargesValidator ? 'h-52' : 'h-44'"
                                    class="mt-1.5 -ml-3 absolute w-44 h-44 bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg p-4  z-10">
                                    <ValidationObserver v-slot="{ handleSubmit }">
                                        <form @submit.prevent="handleSubmit(onTotalChargesFilterSubmit)">
                                            <div class="inline-flex items-center gap-2 mb-3">
                                                <p>From </p>
                                                <ValidationProvider v-slot="{ errors }" name="from amount"
                                                    rules="required">
                                                    <input :class="
                                                errors[0]
                                                    ? 'text-red-600 border-red-600 placeholder-red-600'
                                                    : 'text-blackish border-gray-300 focus:border-blue-600'"
                                                        placeholder="$" type="number" v-model="filter.fromAmount"
                                                        class="w-24 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
                                                </ValidationProvider>
                                            </div>
                                            <div class="ml-5 inline-flex items-center gap-2 mb-3">
                                                <p>to </p>
                                                <ValidationProvider v-slot="{ errors }" name="to amount"
                                                    rules="required">
                                                    <input :class="
                                                errors[0]
                                                    ? 'text-red-600 border-red-600 placeholder-red-600'
                                                    : 'text-blackish border-gray-300 focus:border-blue-600'"
                                                        placeholder="$" type="number" v-model="filter.toAmount"
                                                        class="w-24 h-10 rounded-xl px-2 border box-border border-gray-300 focus:outline-none" />
                                                </ValidationProvider>
                                            </div>
                                            <p class="text-red-600 text-xs">{{ customChargesValidator }}</p>
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isFilterApplied" class="flex flex-wrap gap-4 mb-4">
            <div v-if="appliedFilters.isDateFilter"
                class="inline-flex items-center gap-4 bg-lightBlue rounded-xl p-3 h-6">
                <p class="font-medium text-base text-black">
                    <span> from {{ appliedFilters.fromDateFilter }} to {{ appliedFilters.toDateFilter }}</span>
                </p>
                <p @click="removeFilterDate">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </p>
            </div>
            <div v-if="appliedFilters.isFeeFilter"
                class="inline-flex items-center gap-4 bg-lightBlue rounded-xl p-3 h-6">
                <p class="font-medium text-base text-black">
                    <span> from {{ appliedFilters.from_fee_filter }} to {{ appliedFilters.to_fee_filter }}</span>
                </p>
                <p @click="removeFilterFee">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </p>
            </div>
            <div v-if="appliedFilters.isAmountFilter"
                class="inline-flex items-center gap-4 bg-lightBlue rounded-xl p-3 h-6">
                <p class="font-medium text-base text-black">
                    <span> from {{ appliedFilters.fromAmountFilter }} to {{ appliedFilters.toAmountFilter }}</span>
                </p>
                <p @click="removeFilterAmount">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 cursor-pointer" viewBox="0 0 20 20"
                        fill="currentColor">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </p>
            </div>
            <div>
                <p @click="clearAllFilters" class="cursor-pointer">Clear all</p>
            </div>
        </div>
        <!-- TABLE -->
        <div class="relative overflow-x-auto bg-white rounded-xl lg:p-8 p-5">
            <table class="w-full bg-white rounded-xl lg:p-8 p-5">
                <thead>
                    <tr>
                        <div class="flex justify-between items-center text-xs uppercase font-semibold px-2">

                            <div class="flex items-center justify-between gap-x-2.5">
                                <div class="flex w-40 gap-x-1.5">
                                    <h2>Date</h2>
                                    <div class="-mt-1 -ml-1 mr-1"
                                    :class="filter.sort.includes('date') || filter.sort.includes('-date') ? 'opacity-100 bg-gray-200 rounded-full' : ''">
                                    <img @click="sort('date')" src="@/assets/img/pages/dashboard/billing/sort.svg"                                    
                                        class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-1.5 hover:rounded-full cursor-pointer"
                                        :class="filter.sort.includes('date') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'"/>
                                    </div>
                                </div>
                                <div>
                                    <h2 class=" w-40">Description</h2>
                                </div>
                            </div>
                            <div class="flex items-center justify-between mr-1.5">
                                <div class="flex w-40 gap-x-1.5">
                                    <h2>Commission fee</h2>
                                    <div class="-mt-1 -ml-1 mr-1"
                                    :class="filter.sort.includes('fee') || filter.sort.includes('-fee') ? 'opacity-100 bg-gray-200 rounded-full' : ''">
                                    <img @click="sort('fee')" src="@/assets/img/pages/dashboard/billing/sort.svg"
                                        class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-1.5 hover:rounded-full cursor-pointer"
                                        :class="filter.sort.includes('fee') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'"/>
                                    </div>
                                </div>
                                <div class="flex w-40 gap-x-1.5">
                                    <h2>total charges</h2>
                                    <div class="-mt-1 -ml-1 mr-1"
                                    :class="filter.sort.includes('amount') || filter.sort.includes('-amount') ? 'opacity-100 bg-gray-200 rounded-full' : ''">
                                    <img @click="sort('amount')" src="@/assets/img/pages/dashboard/billing/sort.svg"
                                        class="w-full opacity-60 hover:opacity-100 hover:bg-gray-200 p-1.5 hover:rounded-full cursor-pointer"
                                        :class="filter.sort.includes('amount') ? 'rotate-180 transition-all ease-in-out duration-300' : 'transition-all ease-in-out duration-300'"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <div v-if="!loading" class="mt-4">
                            <div v-for="(history, index) in tableData" :key="index"
                                class="flex justify-between items-center bg-lighterBlue bg-opacity-60 rounded-md px-2 py-2.5 text-xs my-2">
                                <div class="flex items-center justify-between gap-x-3">
                                    <h2 class="w-40">
                                        {{ $moment((new Date(history.paid_at * 1000))).format("DD-MM-YYYY") }}
                                    </h2>
                                    <h2 class="w-40">
                                        {{ history.description }}
                                    </h2>
                                </div>
                                <div class="flex items-center justify-center">
                                    <h2 class="w-40">
                                        ${{ history.commission_fee }}
                                    </h2>
                                    <div class="flex justify-between items-center w-25 gap-x-3 w-40">
                                        <h2>
                                            ${{ history.amount }}
                                        </h2>
                                        <a :href="history.receipt_url"
                                            :class="history.receipt_url ? 'pointer-events-auto' : 'pointer-events-none'"
                                            target="_blank">
                                            <button
                                                :class="history.receipt_url ? 'bg-lightestBlue py-1.5 px-3 rounded cursor-pointer' : 'cursor-default opacity-70 bg-lightestBlue py-1.5 px-3 rounded'">
                                                PDF
                                            </button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <div v-else class="-mt-10">
                        <Loader />
                    </div>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- PAGINATION -->
        <template v-if="tableData.length">
            <Pagination :num_page="filter.num_page" :total_pages="pagination.total_pages" @changePage='changePage' />
        </template> 
       <div v-if="showDropdownView === 'dateView' || showDropdownView==='commissionFeeView' || showDropdownView==='totalChargesView'"
       class="fixed top-0 left-0 h-full w-full" @click="showDropdownView=''">
		</div>
    </Container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Pagination from "../../../components/ui/pagination.vue";
export default {
    layout: 'dashboard-layout',
    components: {
        Pagination
    },
    data: () => ({
        // FILTERS
        filter: {
            term: '',
            num_page: 1,
            per_page: 10,
            from_fee: null,
            to_fee: null,
            fromAmount: null,
            toAmount: null,
            fromDate: null,
            toDate: null,
            sort: [],
        },
        customFeeValidator: '',
        customChargesValidator: '',
        showDropdownView: '',
        customDateValidator: '',
        appliedFilters: {
            isDateFilter: false,
            isAmountFilter: false,
            isFeeFilter: false,
            fromDateFilter: '',
            toDateFilter: '',
            fromAmountFilter: '',
            toAmountFilter: '',
            from_fee_filter: '',
            to_fee_filter: ''
        },

        timeout: null,
        // Table
        loading: false,
        tableData: [],
        pagination: {
            total_pages: 0
        },
    }),
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
        isFilterApplied() {
            return this.appliedFilters.isDateFilter || this.appliedFilters.isAmountFilter || this.appliedFilters.isFeeFilter
        }
    },
    mounted() {
        this.billingHistoryFilter()
    },
    methods: {
        ...mapActions({
            FILTER_BILLING_HISTORY: 'settings/FILTER_BILLING_HISTORY',
        }),
        // FILTERS
        setView(value) {
            if (this.showDropdownView === value) {
                this.showDropdownView = ''
            } else {
                this.showDropdownView = value
            }
        },
        onDateFilterSubmit() {
            if (this.filter.fromDate > this.filter.toDate) {
                this.customDateValidator = 'To date should be greater than from date *'
            } else {
                this.customDateValidator = ''
                this.showDropdownView = ''
                this.appliedFilters.fromDateFilter = this.filter.fromDate
                this.appliedFilters.toDateFilter = this.filter.toDate
                this.appliedFilters.isDateFilter = true
                this.billingHistoryFilter()
            }
        },
        onCommissionFeeFilterSubmit() {
            if (this.filter.from_fee > this.filter.to_fee) {
                this.customFeeValidator = 'To fee should be greater than from fee *'
                this.filter.from_fee = '',
                    this.filter.to_fee = ''
            } else {
                this.customFeeValidator = ''
                this.showDropdownView = ''
                this.appliedFilters.from_fee_filter = this.filter.from_fee
                this.appliedFilters.to_fee_filter = this.filter.to_fee
                this.appliedFilters.isFeeFilter = true
                this.billingHistoryFilter()
            }
        },
        onTotalChargesFilterSubmit() {
            if (this.filter.fromAmount > this.filter.toAmount) {
                this.customChargesValidator = 'To charge should be greater than from charge *'
                this.filter.fromAmount = '',
                    this.filter.toAmount = ''
            } else {
                this.customChargesValidator = ''
                this.showDropdownView = ''
                this.appliedFilters.fromAmountFilter = this.filter.fromAmount
                this.appliedFilters.toAmountFilter = this.filter.toAmount
                this.appliedFilters.isAmountFilter = true
                this.billingHistoryFilter()
            }
        },
        removeFilterDate() {
            this.appliedFilters.isDateFilter = false
            this.filter.fromDate = null
            this.filter.toDate = null
            this.billingHistoryFilter()
        },
        removeFilterAmount() {
            this.appliedFilters.isAmountFilter = false
            this.filter.fromAmount = null
            this.filter.toAmount = null
            this.billingHistoryFilter()
        },
        removeFilterFee() {
            this.appliedFilters.isFeeFilter = false
            this.filter.from_fee = null
            this.filter.to_fee = null
            this.billingHistoryFilter()
        },
        clearAllFilters() {
            this.appliedFilters = {
                isDateFilter: false,
                isAmountFilter: false,
                isFeeFilter: false
            }
            this.filter.from_fee = null
            this.filter.to_fee = null
            this.filter.fromAmount = null
            this.filter.toAmount = null
            this.filter.fromDate = null
            this.filter.toDate = null
            this.billingHistoryFilter()
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
            this.billingHistoryFilter()
        },
        debounce() {
            this.filter.num_page = 1
            clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                this.billingHistoryFilter()
            }, 300)
        },
        // TABLE
        billingHistoryFilter() {
            this.loading = true
            let filterParams = `per_page=${this.filter.per_page}&num_page=${this.filter.num_page}`

            if (this.filter.from_fee && this.filter.to_fee) {
                filterParams += `&from_fee=${this.filter.from_fee}&to_fee=${this.filter.to_fee}`
            }
            if (this.filter.fromAmount && this.filter.toAmount) {
                filterParams += `&from_amount=${this.filter.fromAmount}&to_amount=${this.filter.toAmount}`
            }
            if (this.filter.fromDate && this.filter.toDate) {
                filterParams += `&from_date=${Date.parse(this.filter.fromDate) / 1000}&to_date=${Date.parse(this.filter.toDate) / 1000}`
            }
            if (this.filter.sort.length) {
                filterParams += `&sort=${this.filter.sort.toString()}`
            }
            if (this.filter.term) {
                filterParams += `&term=${this.filter.term}`
            }
            this.FILTER_BILLING_HISTORY({ company_id: this.GET_CURRENT_COMPANY.id, filters: filterParams })
                .then(response => {
                    this.loading = false
                    this.pagination.total_pages = response.data.pagination.total_pages
                    if (response.data.histories) {
                        this.tableData = response.data.histories
                    } else {
                        this.tableData = []
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
            this.billingHistoryFilter()
        },
    }
};
</script>
