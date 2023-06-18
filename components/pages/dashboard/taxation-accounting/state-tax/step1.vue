<template>
    <div>
        <div class="bg-white text-center rounded-xl p-8">
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
        <div class="flex justify-center flex-wrap gap-5 mt-10">
            <div class="w-56 flex flex-col items-center">
                <div class="lg:h-40 h-32 lg:w-40 w-32 rounded-full bg-white flex justify-center items-center p-2">
                    <img src="@/assets/img/pages/dashboard/taxation/company.svg" class="w-1/3" />
                </div>
                <h1 class="sm:text-xl text-lg font-bold mt-5 mb-3">
                    Corp Info
                </h1>
                <p class="sm:text-sm text-xs px-2 text-center 2xl:px-6">
                    Provide information related to the filing entity (the taxpayer)
                </p>
            </div>
            <div class="w-56 flex flex-col items-center">
                <div class="lg:h-40 h-32 lg:w-40 w-32 rounded-full bg-white flex justify-center items-center p-2">
                    <img src="@/assets/img/pages/dashboard/taxation/partner.svg" class="w-1/2" />
                </div>
                <h1 class="sm:text-xl text-lg font-bold mt-5 mb-3">
                    Partner Info
                </h1>
                <p class="sm:text-sm text-xs px-2 text-center 2xl:px-6">
                    Information about the owners partners of the business
                </p>
            </div>
        </div>
        <div class="w-max mx-auto mt-12">
            <DashboardButton title="Start" :loading="loading" class="uppercase px-8 py-2" fontSize="text-sm"
                @click="onStart" />
        </div>
        <!-- Taxation History -->
        <TaxationHistory />
    </div>
</template>
<script>
import { mapActions } from "vuex";
import TaxationHistory from "./state-taxation-history.vue";

export default {
    components: { TaxationHistory },
    props: {
        taxYear: {
            type: Number,
            default: () => new Date().getFullYear()
        }
    },
    data: () => ({
        loading: false
    }),
    methods: {
        ...mapActions({
            GET_STATE_TAX: "stateTaxation/GET_STATE_TAX"
        }),
        onStart() {
            this.loading = true
            this.GET_STATE_TAX({ fiscal_year: this.taxYear })
                .then((response) => {
                    this.loading = false
                    this.$emit('goNext', response.data['state-tax'])
                })
                .catch((error) => {
                    this.loading = false
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        }
    }
}
</script>