<template>
    <div :class="purchaseStep && 'sm:pb-12 pb-24'" class="relative">
        <div v-if="selected_package" class="grid lg:grid-cols-2 grid-cols-1 gap-12 2xl:gap-20">
            <div class="flex flex-col justify-between bg-white rounded-lg shadow-2xl overflow-hidden">
                <div class="p-4">
                    <div
                        class="relative flex justify-center items-center bg-lightestBlue bg-opacity-60 px-3 py-5 rounded-md">
                        <span class="text-xl font-semibold">{{ selected_package.title }}</span>
                    </div>
                    <div class="flex flex-col items-center text-sm gap-4 my-4 px-5">
                        <p v-for="(offer, idx) in selected_package.features" :key="idx" class="text-center">
                            {{ offer }}
                        </p>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-1 bg-lightestBlue h-24 px-3 font-semibold text-4xl">
                    <span class="text-2xl font-medium">$</span>{{ selected_package.one_time_fee }}<span
                        class="text-sm">{{ selected_package.package_type }}</span>
                </div>
            </div>
            <div>
                <div :class="!purchaseStep && 'justify-between pt-4'" class="flex flex-col h-full md:p-4 p-0 md:pt-0">
                    <div v-if="purchaseStep" class="relative flex justify-center items-center md:px-3 pb-5 rounded-md">
                        <span class="text-white text-xl font-semibold">Billing and Payment Information</span>
                    </div>
                    <div v-else
                        class="relative flex justify-center items-center bg-lightestBlue bg-opacity-20 px-3 py-5 rounded-md">
                        <span class="text-white text-xl font-semibold">Checkout</span>
                    </div>

                    <div>
                        <div v-if="purchaseStep">
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(onPayment)">
                                    <ValidationProvider v-slot="{ errors }" name="address line 1" rules="required">
                                        <input type="text" placeholder="Address Line 1" v-model="form.addr1" :class="
                                    errors[0]
                                        ? 'border border-red-600 placeholder-red-600'
                                        : 'border'"
                                            class="w-full sm:h-14 h-10 sm:px-4 px-3 text-sm bg-white rounded-md" />
                                    </ValidationProvider>
                                    <ValidationProvider v-slot="{ errors }" name="address line 2" rules="required">
                                        <input type="text" placeholder="Address Line 2" v-model="form.addr2" :class="
                                    errors[0]
                                        ? 'border border-red-600 placeholder-red-600'
                                        : 'border'"
                                            class="w-full sm:h-14 h-10 sm:px-4 px-3 text-sm bg-white rounded-md mt-2" />
                                    </ValidationProvider>
                                    <div class="grid grid-cols-2 gap-2 mt-2">
                                        <ValidationProvider v-slot="{ errors }" name="city" rules="required">
                                            <input type="text" placeholder="City" v-model="form.city" :class="
                                        errors[0]
                                            ? 'border border-red-600 placeholder-red-600'
                                            : 'border'"
                                                class="w-full sm:h-14 h-10 sm:px-4 px-3 text-sm bg-white rounded-md" />
                                        </ValidationProvider>
                                        <ValidationProvider v-slot="{ errors }" name="state" rules="required">
                                            <input type="text" placeholder="State (available)" v-model="form.state"
                                                :class="
                                            errors[0]
                                                ? 'border border-red-600 placeholder-red-600'
                                                : 'border'"
                                                class="w-full sm:h-14 h-10 sm:px-4 px-3 text-sm bg-white rounded-md" />
                                        </ValidationProvider>
                                    </div>
                                    <div class="grid grid-cols-2 gap-2 mt-2">
                                        <ValidationProvider v-slot="{ errors }" name="country" rules="required">
                                            <input type="text" placeholder="Country" v-model="form.country" :class="
                                        errors[0]
                                            ? 'border border-red-600 placeholder-red-600'
                                            : 'border'"
                                                class="w-full sm:h-14 h-10 sm:px-4 px-3 text-sm bg-white rounded-md" />
                                        </ValidationProvider>
                                        <ValidationProvider v-slot="{ errors }" name="zip" rules="required">
                                            <input type="Zip" placeholder="Zip" v-model="form.zipcode" :class="
                                        errors[0]
                                            ? 'border border-red-600 placeholder-red-600'
                                            : 'border'"
                                                class="w-full sm:h-14 h-10 sm:px-4 px-3 text-sm bg-white rounded-md" />
                                        </ValidationProvider>
                                    </div>
                                    <div
                                        class="w-full absolute left-1/2 bottom-0 transform -translate-x-1/2 sm:translate-y-3/4 translate-y-1/3 flex sm:flex-row flex-col justify-center items-center flex-wrap gap-5">
                                        <button type="button"
                                            class="bg-white text-blackish py-3 px-4 uppercase w-28 rounded-full text-sm"
                                            @click="$emit('prevStep')">
                                            Back
                                        </button>
                                        <button type="submit"
                                            class="bg-blackish text-white py-3 px-7 uppercase rounded-full text-sm">
                                            Continue to payment
                                        </button>
                                    </div>
                                </form>
                            </ValidationObserver>
                            <!-- apply referral code -->
                            <ValidationObserver v-slot="{ handleSubmit }">
                                <form @submit.prevent="handleSubmit(onDiscountCode)">
                                    <div class="flex gap-3 mt-12">
                                        <ValidationProvider v-slot="{ errors }" name="code" rules="required"
                                            class="w-full">
                                            <input v-model="referralCode" type="text" placeholder="Referral Code"
                                                :class="
                                                    errors[0]
                                                        ? 'border border-red-600 placeholder-red-600'
                                                        : 'border border-white placeholder-blackish'
                                                "
                                                class="bg-white w-full text-sm rounded-md sm:h-14 h-10 outline-none sm:px-4 px-3" />
                                        </ValidationProvider>
                                        <button
                                            class="sm:w-44 w-36 sm:h-14 h-10 text-sm flex justify-center items-center rounded-md text-white bg-normalBlue">
                                            Apply
                                        </button>
                                    </div>
                                </form>
                            </ValidationObserver>
                        </div>

                        <div v-else class="grid grid-cols-5 gap-4 text-white my-4">
                            <div class="col-span-4 text-right">
                                <p class="text-lg">{{ selected_package.title }}</p>
                                <p class="text-lg mt-3">Discount</p>
                            </div>
                            <div class="text-right">
                                <p class="text-lg ml-2">${{ selected_package.one_time_fee }}</p>
                                <p class="text-lg mt-3 ml-2">${{ Math.floor(discount) }}</p>
                            </div>
                        </div>
                        <div
                            class="w-full border-t border-white text-white mt-6 py-2 px-1 font-semibold text-xl text-right">
                            Total <span class="ml-4 text-2xl">${{ totalPrice }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Next & Back buttons -->
        <div v-if="!purchaseStep" class="flex items-center justify-center flex-wrap gap-5 mt-7">
            <button class="bg-white text-blackish py-3 text-sm px-12 rounded-full uppercase"
                @click="purchaseStep = true">
                Back
            </button>
            <button class="bg-blackish text-white py-3 text-sm sm:px-10 px-9 rounded-full uppercase"
                @click="continuePayment">
                <span v-if="!isSubmitted">Continue to Payment</span>
                <span v-if="isSubmitted" class="flex text-sm">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Processing...
                </span>
            </button>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {

    props: {
        orderID: {
            type: String,
            default: () => ''
        },
        selected_package: {
            type: Object,
            default: () => { }
        }
    },

    data: () => ({
        referralCode: '',
        purchaseStep: true,
        isSubmitted: false,
        discount: 0,
        form: {
            addr1: "",
            addr2: "",
            city: "",
            state: "",
            country: "",
            zipcode: ""
        }
    }),

    computed: {
        ...mapGetters({
            GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY",
        }),
        totalPrice() {
            return Math.floor(this.selected_package.one_time_fee - this.discount)
        }
    },

    methods: {
        ...mapActions({
            ORDER_DISCOUNT: "createOrder/ORDER_DISCOUNT",
            ORDER_CHECKOUT: "createOrder/ORDER_CHECKOUT"
        }),

        async onDiscountCode() {
            const data = {
                operation: "add",
                order_id: this.orderID,
                code: this.referralCode,
            };
            this.ORDER_DISCOUNT(data)
                .then(response => {
                    if (response.data.data.discount.discount_type === 'percent') {
                        this.discount = (response.data.data.discount.discount_ratio / 100) * this.order.one_time_fee
                    } else {
                        this.discount = response.data.data.discount.discount_ratio
                    }
                    this.$toast.success({
                        title: "Code Applied",
                        message: "Discount code applied.",
                    });
                })
                .catch((error) => {
                    this.$toast.error({
                        title: "Code Error",
                        message: "Invalid Discount code.",
                    });
                })
        },
        onPayment() {
            this.$emit('nextStep', this.form)
            this.purchaseStep = false;
        },
        async continuePayment() {
            this.isSubmitted = true
            this.ORDER_CHECKOUT(this.orderID)
                .then(response => {
                    window.location.href = response.data.data
                    this.isSubmitted = false
                    this.$toast.success({
                        title: "Payment Successfull!",
                        message: response.data.message,
                    });
                })
                .catch((error) => {
                    this.isSubmitted = false
                    this.$toast.error({
                        title: "Code Error",
                        message: error.message,
                    });
                })
        },
    }
}
</script>

<style lang="scss" scoped>
</style>