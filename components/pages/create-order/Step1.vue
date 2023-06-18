<template>
    <div class="flex flex-col gap-4 my-4 text-blackish">
        <div v-for="(company, index) in companyTypes" :key="index" :class="[
            selectedCompanyType === company.name && 'shadow-border',
            index > 0 && 'border-2 border-lightBrown',
        ]" class="relative bg-white flex gap-3 px-5 py-8 rounded-xl overflow-hidden cursor-pointer"
            @click="selectedCompanyType = company.name">
            <div v-if="index > 0"
                class="absolute top-0 right-0 flex items-center gap-2 rounded-bl-xl py-1.5 px-4 bg-lightBrown">
                <img src="@/assets/img/pages/create-order/info.svg" class="filter invert lg:w-auto w-3" />
                <span class="lg:text-sm text-xs">This is one is suitable for your needs</span>
            </div>
            <div :class="selectedCompanyType === company.name && 'bg-blackish'"
                class="flex justify-center items-center flex-shrink-0 lg:h-7 h-5 lg:w-7 w-5 border border-blackish rounded-full lg:mt-0 mt-1 p-1">
                <img v-if="selectedCompanyType === company.name"
                    src="@/assets/img/pages/create-order/white-check.svg" />
            </div>
            <div>
                <h1 class="text-xl font-medium">
                    {{ company.name }}
                    <span class="font-light ml-1"> {{ company.text }}</span>
                </h1>
                <p class="text-sm mt-3">{{ company.detail }}</p>
            </div>
        </div>

        <!-- Move to next & back steps -->
        <div class="relative w-max mx-auto block gap-5 mt-2">
            <button class="bg-blackish text-white py-3 text-sm px-12 rounded-full uppercase"
                @click="$emit('nextStep', selectedCompanyType)">
                Start
            </button>
            <div v-if="!selectedCompanyType"
                class="absolute top-0 left-0 h-full w-full cursor-not-allowed rounded-full"></div>
        </div>
        <p @click="isChooseTypeModal=true" class="text-center mt-6 underline w-full cursor-pointer">
            Help me choose a company type
        </p>
        <div v-if="isChooseTypeModal">
			<ChooseCompanyTypeModal @close="isChooseTypeModal=false"/>
		</div>
    </div>
</template>

<script>
import ChooseCompanyTypeModal from '../../../components/pages/create-order/choose-company-type-modal.vue';
export default {
    components: {	
		ChooseCompanyTypeModal
	},
    data: () => ({
        isChooseTypeModal: false,
        companyTypes: [
            {
                id: 1,
                name: "LLC",
                text: "(Limited Liability Company)",
                detail:
                    "A Limited Liability Company (LLC) has the freedom to distribute its ownership stake to its members without regard to a member's financial contribution to the LLC. Profits and losses are reported on the individual tax returns for the owners, and not at the business level.",
            },
            {
                id: 2,
                name: "C-CORP",
                text: "(General Corporation)",
                detail:
                    "A Limited Liability Company (LLC) has the freedom to distribute its ownership stake to its members without regard to a member's financial contribution to the LLC. Profits and losses are reported on the individual tax returns for the owners, and not at the business level.",
            },
        ],
        selectedCompanyType: ''
    })
}
</script>

<style lang="scss" scoped>
</style>