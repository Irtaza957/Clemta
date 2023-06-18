<template>
    <div class="flex flex-col gap-4 my-4 text-blackish">
        <div v-for="(state, index) in states" :key="index" :class="selectedState === state.name && 'shadow-border'"
            class="bg-white flex gap-3 px-5 py-6 rounded-xl cursor-pointer" @click="selectedState = state.name">
            <div :class="selectedState === state.name && 'bg-blackish'"
                class="flex justify-center items-center flex-shrink-0 lg:h-7 h-5 lg:w-7 w-5 border border-blackish rounded-full lg:mt-0 mt-1 p-1">
                <img v-if="selectedState === state.name" src="@/assets/img/pages/create-order/white-check.svg" />
            </div>
            <div>
                <h1 class="text-xl font-medium">
                    {{ state.name }}
                </h1>
                <p class="text-sm mt-3">{{ state.detail }}</p>
            </div>
        </div>
        <!-- next & back buttons -->
        <div class="flex items-center justify-center flex-wrap gap-5 mt-2">
            <button class="bg-white text-blackish py-3 text-sm px-12 rounded-full uppercase" @click="$emit('prevStep')">
                Back
            </button>
            <div class="relative">
                <button class="bg-blackish text-white py-3 text-sm px-12 rounded-full uppercase"
                    @click="$emit('nextStep', selectedState)">
                    Next step
                </button>
                <div v-if="!selectedState" class="absolute top-0 left-0 h-full w-full cursor-not-allowed rounded-full">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
        states: [
            {
                id: 1,
                name: "Wyoming",
                detail:
                    "Wyoming tends to favor smaller and privately controlled companies. Low cost, manageability, flexibility, and a small business are features of Wyoming Incorporation. ",
            },
            {
                id: 2,
                name: "Delaware",
                detail:
                    "Incorporation in Delaware is the golden standad for startups looking to attract outside investment from angels and venture capitalists. A majority of Fortuna 500 companies are incorporated in Delaware.",
            },
            {
                id: 3,
                name: "Texas",
                detail:
                    "Incorporation in Delaware is the golden standad for startups looking to attract outside investment from angels and venture capitalists. A majority of Fortuna 500 companies are incorporated in Delaware.",
            },
        ],
        selectedState: '',
    })
}
</script>

<style lang="scss" scoped>
</style>