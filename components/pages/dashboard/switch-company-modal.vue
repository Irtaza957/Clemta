<template>
    <div class="fixed top-0 left-0 h-full w-screen flex justify-center items-center z-20">
        <div class="fixed top-0 left-0 h-full w-screen bg-darkBlue bg-opacity-60 cursor-pointer"
            @click="$emit('close')" />
        <div class="popup-animation relative max-w-2xl w-full bg-white rounded-xl px-14 pb-14 pt-20">
            <div class="absolute top-7 right-7 w-5 h-5 text-darkBlue font-semibold cursor-pointer"
                @click="$emit('close')">&#9587;</div>
            <h1 class="text-darkBlue font-semibold text-xl sm:text-3xl w-full text-center mb-10">
                Select Company
            </h1>
            <div class="flex flex-col gap-2.5 h-60 overflow-y-auto px-4">
                <div v-for="(company, index) in GET_USER_COMPANIES" :key="index"
                    :class="currentCompany.name === company.name ? 'border-black' : 'border-lighterBlue'"
                    class="flex items-center gap-3 bg-lighterBlue border-2 rounded-md py-3 px-5 cursor-pointer"
                    @click="changeCompany(company)">
                    <div :class="currentCompany.name === company.name ? 'bg-black border-black' : 'bg-transparent border-gray-400'"
                        class="flex justify-center items-center h-6 w-6 rounded-full p-1.5 border">
                        <img v-if="currentCompany.name === company.name"
                            src="@/assets/img/pages/dashboard/arrow-white.png" />
                    </div>
                    <p class="font-semibold">{{ company.name }}</p>
                </div>
            </div>
            <div class="w-full flex justify-center mx-auto mt-7">
                <button class="text-base bg-normalBlue text-white font-bold rounded-full uppercase py-2 px-12"
                    @click="setCompany">
                    Select
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {

    data() {
        return {
            currentCompany: null
        }
    },

    computed: {
        ...mapGetters({
            GET_USER_COMPANIES: "authentication/GET_USER_COMPANIES",
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
        }),
    },

    created() {
        this.currentCompany = this.GET_CURRENT_COMPANY
    },

    methods: {
        ...mapMutations({
            SET_CURRENT_COMPANY: "authentication/SET_CURRENT_COMPANY"
        }),

        changeCompany(company) {
            this.currentCompany = company
        },

        setCompany() {
            if (this.currentCompany) {
                this.SET_CURRENT_COMPANY(this.currentCompany)
                this.$router.push('/dashboard')
            }
            this.$emit('close')
            this.$toast.success({
                title: "Company switched",
                message: "Company switched successfully",
            });
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