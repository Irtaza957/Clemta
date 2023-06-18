<template>
    <div>
        <DashboardCard>
            <div class="flex justify-between items-center flex-wrap-reverse gap-4 border-b border-gray-300 mb-5">
                <div class="flex items-center">
                    <h1 :class="isPartnerTable && 'border-b border-gray-500'"
                        class="font-semibold p-4 -mb-px border-b border-gray-300 cursor-pointer" @click="onPartner">
                        Partners
                    </h1>
                    <h1 :class="!isPartnerTable && 'border-b border-gray-500'"
                        class="font-semibold p-4 -mb-px border-b border-gray-300 cursor-pointer" @click="onNext">
                        Directors
                    </h1>
                </div>
                <div class="flex items-center flex-wrap gap-4">
                    <div v-if="isPartnerTable"
                        class="p-2 rounded-full bg-normalBlue text-white text-sm sm:w-36 w-28 cursor-pointer text-center"
                        @click="isPartnerModal = true">
                        Add Partner
                    </div>
                    <div v-else-if="isDirectorTable"
                        class="p-2 rounded-full bg-normalBlue text-white text-sm sm:w-36 w-28 cursor-pointer text-center"
                        @click="isDirectorModal = true">
                        Add Director
                    </div>
                </div>
            </div>
            <!-- Table -->
            <div class="w-full rounded-xl bg-white">
                <div v-if="isPartnerTable">
                    <div v-if="GET_STATE_PARTNER.length" class="overflow-x-scroll overflow-y-clip">
                        <table class="w-max 2xl:w-full mb-16">
                            <!-- Headings -->
                            <tr>
                                <th v-for="(heading) in partnerTableHeadings" :key="heading.name">
                                <td class="px-4 py-3 text-xs font-extrabold text-left uppercase ">
                                    {{ heading.name }}
                                </td>
                                </th>
                            </tr>
                            <!-- Data rows -->
                            <tr v-for="(data, index) in GET_STATE_PARTNER" :key="index"
                                class="w-full py-3.5 bg-lighterBlue border-b-[10px] border-white rounded">
                                <td class="px-4 py-3 text-sm">
                                    {{ data.first_name }} {{ data.middle_name }} {{ data.last_name }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.title }}
                                </td>
                                 <td class="px-4 py-3">
                                    <div class="flex-shrink-0 h-5 w-5 pt-1 pl-0.5 border border-gray-400 bg-white">
                                        <img v-if="data.non_us_address"
									    src="@/assets/img/pages/dashboard/taxation/Vector.svg" />
							        </div>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.address }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.city }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.state }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.zip_code }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.country }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <div class="relative mr-3">
                                        <div class="w-5">
                                            <img src="@/assets/img/pages/dashboard/documents/vertical-dots.svg"
                                                class="w-full cursor-pointer" @click="isPartnerOptions = data" />
                                        </div>
                                        <div v-if="isPartnerOptions === data"
                                            class="flex-shrink-0 w-28 absolute top-full right-0 flex flex-col transform translate-y-2 bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg py-3 z-20">
                                            <p class="text-sm cursor-pointer py-1 pl-2 hover:bg-gray-200"
                                                @click="modifyPartner(data, 'edit')">Edit</p>
                                            <p class="text-sm cursor-pointer py-1 pl-2 hover:bg-gray-200"
                                                @click="modifyPartner(data, 'delete')">Delete</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div v-else class="border border-solid rounded-xl mt-6">
                        <NotFound heading="No Partner Found"
                        description="Unfortunatly You Haven't Created Any Partner Yet." />                
                    </div>                                  
                    <div class="text-right">
                        <button class="w-36  ml-auto bg-blackish text-white p-2.5 rounded-full text-sm uppercase mt-6"
                            @click="onNext">
                            Next
                        </button>
                    </div>
                </div>
                <div v-else-if="isDirectorTable">
                    <div v-if="GET_STATE_DIRECTOR.length" class="overflow-x-scroll overflow-y-clip">
                        <table class="w-max 2xl:w-full mb-16">
                            <!-- Headings -->
                            <tr>
                                <th v-for="(heading) in directorTableHeadings" :key="heading.name">
                                <td class="px-4 py-3 text-xs font-extrabold uppercase">
                                    {{ heading.name }}
                                </td>
                                </th>
                            </tr>
                            <!-- Data rows -->
                            <tr v-for="(data, index) in GET_STATE_DIRECTOR" :key="index"
                                class="w-full py-3.5 bg-lighterBlue border-b-[10px] border-white rounded">
                                <!-- <td class="px-4 py-3 text-sm">
                                    <div :class="data.remove_line && 'bg-lightBlue'"
                                        class="h-4 w-4 border border-gray-400 bg-white"
                                        @click="data.remove_line = !data.remove_line"></div>
                                </td> -->
                                <td class="px-4 py-3 text-sm">
                                    {{ data.first_name }} {{ data.middle_name }} {{ data.last_name }}
                                </td>
                                <!-- <td class="px-4 py-3 text-sm">
                                    <div :class="data.copy_address && 'bg-lightBlue'"
                                        class="h-4 w-4 border border-gray-400 bg-white"
                                        @click="data.copy_address = !data.copy_address"></div>
                                </td> -->                              
                                <td class="px-4 py-3">
                                    <div class="flex-shrink-0 h-5 w-5 pt-1 pl-0.5 border border-gray-400 bg-white">
                                        <img v-if="data.non_us_address"
									    src="@/assets/img/pages/dashboard/taxation/Vector.svg" />
							        </div>
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.address }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.city }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.state }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.zip_code }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    {{ data.country }}
                                </td>
                                <td class="px-4 py-3 text-sm">
                                    <div class="relative">
                                        <div class="w-5">
                                            <img src="@/assets/img/pages/dashboard/documents/vertical-dots.svg"
                                                class="w-full cursor-pointer" @click="isPartnerOptions = data" />
                                        </div>
                                        <div v-if="isPartnerOptions === data"
                                            class="flex-shrink-0 w-28 absolute top-full right-0 flex flex-col transform translate-y-2 bg-lighterBlue border border-darkBlue border-opacity-75 rounded-lg py-3 z-20">
                                            <p class="text-sm cursor-pointer py-1 pl-2 hover:bg-gray-200"
                                                @click="modifyDirector(data, 'edit')">Edit</p>
                                            <p class="text-sm cursor-pointer py-1 pl-2 hover:bg-gray-200"
                                                @click="modifyDirector(data, 'delete')">Delete</p>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                            </tr>
                        </table>
                    </div>
                    <div v-else class="border border-solid rounded-xl mt-6">
                        <NotFound heading="No Director Found"
                        description="Unfortunatly You Haven't Created Any Director Yet." />                
                    </div> 
                    <div class="text-right mt-6">
                        <!-- <button :disabled="disableButton"
                            class="w-36 ml-auto bg-blackish text-white p-2.5 rounded-full text-sm uppercase mt-6"
                            @click="onFinish">
                            Finish
                        </button> -->
                        <DashboardButton @click="onFinish" title="Finish" :loading="loading" class="uppercase px-8 py-2"
                        fontSize="text-sm" />
                    </div>
                </div>
            </div>
        </DashboardCard>
        <!-- ADD PARTNER MODAL -->
        <div v-if="isPartnerModal">
            <AddPartnerModal @close="isPartnerModal = false" />
        </div>
        <!-- ADD DIRECTOR MODAL -->
        <div v-if="isDirectorModal">
            <AddDirectorModel @close="isDirectorModal = false" />
        </div>
        <div v-if="showEditPartnerModel">
            <EditPartnerModel :selectedPartner="selectedPartner" @close="showEditPartnerModel = false, isPartnerOptions = false" />
        </div>
        <div v-if="showDeletePartnerModel">
            <DeletePartnerModel :selectedPartner="selectedPartner" @close="showDeletePartnerModel = false, isPartnerOptions = false" />
        </div>
        <div v-if="showEditDirectorModel">
            <EditDirectorModel :selectedDirector="selectedDirector" @close="showEditDirectorModel = false, isPartnerOptions = false" />
        </div>
        <div v-if="showDeleteDirectorModel">
            <DeleteDirectorModel :selectedDirector="selectedDirector" @close="showDeleteDirectorModel = false, isPartnerOptions = false" />
        </div>
        <!-- to close folder or files options -->
        <div v-if="isPartnerOptions" class="absolute top-0 left-0 h-full w-full" @click="isPartnerOptions = false">
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddPartnerModal from "./add-partner-modal.vue";
import AddDirectorModel from "./add-director-modal.vue";
import EditPartnerModel from "./edit-partner-modal.vue";
import DeletePartnerModel from "./delete-partner-modal.vue";
import EditDirectorModel from "./edit-director-modal.vue";
import DeleteDirectorModel from "./delete-director-modal.vue";

export default {
    props: {
        taxInfo: {
            type: Object,
            default: () => { }
        },
        taxYear: {
            type: Number
        }
    },
    components: {
        AddPartnerModal,
        AddDirectorModel,
        EditPartnerModel,
        DeletePartnerModel,
        EditDirectorModel,
        DeleteDirectorModel,
    },
    data() {
        return {
            form: {},
            loading: false,            
            showEditPartnerModel: false,
            showDeletePartnerModel: false,
            selectedPartner: '',
            // Partner Info
            isPartnerModal: false,
            isPartnerTable: true,
            isPartnerOptions: null,
            partnerTableHeadings: [
                {
                    id: 0,
                    name: "First Middle Last Name",
                },
                {
                    id: 1,
                    name: "Title",
                },
                {
                    id: 2,
                    name: "Non-us address",
                },
                {
                    id: 3,
                    name: "Street Address",
                },
                {
                    id: 4,
                    name: "City",
                },
                {
                    id: 5,
                    name: "State",
                },
                {
                    id: 6,
                    name: "Zip Code",
                },
                {
                    id: 7,
                    name: "Country",
                },
            ],
            // Directors info
            showEditDirectorModel: false,
            showDeleteDirectorModel: false,
            selectedDirector: '',
            isDirectorTable: false,
            isDirectorModal: false,
            directorTableHeadings: [
                // {
                //     id: 1,
                //     name: "Remove Line",
                // },
                {
                    id: 1,
                    name: "First Middle Last Name",
                },
                // {
                //     id: 3,
                //     name: "copy address",
                // },
                {
                    id: 2,
                    name: "Non-us address",
                },
                {
                    id: 3,
                    name: "Street Address",
                },
                {
                    id: 4,
                    name: "City",
                },
                {
                    id: 5,
                    name: "State",
                },
                {
                    id: 6,
                    name: "Zip Code",
                },
                {
                    id: 7,
                    name: "Country",
                },
            ],
        }
    },
    mounted() {
        this.getPartnersDirectors()
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
            GET_STATE_PARTNER: "stateTaxation/GET_STATE_PARTNER",
            GET_STATE_DIRECTOR: "stateTaxation/GET_STATE_DIRECTOR",
            GET_STATE_ID: "stateTaxation/GET_STATE_ID"
        })
    },
    methods: {
        ...mapActions({
            GET_STATE_TAX: "stateTaxation/GET_STATE_TAX",
            FINISH_STATE_TAX: "stateTaxation/FINISH_STATE_TAX",
        }),
        getPartnersDirectors() {
            this.GET_STATE_TAX({ company_id: this.GET_CURRENT_COMPANY.id, fiscal_year: this.taxYear })
        },
        onNext() {
            this.isPartnerTable = false
            this.isDirectorTable = true;
        },
        onFinish() {
                this.loading = true
                this.form.fiscal_year = this.taxYear,
                this.form.company_legalname = this.taxInfo.company_legalname,
                this.form.company_dba = this.taxInfo.company_dba,
                this.form.company_business_start_date = this.taxInfo.company_business_start_date,
                this.form.company_principal_business_activity = this.taxInfo.company_principal_business_activity,
                this.form.company_initial_return = this.taxInfo.company_initial_return,
                this.form.company_issued_shared = this.taxInfo.company_issued_shared,
                this.form.company_gross_assets = this.taxInfo.company_gross_assets,
                this.form.company_ppb_addr = this.taxInfo.company_ppb_addr,
                this.form.company_ppb_city = this.taxInfo.company_ppb_city,
                this.form.company_ppb_state = this.taxInfo.company_ppb_state,
                this.form.company_ppb_zipcode = this.taxInfo.company_ppb_zipcode,
                this.form.company_ppb_country = this.taxInfo.company_ppb_country,
                this.form.company_ppb_phone = this.taxInfo.company_ppb_phone,
                this.form.company_ppb_email = this.taxInfo.company_ppb_email,
                this.FINISH_STATE_TAX({ company_id: this.GET_CURRENT_COMPANY.id, statetaxID: this.GET_STATE_ID, form: this.form })
                    .then((response) => {
                        this.$emit('goto')
                        this.loading = false
                    })
                    .catch((error) => {
                        this.loading = false
                        this.$toast.error({
                            title: "Error",
                            message: error.message,
                        });
                    });
        },
        onPartner() {
            this.isPartnerTable = true
            this.isDirectorTable = false
        },
        modifyPartner(partner, operation) {
            this.selectedPartner = { ...partner }
            switch (operation) {
                case 'edit':
                    this.showEditPartnerModel = true
                    break;
                case 'delete':
                    this.showDeletePartnerModel = true
                    break;
                default:
                    break;
            }
        },
        modifyDirector(director, operation) {
            this.selectedDirector = { ...director }
            switch (operation) {
                case 'edit':
                    this.showEditDirectorModel = true
                    break;
                case 'delete':
                    this.showDeleteDirectorModel = true
                    break;
                default:
                    break;
            }
        }
    }
}
</script>