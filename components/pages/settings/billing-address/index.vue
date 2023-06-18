<template>
    <div>
        <DashboardCard>
            <div class=" flex justify-between items-start mb-7">
                <h1 class="text-xs uppercase font-extrabold">Billing Address</h1>
                <button @click="showUpdateModal = true"
                    class="text-xs py-2.5 px-6 rounded-full bg-normalBlue text-white uppercase">Edit</button>
            </div>

            <div v-if="GET_CURRENT_COMPANY" class="sm:mt-9">
                <div class=" flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
                    <p>Address Line 1</p>
                    <p class="font-semibold">{{ GET_CURRENT_COMPANY.billing_address.addr1 ?
                            GET_CURRENT_COMPANY.billing_address.addr1 : ''
                    }}</p>
                </div>
                <div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
                    <p>Address Line 2</p>
                    <p class="font-semibold">{{ GET_CURRENT_COMPANY.billing_address.addr2 ?
                            GET_CURRENT_COMPANY.billing_address.addr2 : ''
                    }}</p>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-2 mt-2">
                    <div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>City</p>
                        <p class="font-semibold">{{ GET_CURRENT_COMPANY.billing_address.city ?
                                GET_CURRENT_COMPANY.billing_address.city : ''
                        }}</p>
                    </div>
                    <div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>State</p>
                        <p class="font-semibold">{{ GET_CURRENT_COMPANY.billing_address.state ?
                                GET_CURRENT_COMPANY.billing_address.state : ''
                        }}</p>
                    </div>
                </div>
                <div class="grid sm:grid-cols-12 grid-cols-1 gap-2 mt-2">
                    <div
                        class="sm:col-span-5 col-span-1 flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>Zip code</p>
                        <p class="font-semibold">{{ GET_CURRENT_COMPANY.billing_address.zipcode ?
                                GET_CURRENT_COMPANY.billing_address.zipcode : ''
                        }}</p>
                    </div>
                    <div
                        class="sm:col-span-7 col-span-1 flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>Country</p>
                        <p class="font-semibold">{{ GET_CURRENT_COMPANY.billing_address.country ?
                                GET_CURRENT_COMPANY.billing_address.country : ''
                        }}</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <div class=" flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
                    <p>Address Line 1</p>
                </div>
                <div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3 mt-2">
                    <p>Address Line 2</p>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-2 mt-2">
                    <div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>City</p>
                    </div>
                    <div class="flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>State</p>
                    </div>
                </div>
                <div class="grid sm:grid-cols-12 grid-cols-1 gap-2 mt-2">
                    <div
                        class="sm:col-span-5 col-span-1 flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>Zip code</p>
                    </div>
                    <div
                        class="sm:col-span-7 col-span-1 flex justify-between items-center bg-lighterBlue rounded text-xs px-4 py-3">
                        <p>Country</p>
                    </div>
                </div>
            </div>

        </DashboardCard>

        <!-- UPDATE BILLING ADDRESS MODAL -->
        <template v-if="showUpdateModal">
            <update-billing-address-modal @close="() => showUpdateModal = !showUpdateModal" />
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import updateBillingAddressModal from './update-billing-address-modal.vue';

export default {
    components: { updateBillingAddressModal },

    data() {
        return {
            showUpdateModal: false,
        }
    },

    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        })
    }

}
</script>
