<template>
    <DashboardCard>
        <!-- TAX YEAR -->
        <div class="flex justify-end">
            <FiscalYear :taxYear="year" @changeTaxYear="changeTaxYear" />
        </div>
        <!-- FORM -->
        <div v-if="formLoader">
        <ValidationObserver v-slot="{ handleSubmit }" ref="stateTaxValidationObserver">
            <form class="flex flex-col sm:gap-y-4 gap-y-3" @submit.prevent="handleSubmit(onSubmit)">
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3 w-full">
                    <ValidationProvider v-slot="{ errors }" name="Employee ID" rules="">
                        <input type="text" disabled placeholder="Employee ID"
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
                    <ValidationProvider v-slot="{ errors }" name="Initial Return" rules="required">
                        <input type="number" placeholder="Initial Return" v-model="form.company_initial_return"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <ValidationProvider v-slot="{ errors }" name="Issued Shares" rules="required">
                        <input type="number" placeholder="Issued Shares" v-model="form.company_issued_shared"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Gross Assets" rules="required">
                        <input type="number" placeholder="Gross Assets" v-model="form.company_gross_assets"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <p>Principal Place of Buisiness</p>
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
                <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-5 gap-3">
                    <ValidationProvider v-slot="{ errors }" name="Phone" rules="required">
                        <input type="text" placeholder="Phone" v-model="form.company_ppb_phone"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required">
                        <input type="email" placeholder="Email" v-model="form.company_ppb_email"
                            :class="errors[0] ? 'border-red-600 placeholder-red-600' : 'border-gray-400 placeholder-blackish'"
                            class="py-3 px-4 border text-sm border-gray-300 rounded-md focus:bg-lighterBlue outline-none w-full" />
                    </ValidationProvider>
                </div>
                <div class="flex justify-end">
                    <DashboardButton title="Next" type="submit" :loading="loading" class="uppercase px-8 py-2"
                        fontSize="text-sm" />
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
import FiscalYear from './fiscal-year.vue'
export default {
    components: {
        FiscalYear,
    },
    props: {
        taxInfo: {
            type: Object,
            default: () => { }
        },
        taxYear: {
            type: Number
        }
    },
    data() {
        return {
            // TAX YEAR
            year: null,
            // FORM
            form: {
                fiscal_year: '',
                company_legalname: '',
                company_dba: '',
                company_business_start_date: null,
                company_principal_business_activity: '',
                company_initial_return: null,
                company_issued_shared: null,
                company_gross_assets: null,
                company_ppb_addr: '',
                company_ppb_city: '',
                company_ppb_state: '',
                company_ppb_zipcode: '',
                company_ppb_country: '',
                company_ppb_phone: '',
                company_ppb_email: ''
            },
            loading: false,
            formLoader: true
        }
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },
    created() {
        if (this.taxInfo) {
            this.form = this.taxInfo
            this.form.company_business_start_date = this.$moment((new Date(this.taxInfo.company_business_start_date * 1000))).format("YYYY-MM-DD")
        }
        this.year = this.taxYear
    },
    methods: {
        ...mapActions({
            GET_STATE_TAX: "stateTaxation/GET_STATE_TAX",
            CREATE_STATE_TAX: "stateTaxation/CREATE_STATE_TAX",
            UPDATE_STATE_TAX: "stateTaxation/UPDATE_STATE_TAX"
        }),
        changeTaxYear(changedYear) {
            this.formLoader=false
            this.year = changedYear
            this.GET_STATE_TAX({ company_id: this.GET_CURRENT_COMPANY.id, fiscal_year: this.year })
                .then((response) => {
                    this.formLoader=true
                    if (response.data['state-tax']) {
                        this.form = response.data['state-tax']
                        if (this.form.company_business_start_date) {
                            this.form.company_business_start_date = this.$moment((new Date(this.form.company_business_start_date * 1000))).format("YYYY-MM-DD")
                        }
                    } else {
                        this.resetForm()
                    }
                })
                .catch((error) => {
                    this.loading=true
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        },
        resetForm() {
            this.form = {
                fiscal_year: '',
                company_legalname: '',
                company_dba: '',
                company_business_start_date: null,
                company_principal_business_activity: '',
                company_initial_return: null,
                company_issued_shared: null,
                company_gross_assets: null,
                company_ppb_addr: '',
                company_ppb_city: '',
                company_ppb_state: '',
                company_ppb_zipcode: '',
                company_ppb_country: '',
                company_ppb_phone: '',
                company_ppb_email: ''
            }
            this.$nextTick(() => {
                this.$refs.stateTaxValidationObserver.reset()
            })
        },
        onSubmit() {
            let dt = Date.parse(this.form.company_business_start_date)
            this.form.company_business_start_date = dt / 1000;
            this.form.fiscal_year = this.year
            this.form.fiscal_year = parseInt(this.form.fiscal_year)
            this.form.company_initial_return = parseInt(this.form.company_initial_return)
            this.form.company_issued_shared = parseInt(this.form.company_issued_shared)
            this.form.company_gross_assets = parseInt(this.form.company_gross_assets)
            if (this.form.id) {
                this.loading = true
                this.UPDATE_STATE_TAX({ company_id: this.GET_CURRENT_COMPANY.id, stateTaxID: this.form.id, form: this.form })
                    .then((response) => {
                        this.loading = false
                        this.$emit('goNext', this.form)
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
                this.loading = true
                this.CREATE_STATE_TAX({ company_id: this.GET_CURRENT_COMPANY.id, form: this.form })
                    .then((response) => {
                        this.loading = false
                        this.$emit('goNext', this.form)
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

}
</script>
<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>