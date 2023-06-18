<template>
    <DashboardCard>
        <div class="flex justify-between items-start mb-4">
            <h1 class="text-xs uppercase font-extrabold">Subscription</h1>
            <a :href="changePlanRedirect"
                class="text-xs py-2.5 px-6 rounded-full bg-normalBlue text-white uppercase hover:underline">Change
                Plan</a>
        </div>

        <div>
            <h2 class="font-bold text-base">{{ subscriptionPackage.title }}</h2>
            <div class="h-40 overflow-y-auto mt-3 text-darkBlue flex flex-col gap-y-2">
                <p v-for="(feature, index) in subscriptionPackage.features" :key="index">
                    {{ feature }}
                </p>
            </div>
        </div>
    </DashboardCard>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
export default {
    data: () => ({
        subscriptionPackage: {},

    }),
    props: {
        changePlanRedirect: {
            type: String,
            default: () => ''
        }
    },
    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },

    mounted() {
        this.getSubscriptionPackage()
    },

    methods: {
        ...mapActions({
            GET_PACKAGE_FROM_PACKAGE_ID: "settings/GET_PACKAGE_FROM_PACKAGE_ID"
        }),
        async getSubscriptionPackage() {
            this.GET_PACKAGE_FROM_PACKAGE_ID({ package_id: this.GET_CURRENT_COMPANY.package_id })
                .then(response => {
                    this.subscriptionPackage = response.data.package
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                })
        }
    }
}
</script>
<style scoped>
/* SCROLLBAR STYLING */

/* width */
::-webkit-scrollbar {
    width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #CCCCCC;
    border-radius: 10em;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #2E465C;
    border-radius: 10em;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}
</style>