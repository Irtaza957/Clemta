<template>
    <div class="text-blackish">
        <ValidationObserver v-slot="{ handleSubmit }" ref="addinSharesValidator">
            <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="flex flex-col gap-3 bg-white rounded-lg p-7 my-4">
                    <div class="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        <div class="relative">
                            <ValidationProvider v-slot="{ errors }" name="Number of shares" rules="required">
                                <input v-model="shareDetails.numberOfShares" name="number-of-shares" type="number"
                                    placeholder="Example: 100" :class="
                                        errors[0]
                                            ? 'border border-red-600 placeholder-red-600'
                                            : 'placeholder-gray-400 '
                                    " class="w-full pt-7 pb-2 bg-gray-100 px-4 rounded-md outline-none"
                                    :disabled="defaultCompanySetting" />
                            </ValidationProvider>
                            <p class="text-xs absolute top-2 left-4 uppercase font-normal text-gray-400">
                                number of shares
                            </p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div
                                class="flex justify-center items-center gap-2 bg-lightestBlue py-2 px-2 rounded-xl text-xs">
                                <img src="@/assets/img/pages/create-order/info.svg" alt="" />
                                <p>
                                    Most startups choose 10.000.000 shares of common
                                    stock at a 0.00001 par value.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="grid lg:grid-cols-2 grid-cols-1 gap-3">
                        <div class="relative">
                            <ValidationProvider v-slot="{ errors }" name="Value" rules="required">
                                <input v-model="shareDetails.value" name="per-value" type="number"
                                    placeholder="Example: 0" :class="
                                        errors[0]
                                            ? 'border border-red-600 placeholder-red-600'
                                            : 'placeholder-gray-400 '
                                    " class="w-full pt-7 pb-2 px-4 bg-gray-100 rounded-md outline-none"
                                    :disabled="defaultCompanySetting" />
                            </ValidationProvider>
                            <p class="text-xs absolute top-2 left-4 uppercase font-normal text-gray-400">
                                per value
                            </p>
                        </div>
                        <div class="flex flex-col justify-center">
                            <div
                                class="flex justify-center items-center gap-2 bg-lightestBlue py-2 px-2 rounded-xl text-xs">
                                <img src="@/assets/img/pages/create-order/info.svg" alt="" />
                                <p>
                                    You should also provide us the stock information and
                                    other shareholders’ name, number of shares and their
                                    titles. (if they exist).
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="w-full flex items-center gap-7 p-4 rounded-md outline-none select-none text-sm">
                        <div>
                            <div @click="applyDefaultSettings" :class="
                                defaultCompanySetting
                                    ? 'bg-green-300'
                                    : 'bg-gray-100'
                            " class="relative h-2 w-10 rounded transition-all duration-150 ease-linear cursor-pointer">
                                <div :class="
                                    defaultCompanySetting
                                        ? 'left-full -translate-x-1/2 -ml-1.5'
                                        : 'left-0 -ml-1'
                                "
                                    class="absolute top-1/2 h-6 w-6 rounded-full bg-gray-300 transform -translate-y-1/2 transition-all duration-150 ease-linear">
                                </div>
                            </div>
                        </div>
                        Apply Default Settings for My Company
                    </div>
                    <div class="relative">
                        <div class="w-full pt-7 pb-2 px-4 bg-gray-100 rounded-md outline-none">
                            ${{ new Intl.NumberFormat().format(getresult) }}
                        </div>

                        <p class="text-xs absolute top-2 left-4 uppercase font-normal text-gray-400">
                            Total company value
                        </p>
                    </div>
                </div>

                <!-- Next & Back buttons -->
                <div class="flex items-center justify-center flex-wrap gap-5 mt-6">
                    <button type="button" class="bg-white text-blackish py-3 text-sm px-12 rounded-full uppercase"
                        @click="$emit('prevStep')">
                        Back
                    </button>
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
    data: () => ({
        shareDetails: {
            numberOfShares: null,
            value: null,
            totalValue: "",
        },
        defaultCompanySetting: false,
    }),
    computed: {
        getresult() {
            return this.shareDetails.numberOfShares * this.shareDetails.value;
        },
    },
    methods: {
        isNumber(e) {
            // var regex = /^[+-]?[0-9]+([.][0-9]+)?([eE][+-]?[0-9]+)?$/;
            if (isNaN(e.key)) {
                if (e.key !== ".") {
                    return e.preventDefault();
                }
            }
        },
        applyDefaultSettings() {
            this.shareDetails.numberOfShares = 10000000
            this.shareDetails.value = 0.00001
            this.shareDetails.totalValue = this.shareDetails.numberOfShares * this.shareDetails.value
            this.defaultCompanySetting = !this.defaultCompanySetting
        },
        onSubmit() {
            this.$emit('nextStep', this.shareDetails)
        }
    }
}
</script>
