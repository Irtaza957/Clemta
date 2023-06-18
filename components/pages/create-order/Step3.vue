<template>
    <div class="text-blackish">
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="flex flex-col gap-5 bg-white rounded-lg p-7 my-4">
                    <div class="grid sm:grid-cols-2 grid-cols-1 gap-5">
                        <div class="relative">
                            <ValidationProvider v-slot="{ errors }" name="Company name" rules="required">
                                <input v-model="businessDetails.name" type="text" name="compnay-name"
                                    placeholder="Enter name" :class="
                                        errors[0]
                                            ? 'border-red-600 placeholder-red-600'
                                            : 'border-gray-100 placeholder-blackish'
                                    " class="w-full pt-7 pb-2 px-4 rounded-md border bg-gray-100 outline-none" />
                            </ValidationProvider>
                            <p class="absolute top-2 left-4 uppercase text-gray-400 text-xs">
                                Company name
                            </p>
                        </div>
                        <ValidationProvider v-slot="{ errors }" name="industry" rules="required">
                            <div class="font-light pr-4 rounded-md border overflow-hidden" :class="
                        errors[0]
                            ? 'border-red-600 placeholder-red-600'
                            : 'placeholder-gray-400'">
                                <select v-model="businessDetails.entity" class="w-full p-4 outline-none">
                                    <option :value="null" selected disabled>
                                        Choose an entity
                                    </option>
                                    <option v-for="(item, index) in entityOptions" :key="index" :value="item">{{ item }}
                                    </option>
                                </select>
                            </div>
                        </ValidationProvider>
                    </div>
                    <ValidationProvider v-slot="{ errors }" name="industry" rules="required">
                        <div class="relative font-light pr-4 bg-gray-100 rounded-md border overflow-hidden" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'placeholder-gray-400'
                        ">
                            <select v-model="businessDetails.industry" name="industry"
                                class="w-full pt-7 pb-2 pl-3 bg-gray-100 outline-none">
                                <option :value="null" selected disabled>
                                    Choose industry
                                </option>
                                <option :value="item" v-for="(item, index) in industryOptions" :key="index">{{ item }}
                                </option>
                            </select>
                            <p class="text-xs absolute top-2 left-4 uppercase font-normal text-gray-400">
                                Industry
                            </p>
                        </div>
                    </ValidationProvider>
                    <div v-if="businessDetails.industry === 'other'">
                        <ValidationProvider v-slot="{ errors }" name="Other" rules="required">
                            <input v-model="businessDetails.other" type="text" name="other" :class="
                                errors[0]
                                    ? 'border-red-600 placeholder-red-600'
                                    : 'placeholder-blackish'
                            " placeholder="If you selected Other, please specify"
                                class="w-full p-4 rounded-md border outline-none text-sm" />
                        </ValidationProvider>
                    </div>
                    <div class="relative">
                        <ValidationProvider v-slot="{ errors }" name="Project" rules="required">
                            <input v-model="businessDetails.project" type="text" name="project" :class="
                                errors[0]
                                    ? 'border-red-600 placeholder-red-600'
                                    : 'placeholder-gray-400'
                            " placeholder="Software Company, Restaurant, Online Store etc."
                                class="w-full pt-7 pb-2 px-4 bg-gray-100 rounded-md border outline-none text-sm" />
                        </ValidationProvider>
                        <p class="text-xs absolute top-2 left-4 uppercase font-normal text-gray-400">
                            Describe Your Project
                        </p>
                    </div>
                    <ValidationProvider v-slot="{ errors }" name="Products" rules="required">
                        <input v-model="businessDetails.products" type="text" name="products" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'placeholder-blackish'
                        " placeholder="Items or products you sell"
                            class="w-full p-4 rounded-md border outline-none text-sm" />
                    </ValidationProvider>
                </div>

                <!-- Next & Back buttons -->
                <div class="flex items-center justify-center flex-wrap gap-5 mt-6">
                    <!-- Back button -->
                    <button type="button" class="bg-white text-blackish py-3 text-sm px-12 rounded-full uppercase"
                        @click="$emit('prevStep')">
                        Back
                    </button>
                    <!-- Next button -->
                    <button class="bg-blackish text-white py-3 text-sm px-12 rounded-full uppercase">
                        Next step
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </div>
</template>

<script>
export default {
    props: {
        companyType: {
            type: String,
            default: () => ''
        }
    },
    data: () => ({
        businessDetails: {
            name: "",
            entity: null,
            industry: null,
            other: "",
            project: "",
            products: "",
        },
        entityOptions: [],
        industryOptions: [
            'Accounting / Tax Preparation',
            'Advertising / PR',
            'Agriculture',
            'Art / Photography',
            'Artifical Intelligence',
            'Augmented Reality',
            'B2B',
            'Biotech',
            'Community',
            'Constraction / Renovation',
            'Consulting',
            'Customer Service',
            'Crypto',
            'Developer Tools',
            'Drones',
            'Online Retailer',
            'Education',
            'Energy',
            'Enterprise',
            'Entertainment / Media',
            'Financial Services',
            'Other Heatlh / Fitness Services',
            'Food / Beverage',
            'Government',
            'Hardware',
            'Healthcare',
            'Insurance',
            'Private Investment Companies',
            'Legal Services Including Law',
            'Sales / Marketing',
            'Marketplace',
            'Manufacturing',
            'Nonprofit',
            'Desing / Creative',
            'Real Estate',
            'Employment Services',
            'Research',
            'Robotics',
            'Security',
            'Sports Teams / Clubs',
            'Transportation',
            'Other Travel Services',
            'Virtual Reality',
            'IT / Tech Services',
            'B2C',
            'E-commerce',
            'Hospitality',
            'Data Science Analytics',
            'Licensed Trades',
            'other'
        ]
    }),
    mounted() {
        if (this.companyType === 'LLC') {
            this.entityOptions = ['L.L.C.', 'LLC']
        } else if (this.companyType === 'C-CORP') {
            this.entityOptions = ['Co.', 'Corp.', 'Inc']
        }
    },
    methods: {
        onSubmit() {
            this.$emit('nextStep', this.businessDetails)
        }
    }
}
</script>
