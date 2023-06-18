<template>
    <div class="flex text-blackish">
        <!-- Left Section -->
        <DashboardSidebar :open-sidebar="openSidebar" @hideSidebar="openSidebar = false" />

        <!-- Right Section -->
        <div
            class="bg-gradient-to-br from-lighterBlue to-lightestBlue h-screen w-full overflow-auto lg:p-8 md:p-5 px-0">
            <!-- Dark background on open sidebar ( Mobile view ) -->
            <div v-if="openSidebar" class="fixed top-0 left-0 h-full w-full bg-blackish bg-opacity-40 z-10"
                @click="openSidebar = false"></div>

            <!-- Heading -->
            <DashboardHeading :heading="DASHBOARD_TITLE" @showSidebar="openSidebar = true" />

            <!-- Main Content -->
            <div>
                <Nuxt />
            </div>
        </div>
    </div>
</template>

<script>
import DashboardHeading from "../components/shared/dashboard/dashboard-heading.vue"
import DashboardSidebar from "../components/shared/dashboard/dashboard-sidebar.vue"

import { mapGetters } from "vuex"
export default {
    components: {
        DashboardSidebar,
        DashboardHeading
    },
    middleware: ['authenticated', 'set_dashboard_title'],
    data: () => ({
        openSidebar: false,
    }),
    computed: {
        ...mapGetters({
            DASHBOARD_TITLE: "GET_DASHBOARD_TITLE",
        }),
    },
}
</script>
