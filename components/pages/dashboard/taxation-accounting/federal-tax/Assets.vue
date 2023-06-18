<template>
    <div>
        <ValidationObserver v-slot="{ handleSubmit }" ref="assetsForm">
            <form @submit.prevent="handleSubmit(onAssestDetails)">
                <div class="sm:p-12 sm:pb-8 p-5 flex flex-col gap-4 bg-white rounded-xl">
                    <ValidationProvider v-slot="{ errors }" name="Description" rules="required">
                        <input v-model="assetDetails.description" name="description" type="text"
                            placeholder="Description" :class="
                                errors[0]
                                    ? 'border border-red-600 placeholder-red-600'
                                    : 'border border-gray-300'
                            " class="w-full text-sm py-3.5 px-4 rounded-lg outline-none" />
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="Date" rules="required">
                        <input v-model="assetDetails.date_placed_in_service" name="date" type="date"
                            placeholder="Date Placed in Service" :class="
                                errors[0]
                                    ? 'border border-red-600 placeholder-red-600'
                                    : 'border border-gray-300'
                            " class="w-full text-sm py-3.5 px-4 rounded-lg outline-none" />
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="Cost" rules="required">
                        <input v-model="assetDetails.cost" name="cost" type="number" placeholder="Cost" :class="
                            errors[0]
                                ? 'border border-red-600 placeholder-red-600'
                                : 'border border-gray-300'
                        " class="w-full text-sm py-3.5 px-4 rounded-lg outline-none" />
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="Salvage value" rules="required">
                        <input v-model="assetDetails.salvage_value" name="salvage-value" type="number"
                            placeholder="Salvage Value" :class="
                                errors[0]
                                    ? 'border border-red-600 placeholder-red-600'
                                    : 'border border-gray-300'
                            " class="w-full text-sm py-3.5 px-4 rounded-lg outline-none" />
                    </ValidationProvider>

                    <ValidationProvider v-slot="{ errors }" name="Business" rules="required">
                        <input v-model="assetDetails.business_use" name="business" type="number"
                            placeholder="Business Use(%)" :class="
                                errors[0]
                                    ? 'border border-red-600 placeholder-red-600'
                                    : 'border border-gray-300'
                            " class="w-full text-sm py-3.5 px-4 rounded-lg outline-none" />
                    </ValidationProvider>
                    <button type="submit"
                        class="w-36 block mx-auto bg-blackish text-white p-2.5 rounded-full text-sm uppercase mt-5"
                        :disabled="disableButton">
                        Finish
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            // Assets
            disableButton: false,
            assetDetails: {
                description: "",
                date_placed_in_service: null,
                cost: null,
                salvage_value: null,
                business_use: null
            },
        }
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
            GET_FEDERAL_ID: "federalTaxation/GET_FEDERAL_ID",

        }),
    },
    methods: {
        ...mapActions({
            FINISH_FEDERAL_TAX: "federalTaxation/FINISH_FEDERAL_TAX",
        }),
        onAssestDetails() {
            let dt = Date.parse(this.assetDetails.date_placed_in_service)
            this.assetDetails.date_placed_in_service = dt / 1000;
            this.assetDetails.cost = parseInt(this.assetDetails.cost)
            this.assetDetails.salvage_value = parseInt(this.assetDetails.salvage_value)
            this.assetDetails.business_use = parseInt(this.assetDetails.business_use)
            this.disableButton = true
            this.FINISH_FEDERAL_TAX({ company_id: this.GET_CURRENT_COMPANY.id, federalTaxID: this.GET_FEDERAL_ID, form: this.assetDetails })
                .then((response) => {
                    this.$emit('goto')
                    this.disableButton = false
                })
                .catch((error) => {
                    this.disableButton = false
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
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>