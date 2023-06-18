<template>
    <DashboardCard>
        <div class="relative text-right">
            <select v-model="year" class="py-2 pr-8 pl-4 outline-none my-3 border rounded-full text-base"
                @change="yearChanged">
                <option value="2022" selected>Tax Year 2022</option>
                <option v-for="(year, idx) in years" :key="idx" :value="year.title">
                    Tax Year {{ year.title }}
                </option>
            </select>
            <svg class="-mr-1 ml-2 h-5 w-5 absolute top-6 right-3" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
            </svg>
        </div>
        <div v-if="formLoader">
        <ValidationObserver v-slot="{ handleSubmit }">
            <form class="flex flex-col sm:gap-y-4 gap-y-3" @submit.prevent="handleSubmit(onSubmit)">
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3 w-full">
                    <ValidationProvider v-slot="{ errors }" name="Employee ID" rules="">
                        <input type="text" disabled placeholder="Employee ID" v-model="form.employeeId"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Legal Name" rules="required">
                        <input type="text" placeholder="Legal Name" v-model="form.company_legalname"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <ValidationProvider v-slot="{ errors }" name="DBA (doing business as)" rules="required">
                        <input type="text" placeholder="DBA (doing business as)" v-model="form.company_dba"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Business Start Date" rules="required">
                        <input type="date" placeholder="Business Start Date" v-model="form.company_business_start_date"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <ValidationProvider v-slot="{ errors }" name="Principal Business Activity" rules="required">
                        <input type="text" placeholder="Principal Business Activity"
                            v-model="form.company_principal_business_activity"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Initial Return" rules="">
                        <input type="number" disabled placeholder="Initial Return" v-model="form.company_initial_return"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div>
                    <ValidationProvider v-slot="{ errors }" name="Address" rules="required">
                        <input type="text" placeholder="Address" v-model="form.company_ppb_addr"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <ValidationProvider v-slot="{ errors }" name="City" rules="required">
                        <input type="text" placeholder="City" v-model="form.company_ppb_city"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="State" rules="required">
                        <input type="text" placeholder="State/Province" v-model="form.company_ppb_state"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <ValidationProvider v-slot="{ errors }" name="Zip Code" rules="required">
                        <input type="text" placeholder="Zip Code" v-model="form.company_ppb_zipcode"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Country" rules="required">
                        <input type="text" placeholder="Country" v-model="form.company_ppb_country"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="relative grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <p>Did the business have employees during the year?</p>
                    <ValidationProvider v-slot="{ errors }" name="Business Employees" rules="required">
                        <div class="flex justify-center items-center pr-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'">
                            <select v-model="form.did_business_have_employees"
                                class=" relative w-full py-3 pl-4 rounded-md outline-none"
                                :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'">
                                <option disabled selected value="">Please Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <svg class="-mr-1 ml-2 h-5 w-5 absolute right-3" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="relative grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <p>
                        Were payments made during 2020 that would require the Corp to
                        file Forms 1099?
                    </p>
                    <ValidationProvider v-slot="{ errors }" name="Form Fill" rules="required">
                        <div class="flex justify-center items-center pr-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'">
                            <select v-model="form.require_forms_1099"
                                class="relative w-full py-3 pl-4 rounded-md outline-none"
                                :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'">
                                <option disabled selected value="">Please Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <svg class="-mr-1 ml-2 h-5 w-5 absolute right-3" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </ValidationProvider>
                </div>
                <div class="relative grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <p>Did the Corp purchase real property during the year?</p>
                    <ValidationProvider v-slot="{ errors }" name="Real Property Purchase" rules="required">
                        <div class="flex justify-center items-center pr-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'">
                            <select v-model="form.did_business_have_employees"
                                class="relative w-full py-3 pl-4 rounded-md outline-none">
                                <option disabled selected value="">Please Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                            <svg class="-mr-1 ml-2 h-5 w-5 absolute right-3" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clip-rule="evenodd" />
                            </svg>
                        </div>
                    </ValidationProvider>
                </div>
                <div>
                    <div class="flex justify-end">
                        <DashboardButton title="Next" type="submit" :loading="loading" class="uppercase px-8 py-2"
                        fontSize="text-sm" />
                    </div>                 
                </div>
            </form>
        </ValidationObserver>
        </div>
        <div v-else class="-mt-12">
            <loader/>
        </div>
    </DashboardCard>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props: {
        taxInfo: {
            type: Object,
            default: () => { }
        },
        taxYear: {
            type: Number,
            default: () => 2022
        }
    },
    data() {
        return {
            form: {
                fiscal_year: "",
                company_legalname: "",
                company_dba: "",
                company_business_start_date: "",
                company_principal_business_activity: "",
                company_ppb_addr: "",
                company_ppb_city: "",
                company_ppb_state: "",
                company_ppb_zipcode: "",
                company_ppb_country: "",
                company_ppb_phone: "",
                did_business_have_employees: "",
                require_forms_1099: "",
                purchased_real_property_during_the_year: ""
            },
            year: 2022,
            loading: false,
            formLoader: true,
            years: [
                {
                    id: 1,
                    title: 2021
                },
                {
                    id: 2,
                    title: 2020,
                },
                {
                    id: 3,
                    title: 2019
                },
                {
                    id: 4,
                    title: 2018,
                },
            ],
        }
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },
    mounted() {
        if (this.taxInfo) {
            this.form = this.taxInfo
            this.form.company_business_start_date = this.$moment((new Date(this.taxInfo.company_business_start_date * 1000))).format("YYYY-MM-DD")
        }
        this.year = this.taxYear
    },
    methods: {
        ...mapActions({
            GET_FEDERAL_TAX: "federalTaxation/GET_FEDERAL_TAX",
            CREATE_FEDERAL_TAX: "federalTaxation/CREATE_FEDERAL_TAX",
            UPDATE_FEDERAL_TAX: "federalTaxation/UPDATE_FEDERAL_TAX"
        }),
        yearChanged() {
            this.formLoader=false
            this.GET_FEDERAL_TAX({ company_id: this.GET_CURRENT_COMPANY.id, fiscal_year: this.year })
                .then((response) => {
                    this.formLoader=true
                    if (response.data['federal-tax']) {
                        this.form = response.data['federal-tax']
                        if (this.form.company_business_start_date) {
                            this.form.company_business_start_date = this.$moment((new Date(this.form.company_business_start_date * 1000))).format("YYYY-MM-DD")
                        }
                    } else {
                        this.form = {
                            fiscal_year: "",
                            company_legalname: "",
                            company_dba: "",
                            company_business_start_date: "",
                            company_principal_business_activity: "",
                            company_ppb_addr: "",
                            company_ppb_city: "",
                            company_ppb_state: "",
                            company_ppb_zipcode: "",
                            company_ppb_country: "",
                            company_ppb_phone: "",
                            did_business_have_employees: "",
                            require_forms_1099: "",
                            purchased_real_property_during_the_year: ""
                        }
                    }
                })
                .catch((error) => {
                    this.formLoader=true
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        },
        onSubmit() {
            this.loading = true
            let dt = Date.parse(this.form.company_business_start_date)
            this.form.company_business_start_date = dt / 1000;
            this.form.fiscal_year = this.year
            this.form.fiscal_year = parseInt(this.form.fiscal_year)
            if (this.form.id) {
                this.$emit('gotoWithYear', this.year)
                this.UPDATE_FEDERAL_TAX({ company_id: this.GET_CURRENT_COMPANY.id, federalTaxID: this.form.id, form: this.form })
                    .then((response) => {
                        this.loading = false
                        this.$emit('gotoWithData', this.form)
                    })
                    .catch((error) => {
                        this.loading = false
                        this.$toast.error({
                            title: "Error",
                            message: error.message,
                        });
                    });
            }
            else {
                this.disableButton = true
                this.CREATE_FEDERAL_TAX({ company_id: this.GET_CURRENT_COMPANY.id, form: this.form })
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
    },

}
</script>
<style scoped>
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>