<template>
    <DashboardModal :maxWidth="'max-w-lg'" @close="$emit('close')">
        <ValidationObserver v-slot="{ handleSubmit }" ref="addTransactionForm">
            <form class="max-w-xs w-full flex flex-col gap-3 mx-auto" @submit.prevent="handleSubmit(onAddTransaction)">
                <h1 class="text-xl text-center mb-6">Add Transaction</h1>
                <ValidationProvider v-slot="{ errors }" name="Transaction type" rules="required">
                    <div :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'border-gray-300'
                    " class="icon relative w-full border rounded-lg pr-4">
                        <select v-model="transactionForm.type"
                            class="py-3.5 px-3 rounded-lg text-sm w-full outline-none">
                            <option disabled selected :value=null>Select transaction type</option>
                            <option value="spent">Spent</option>
                            <option value="received">Received</option>
                        </select>
                        <svg class="-mr-1 ml-2 h-5 w-5 absolute right-3 top-3" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Date" rules="required">
                    <input v-model="transactionForm.date" type="date" placeholder="Date" :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'border-gray-300'
                    " class="w-full py-3 px-4 text-sm bg-white placeholder-blackish rounded-lg outline-none border" />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Description" rules="required">
                    <input v-model="transactionForm.description" type="text" placeholder="Description" :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'border-gray-300'
                    " class="w-full py-3 px-4 text-sm bg-white placeholder-blackish rounded-lg outline-none border" />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Payee" rules="required">
                    <input v-model="transactionForm.payee" type="text" placeholder="Payee" :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'border-gray-300'
                    " class="w-full py-3 px-4 text-sm bg-white placeholder-blackish rounded-lg outline-none border" />
                </ValidationProvider>

                <ValidationProvider v-slot="{ errors }" name="Category" rules="">
                    <div :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'border-gray-300'
                    " class="icon relative w-full border rounded-lg pr-4">
                        <select v-model="transactionForm.category_id"
                            class="py-3.5 px-3 rounded-lg text-sm w-full outline-none">
                            <option disabled selected :value=null>Category</option>
                            <option v-for="(category, idx) in categories" :key="idx" :value="category.id">
                                {{ category.name }}
                            </option>
                        </select>
                        <svg class="-mr-1 ml-2 h-5 w-5 absolute right-3 top-3" xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Amount" rules="required" class="num-nav">
                    <input v-model="transactionForm.amount" type="number" placeholder="Amount" :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'border-gray-300'
                    " class="w-full py-3 px-4 text-sm bg-white placeholder-blackish rounded-lg outline-none border" />
                </ValidationProvider>
                <div class="grid grid-rows-1 sm:grid-cols-2 gap-4 mt-4">
                    <button class="text-xs p-3 w-full rounded-full bg-normalBlue text-white uppercase"
                        @click="$emit('close')">
                        Cancel
                    </button>
                    <button class="text-xs p-3 w-full rounded-full bg-blackish text-white uppercase"
                        :disabled="disableButton">
                        Create
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </DashboardModal>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            disableButton: false,
            transactionForm: {
                type: null,
                date: "",
                description: "",
                payee: "",
                category_id: null,
                amount: "",
            },
            categories: []
        }
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },
    mounted() {
        this.getCategories()
    },
    methods: {
        ...mapActions({
            CREATE_TRANSACTION: "bookKeeping/CREATE_TRANSACTION",
            GET_CATEGORIES: "bookKeeping/GET_CATEGORIES"
        }),
        onAddTransaction() {
            let dt = Date.parse(this.transactionForm.date)
            this.transactionForm.date = dt / 1000;
            this.transactionForm.amount = parseInt(this.transactionForm.amount)
            this.CREATE_TRANSACTION({ company_id: this.GET_CURRENT_COMPANY.id, form: this.transactionForm })
                .then((response) => {
                    this.disableButton = false
                    this.$emit('transactions')
                    this.$emit('close')
                    this.$toast.success({
                        title: "Transaction Created",
                        message: 'Transaction has been successfully created',
                    });
                })
                .catch((error) => {
                    this.disableButton = false
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        },
        getCategories() {
            this.GET_CATEGORIES()
                .then((response) => {
                    this.categories = response.data.category
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        }
    },
}
</script>
<style scoped>
.icon select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.num-nav input::-webkit-outer-spin-button,
.num-nav input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>