<template>
    <div>
        <DashboardCard>
            <div class="relative py-2 mt-5 px-3 rounded-full bg-normalBlue text-white text-sm block sm:w-36 w-32 ml-auto cursor-pointer text-center z-10"
                @click="isPartnerModal = true">
                Add Partner
            </div>
            <!-- Table -->
            <div class="w-full rounded-xl bg-white bg-opacity-60 pb-20">
                <div v-if="GET_FEDERAL_PARTNER.length" class="overflow-x-auto overflow-y-clip">
                    <table class="w-max 2xl:w-full mb-16">
                        <!-- Headings -->
                        <tr>
                            <th v-for="(heading) in partnerTableHeadings" :key="heading.name">
                            <td class="pl-4 py-3 text-sm text-left uppercase w-40">
                                {{ heading.name }}
                            </td>
                            </th>
                        </tr>
                        <tr v-for="(data, index) in GET_FEDERAL_PARTNER" :key="index"
                            class="w-full py-3.5 bg-lighterBlue border-b-[10px] border-white rounded">
                            <td class="px-4 pl-5 text-sm">
                                {{ data.owned }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ data.capital_contribution }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ data.ssn }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ data.first_name }} {{ data.last_name }}
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
                                {{ data.zipcode }}
                            </td>
                            <td class="px-4 py-3 text-sm">
                                {{ data.phone }}
                            </td>
                            <td class="px-4 py-3">
                                <div class="relative">
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
                <button
                    class="w-36 absolute right-10 ml-auto bg-blackish text-white p-2.5 rounded-full text-sm uppercase mt-6"
                    @click="onNext">
                    Next
                </button>
            </div>
        </DashboardCard>
        <!--  -->
        <div v-if="isPartnerModal">
            <AddPartnerModal @close="isPartnerModal = false" />
        </div>
        <div v-if="showEditPartnerModel">
            <EditPartnerModel :selectedPartner="selectedPartner" @close="showEditPartnerModel = false, isPartnerOptions = false" />
        </div>
        <div v-if="showDeletePartnerModel">
            <DeletePartnerModel :selectedPartner="selectedPartner" @close="showDeletePartnerModel = false, isPartnerOptions = false" />
        </div>
        <!-- to close folder or files options -->
        <div v-if="isPartnerOptions" class="absolute top-0 left-0 h-full w-full" @click="isPartnerOptions = false">
        </div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AddPartnerModal from "./add-partner-modal.vue";
import EditPartnerModel from "./edit-partner-modal.vue";
import DeletePartnerModel from "./delete-partner-modal.vue";
export default {
    props: {
        taxYear: {
            type: Number,
            default: () => 2022
        }
    },
    components: {
        AddPartnerModal,
        EditPartnerModel,
        DeletePartnerModel,
    },
    data() {
        return {
            // Partner Info
            isPartnerOptions: "",
            isPartnerModal: false,
            showEditPartnerModel: false,
            showDeletePartnerModel: false,
            selectedPartner: '',
            partnerTableHeadings: [
                {
                    id: 1,
                    name: "%Owned",
                },
                {
                    id: 2,
                    name: "Capital Contribution During the Year",
                },
                {
                    id: 3,
                    name: "Partner SSN",
                },
                {
                    id: 4,
                    name: "First & Last Name",
                },
                {
                    id: 5,
                    name: "Street Address",
                },
                {
                    id: 6,
                    name: "City",
                },
                {
                    id: 7,
                    name: "State",
                },
                {
                    id: 8,
                    name: "Zip Code",
                },
                {
                    id: 9,
                    name: "Phone",
                },
            ],
            partnerTableRecords: [],
        }
    },
    mounted() {        
        this.getPartners()
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
            GET_FEDERAL_PARTNER: "federalTaxation/GET_FEDERAL_PARTNER",
            GET_FEDERAL_ID: "federalTaxation/GET_STATE_ID",
        }),
    },
    methods: {
        ...mapActions({
            GET_FEDERAL_TAX: "federalTaxation/GET_FEDERAL_TAX",
        }),
        getPartners() {
            this.GET_FEDERAL_TAX({ company_id: this.GET_CURRENT_COMPANY.id, fiscal_year: this.taxYear })
                .then((response) => {
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        },
        onNext() {
            this.$emit('goto')
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
    }
}
</script>