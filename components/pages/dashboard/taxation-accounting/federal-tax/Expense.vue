<template>
    <div>
        <div class="grid sm:grid-cols-2 grid-cols-1 gap-5">
            <div
                class="flex lg:flex-row flex-col-reverse justify-between items-center gap-6 bg-white rounded-2xl h-max md:py-4 md:px-5 p-5">
                <div class="w-full text-center">
                    <h1 class="2xl:text-xl text-lg font-bold">Upload Document</h1>
                    <p class="mt-2 2xl:text-base text-sm">Description</p>
                </div>
                <label
                    class="flex-shrink-0 h-full border-dashed border border-blackish rounded-lg flex items-center justify-center cursor-pointer">
                    <span
                        class="flex items-center gap-3 bg-blackish py-2.5 px-5 2xl:m-6 m-5 rounded-full text-white text-xs ">
                        <input type="file" hidden>
                        <img src="@/assets/img/pages/dashboard/taxation/upload.svg" />
                        Upload Document
                    </span>
                </label>
            </div>
            <div
                class="flex lg:flex-row flex-col-reverse justify-between items-center gap-6 bg-white rounded-2xl h-max md:py-4 md:px-5 p-5">
                <div class="w-full text-center">
                    <h1 class="2xl:text-xl text-lg font-bold">Download Document</h1>
                    <p class="mt-2 2xl:text-base text-sm">Description</p>
                </div>
                <div
                    class="flex-shrink-0 h-full border border-gray-400 rounded-lg flex items-center justify-center cursor-pointer">
                    <div class="flex items-center gap-3 bg-lighterBlue py-2.5 px-5 2xl:m-6 m-5 rounded-full text-xs">
                        <img src="@/assets/img/pages/dashboard/taxation/upload.svg"
                            class="filter invert transform rotate-180" />
                        Download Document
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-7 rounded-2xl bg-white md:p-8 p-5">
            <div class="flex justify-between items-center gap-4 flex-wrap">
                <div class="flex items-center border borger-gray-300 rounded-full px-5">
                    <img src="@/assets/img/pages/dashboard/taxation/search-light.svg" alt="" />
                    <input type="text" placeholder="Find expenses"
                        class="py-1.5 px-3 text-sm rounded-full w-44 outline-none" />
                </div>
                <div class="flex items-center flex-wrap gap-2">
                    <p class="text-sm flex-shrink-0">Select Range</p>
                    <div class="flex-shrink-0 bg-lighterBlue py-2 px-3 w-44 rounded-full mr-4">
                        <input type="month" placeholder="may 2021" class="bg-transparent outline-none w-full text-sm" />
                    </div>
                    <div
                        class="flex-shrink-0 sm:w-24 w-20 block ml-auto bg-normalBlue text-white text-center rounded-full text-sm sm:py-2.5 py-2 cursor-pointer">
                        Save
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <h1 class="text-xl font-bold">Sales</h1>
                <div class="overflow-x-scroll scrollbar-none">
                    <div class="table-width mt-2 flex flex-col gap-5 bg-lighterBlue bg-opacity-60 px-6 py-4 rounded-xl">
                        <div class="flex justify-between items-end">
                            <p class="text-sm">Gross Receipts or Sales During the year</p>
                            <p class="text-sm pb-px border-b border-blackish pr-2 sm:pl-14 pl-8">
                                ${{ this.GET_FEDERAL_COST_SALES.sales_gross_receipts }}
                            </p>
                        </div>
                        <div class="flex justify-between items-end">
                            <p class="text-sm">Returns and allowance</p>
                            <p class="text-sm pb-px border-b border-blackish pr-2 sm:pl-14 pl-8">
                                ${{ this.GET_FEDERAL_COST_SALES.sales_returns_and_allowance }}
                            </p>
                        </div>
                        <div class="flex justify-between items-end">
                            <p class="text-sm">Sales During the year</p>
                            <p class="text-sm pb-px border-b border-blackish pr-2 sm:pl-14 pl-8">
                                ${{ this.GET_FEDERAL_COST_SALES.sales_sales_during_the_year }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-10">
                <div class="flex justify-between flex-wrap gap-3">
                    <h1 class="text-xl font-bold">Cost of Goods Sold</h1>
                    <p class="text-lg text-normalBlue mr-6 w-max ml-auto">
                        $100,000
                    </p>
                </div>
                <div class="overflow-x-scroll scrollbar-none">
                    <div class="table-width mt-2 flex flex-col gap-5 bg-lighterBlue bg-opacity-60 px-6 py-4 rounded-xl">
                        <div class="flex justify-between items-end">
                            <p class="text-sm">Beginning Inventory (1/1/2020)</p>
                            <p class="text-sm pb-px border-b border-blackish pr-2 sm:pl-14 pl-8">
                                ${{ this.GET_FEDERAL_COST_SALES.cgs_beginning_inventory }}
                            </p>
                        </div>
                        <div class="flex justify-between items-end">
                            <p class="text-sm">Purchase During the Year</p>
                            <p class="text-sm pb-px border-b border-blackish pr-2 sm:pl-14 pl-8">
                                ${{ this.GET_FEDERAL_COST_SALES.cgs_purchase_during_the_year }}
                            </p>
                        </div>
                        <div class="flex justify-between items-end">
                            <p class="text-sm">Ending Inventory (12/31/2020)</p>
                            <p class="text-sm pb-px border-b border-blackish pr-2 sm:pl-14 pl-8">
                                ${{ this.GET_FEDERAL_COST_SALES.cgs_ending_inventory }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-between flex-wrap gap-3 mt-8 px-6 py-4 bg-lighterBlue bg-opacity-60 rounded-xl">
                <h2 class="text-lg text-normalBlue font-semibold">
                    Gross Profit
                </h2>
                <p class="text-lg text-normalBlue w-max ml-auto">$ {{ this.GET_FEDERAL_COST_SALES.gross_profit }}</p>
            </div>
            <div class="mt-10">
                <h1 class="text-xl font-bold pb-0.5 w-max">Expenses</h1>
                <ValidationObserver v-slot="{ handleSubmit }" ref="addExpenseForm">
                    <form @submit.prevent="handleSubmit(onAddExpense)">
                        <div class="w-full flex items-center sm:flex-nowrap flex-wrap gap-3 my-6">
                            <ValidationProvider v-slot="{ errors }" name="Expense" rules="required" class="w-full">
                                <div :class="errors[0] && 'border-red-600'"
                                    class="w-full pr-4 border border-gray-300 rounded-lg">
                                    <select name="expense" v-model="form.name"
                                        class="w-full outline-none text-sm sm:h-11 h-10 pl-4 rounded-lg">
                                        <option disabled selected value="null">Add new expense</option>
                                        <option v-for="(expense, index) in selectExpenses" :key="index"
                                            :value="expense.title">
                                            {{ expense.title }}
                                        </option>
                                    </select>
                                </div>
                            </ValidationProvider>
                            <ValidationProvider v-slot="{ errors }" name="Amount" rules="required">
                                <div class="flex-shrink-0 w-32">
                                    <input v-model="form.amount" type="tel" name="amount" placeholder="Amount" :class="
                                        errors[0] && 'border-red-600 placeholder-red-600'
                                    "
                                        class="w-full sm:h-11 h-10 px-4 text-sm border outline-none border-gray-300 rounded-lg" />
                                </div>
                            </ValidationProvider>
                            <button type="submit"
                                class="flex-shrink-0 sm:w-32 w-24 p-3 sm:h-11 h-10 bg-normalBlue text-xs uppercase text-white rounded-full">
                                Add
                            </button>
                        </div>
                    </form>
                </ValidationObserver>
                <div class="overflow-x-scroll scrollbar-none">
                    <div class="table-width mt-2 flex flex-col gap-5 rounded-xl">
                        <div v-for="(expense, index) in GET_FEDERAL_EXPENSE" :key="index" class="flex items-center gap-3 pl-3">
                            <p class="w-full text-sm">{{ expense.name }}</p>
                            <p class="flex-shrink-0 w-32 text-sm pb-px border-b border-blackish text-center">
                                ${{ expense.amount }}
                            </p>
                            <button
                                class="flex-shrink-0 w-32 py-2 px-7 text-xs uppercase bg-lightBlue bg-opacity-40 rounded-full font-semibold">
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    class="flex justify-between flex-wrap gap-3 mt-8 px-6 py-4 bg-lightestBlue bg-opacity-60 rounded-xl">
                    <h2 class="text-xl font-semibold">Total Expenses</h2>
                    <p class="sm:w-60 w-max ml-auto text-xl pl-4">$47,000</p>
                </div>
            </div>
            <!--  -->
            <button @click="onNext"
                class="w-36 block mx-auto bg-blackish text-white p-2.5 rounded-full text-sm uppercase mt-6">
                Next
            </button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            // Expenses
            form: {
                name: '',
                amount: null
            },
            selectExpenses: [
                { id: 1, title: "Bad Debt" },
                { id: 2, title: "Bank Charges" },
                { id: 3, title: "Cell Phone" },
                { id: 4, title: "Commission" },
                { id: 5, title: "Consulting" },
                { id: 6, title: "Delivery" },
                { id: 7, title: "Dues and Subscription" },
                { id: 8, title: "Education and Training" },
            ],
        }
    },
    computed: {
        ...mapGetters({
            GET_FEDERAL_ID: "federalTaxation/GET_FEDERAL_ID",
            GET_FEDERAL_COST_SALES: "federalTaxation/GET_FEDERAL_COST_SALES",
            GET_FEDERAL_EXPENSE: "federalTaxation/GET_FEDERAL_EXPENSE",
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
        }),
    },
    methods: {
        ...mapActions({
            ADD_EXPENSE: "federalTaxation/ADD_EXPENSE",
        }),
        ...mapMutations({
            INCREMENT_FEDERAL_EXPENSE: "federalTaxation/INCREMENT_FEDERAL_EXPENSE"
        }),
        onNext() {
            this.$emit('goto')
        },
        onAddExpense() {
            this.form.amount = parseInt(this.form.amount)
            let arr = []
            arr.push(this.form)
            this.ADD_EXPENSE({ company_id: this.GET_CURRENT_COMPANY.id, federalTaxID: this.GET_FEDERAL_ID, form: arr })
                .then((response) => {
                    this.disableButton = false
                    this.INCREMENT_FEDERAL_EXPENSE(this.form)
                    this.$toast.success({
                        title: "Expense Added! ",
                        message: "Expense has been added successfully",
                    })
                    this.$emit('close')
                })
                .catch((error) => {
                    this.disableButton = false
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        },
    },
}
</script>