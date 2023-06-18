<template>
    <div>
        <div class="bg-white text-center rounded-xl sm:p-8 p-5">
            <h1 class="sm:text-3xl text-2xl font-bold mb-4">Instruction</h1>
            <h3 class="sm:text-base text-sm font-semibold">
                For each tab please provide information to the best of your
                knowledge.
            </h3>
            <p class="sm:text-base text-sm">
                For questions, please reach out to Tan Haque @
                <span class="text-normalBlue text-opacity-70">tanbirulh@gmail.com</span>
            </p>
        </div>
        <div class="flex justify-center flex-wrap gap-5 mt-16">
            <div v-for="(tax, index) in federalTaxInfo" :key="index" class="w-56 flex flex-col items-center">
                <div class="lg:h-40 h-32 lg:w-40 w-32 rounded-full bg-white flex justify-center items-center p-2">
                    <img :src="getIcon(tax.icon)" :class="tax.id === 1 || tax.id === 3 ? 'w-1/3' : 'w-1/2'" />
                </div>
                <h1 class="lg:text-xl text-lg text-center font-semibold mt-5 mb-3">
                    {{ tax.name }}
                </h1>
                <p class="text-xs px-2 text-center 2xl:px-6">
                    {{ tax.detail }}
                </p>
            </div>
        </div>
         <div class="w-max mx-auto mt-12">
            <DashboardButton title="Start" :loading="loading" class="uppercase px-8 py-2" fontSize="text-sm"
                @click="onStart" />
        </div>       
        <TaxationHistory />

    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TaxationHistory from "./federal-taxation-history.vue";
import companyIcon from "@/assets/img/pages/dashboard/taxation/company.svg"
import partnerIcon from "@/assets/img/pages/dashboard/taxation/partner.svg";
import expensesIcon from "@/assets/img/pages/dashboard/taxation/expenses.svg"
import assetIcon from "@/assets/img/pages/dashboard/taxation/asset.svg";

export default {
    props: {
        taxYear: {
            type: Number,
            default: () => 2022
        }
    },
    components: {
        TaxationHistory,
    },
    data() {
        return {
            form: {},
            loading: false,
            federalTaxInfo: [
                {
                    id: 1,
                    name: "Corp Info",
                    detail:
                        "Provide information related to the filing entity (the taxpayer)",
                    icon: "company.svg",
                },
                {
                    id: 2,
                    name: "Partner Info",
                    detail: "Information about the owners partners of the business",
                    icon: "partner.svg",
                },
                {
                    id: 3,
                    name: "Revenue and Expenses",
                    detail:
                        "Information related to business acitvity during the year ended December 31, 2020",
                    icon: "expenses.svg",
                },
                {
                    id: 4,
                    name: "Fixed Asset Listing",
                    detail:
                        "List fixed assets purchased during the year to calculate depreciation expense ",
                    icon: "asset.svg",
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },
    methods: {
        ...mapActions({
            GET_FEDERAL_TAX: "federalTaxation/GET_FEDERAL_TAX"
        }),
        getIcon(name) {
            switch (name) {
                case 'company.svg':
                    return companyIcon
                case 'partner.svg':
                    return partnerIcon
                case 'expenses.svg':
                    return expensesIcon
                case 'asset.svg':
                    return assetIcon
            }
        },
        onStart() {
            this.loading = true
            this.GET_FEDERAL_TAX({ company_id: this.GET_CURRENT_COMPANY.id, fiscal_year: this.taxYear })
                .then((response) => {
                    this.form = response.data['federal-tax']
                    this.loading = false
                    this.$emit('goto', this.form)
                })
                .catch((error) => {
                    this.loading = false
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        }
    },
}
</script>