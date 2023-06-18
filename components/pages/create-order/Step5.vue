<template>
    <div>
        <div v-if="!selectPackage"
            class="relative flex flex-col xl:flex-row justify-start items-stretch text-blackish gap-5 mb-20">
            <div class="w-full bg-white rounded-lg p-7">
                <ValidationObserver ref="officerFormValidator" v-slot="{ handleSubmit }">
                    <form @submit.prevent="handleSubmit(onSubmit)">
                        <div class="flex flex-col gap-3 text-sm">
                            <div class="grid sm:grid-cols-2 grid-cols-1 gap-3">
                                <ValidationProvider v-slot="{ errors }" name="Full name" rules="required">
                                    <input v-model="officerDetails.name" type="text" name="full-name"
                                        placeholder="Name - Last Name" :class="
                                            errors[0]
                                                ? 'border-red-600 placeholder-red-600'
                                                : 'placeholder-blackish'
                                        " class="w-full p-4 rounded-md border outline-none" />
                                </ValidationProvider>
                                <div v-if="company_type === 'C-CORP'" class="flex">
                                    <ValidationProvider v-slot="{ errors }" name="Ownership" rules="required"
                                        class="w-full">
                                        <input v-model="officerDetails.ownership" type="number" name="ownership"
                                            @keyup="percentageHandler" placeholder="Number of Shares" :class="
                                                errors[0]
                                                    ? 'border-red-600 placeholder-red-600'
                                                    : 'placeholder-blackish'
                                            " class="w-full max-w-xs p-4 rounded-md border outline-none" />
                                    </ValidationProvider>
                                    <input disabled placeholder="Percentage" :value="percentage"
                                        class="w-28 p-4 rounded-md border outline-none" />
                                </div>
                                <div v-else>
                                    <ValidationProvider v-slot="{ errors }" name="Ownership" rules="required">
                                        <input v-model="officerDetails.ownership" type="number" name="ownership"
                                            placeholder="Ownership Percentage" :class="
                                                errors[0]
                                                    ? 'border-red-600 placeholder-red-600'
                                                    : 'placeholder-blackish'
                                            " class="w-full p-4 rounded-md border outline-none" />
                                    </ValidationProvider>
                                </div>
                            </div>
                            <div class="grid sm:grid-cols-2 grid-cols-1 gap-3">
                                <ValidationProvider v-slot="{ errors }" name="Title" rules="required">
                                    <input v-model="officerDetails.title" type="text" name="title" placeholder="Title"
                                        :class="
                                            errors[0]
                                                ? 'border-red-600 placeholder-red-600'
                                                : 'placeholder-blackish'
                                        " class="w-full p-4 rounded-md border outline-none" />
                                </ValidationProvider>
                                <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                                    <input v-model="officerDetails.email" type="text" name="email" placeholder="E-Mail"
                                        :class="
                                            errors[0]
                                                ? 'border-red-600 placeholder-red-600'
                                                : 'placeholder-blackish'
                                        " class="w-full p-4 rounded-md border outline-none" />
                                </ValidationProvider>
                            </div>
                            <div class="grid md:grid-cols-3 grid-cols-1 gap-3">
                                <div class="md:col-span-2 w-full">
                                    <input v-model="officerDetails.ssn" type="text" name="SSN"
                                        placeholder="SSN (Social Security Number, if available)"
                                        class="w-full p-4 rounded-md placeholder-blackish border outline-none" />
                                </div>
                                <button v-if="isEditOfficer" type="submit" :disabled="!isOfficerFormFilled"
                                    class="gap-2 w-full p-4 rounded-md bg-lightestBlue text-blackish border-none lg:text-base text-sm outline-none" :class="!isOfficerFormFilled && 'cursor-not-allowed bg-opacity-70'">
                                    Update Officer
                                </button>
                                <button v-else type="submit" :disabled="!isOfficerFormFilled"
                                    class="flex items-center justify-center gap-2 w-full p-4 rounded-md bg-blackish text-white border-none outline-none" :class="!isOfficerFormFilled && 'cursor-not-allowed bg-opacity-70'">
                                    <img src="@/assets/img/pages/create-order/add.svg" class="lg:w-auto w-4" />
                                    <span class="lg:text-base text-sm">Add New Officer</span>
                                </button>
                            </div>
                            <h3 class="font-medium mt-4">
                                Are the founders or one of the founders currently
                                residing in one of the countries below?
                            </h3>
                            <p class="font-light">
                                Venezuela, Cuba, Iran, North Korea or Syria
                            </p>
                            <div class="grid md:grid-cols-2 grid-cols-1 gap-3">
                                <div>
                                    <div class="flex items-center gap-6 h-full sm:w-10/12 w-full">
                                        <button type="button"
                                            :class="!officerDetails.is_from_blacklisted_countries && 'bg-blackish text-white'"
                                            class="w-full p-3 border rounded-md transition-all duration-150 ease-linear"
                                            @click="officerDetails.is_from_blacklisted_countries = false">
                                            No
                                        </button>
                                        <button type="button"
                                            :class="officerDetails.is_from_blacklisted_countries && 'bg-blackish text-white'"
                                            class="w-full p-3 border rounded-md transition-all duration-150 ease-linear"
                                            @click="officerDetails.is_from_blacklisted_countries = true">
                                            Yes
                                        </button>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3 bg-lightestBlue rounded-lg p-4">
                                    <img src="@/assets/img/pages/create-order/info.svg" class="filter invert" />
                                    <p class="font-light text-xs">
                                        Residents of the listed countries are
                                        <span class="font-medium">not allowed to open a bank account in the United
                                            States</span>, unless they can provide a residence address
                                        outside of these countries:
                                    </p>
                                </div>
                            </div>
                        </div>
                    </form>
                </ValidationObserver>
                <div
                    class="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full -mb-3 flex items-center justify-center flex-wrap gap-5 w-full mt-6">
                    <button type="button" class="bg-white text-blackish py-3 text-sm px-12 rounded-full uppercase"
                        @click="$emit('prevStep')">
                        Back
                    </button>
                    <button class="bg-blackish text-white py-3 text-sm px-12 rounded-full uppercase"
                        @click="nextStepWithOfficerDetails">
                        Next step
                    </button>
                </div>
            </div>
            <!-- Officers List -->
            <div class="flex flex-col justify-between bg-white w-full xl:w-80 2xl:w-96 rounded-lg py-5 px-3">
                <div>
                    <div class="flex justify-between items-center">
                        <p class="text-sm">Name</p>
                        <p class="text-sm">Ownership Percentage</p>
                    </div>
                    <div class="h-64 overflow-y-scroll scrollbar-none my-5 px-2">
                        <div v-for="(officer, index) in officers" :key="index"
                            class="flex items-center my-3 gap-3 text-sm cursor-pointer"
                            @click="selectedOfficer = officer">
                            <div class="flex-shrink-0 h-5 w-5 rounded-full border border-gray-300 p-0.5">
                                <template v-if="selectedOfficer">
                                    <div v-if="selectedOfficer.email === officer.email"
                                        class="h-full w-ful bg-lightestBlue rounded-full"></div>
                                </template>
                            </div>
                            <div class="border border-gray-300 h-12 w-full truncate flex items-center px-2 rounded-md">
                                {{ officer.name }}
                            </div>
                            <div
                                class="flex-shrink-0 bg-lightestBlue h-12 w-14 flex justify-center items-center truncate px-4 rounded-md">
                                %{{ Math.floor(officer.ownership / no_of_shares * 100) }}
                            </div>
                        </div>
                    </div>
                    <div class="text-sm text-center mb-3">Available: %{{ Math.floor(availabeShares) }}</div>
                </div>
                <div class="flex items-center gap-3 border-t border-gray-300 pt-3 text-sm">
                    <div class="relative">
                        <button class="bg-lightestBlue h-10 px-5 rounded-md" @click="editOfficer">
                            Edit
                        </button>
                        <div v-if="!selectedOfficer"
                            class="absolute top-0 left-0 h-full w-full cursor-not-allowed select-none"></div>
                    </div>
                    <div class="relative w-full">
                        <button class="bg-lightestBlue h-10 px-5 w-full rounded-md cursor-pointer"
                            @click="removeOfficer">
                            Remove
                        </button>
                        <div v-if="!selectedOfficer || isEditOfficer"
                            class="absolute top-0 left-0 h-full w-full cursor-not-allowed select-none"></div>
                    </div>
                    <button class="flex justify-center items-center bg-blackish h-10 px-3 w-32 rounded-md">
                        <img src="@/assets/img/pages/create-order/add.svg" />
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            <div v-if="allPackages.length" class="grid 2xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
                <div v-for="(packages, index) in allPackages" :key="index" :class="
                    selectedPackage.id === packages.id
                        ? 'shadow-border'
                        : 'shadow-2xl'
                " class="bg-white rounded-lg overflow-hidden flex flex-col justify-between cursor-pointer"
                    @click="selectedPackage = packages">
                    <div class="p-4">
                        <div
                            class="relative flex justify-center items-center bg-lightestBlue bg-opacity-60 px-3 py-5 rounded-md">
                            <div :class="
                                selectedPackage.id === packages.id
                                    ? 'bg-blackish border-none'
                                    : 'bg-white border border-gray-400'
                            "
                                class="flex justify-center items-center absolute top-1/2 left-4 transform -translate-y-1/2 h-6 w-6 rounded-full p-1">
                                <img v-if="selectedPackage.id === packages.id"
                                    src="@/assets/img/pages/create-order/white-check.svg" />
                            </div>
                            <span class="text-xl font-semibold">{{
                                    packages.title
                            }}</span>
                        </div>
                        <div class="flex flex-col items-center text-sm gap-4 my-4 px-5">
                            <p v-for="(offer, idx) in packages.features" :key="idx" class="text-center">
                                {{ offer }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center gap-1 bg-lightestBlue h-24 px-3 font-semibold text-4xl">
                        <span class="text-2xl font-medium">$</span>{{ packages.one_time_fee
                        }}<span class="text-sm">{{ packages.package_type }}</span>
                    </div>
                </div>
            </div>

            <!-- Next & Back buttons -->
            <div class="flex items-center justify-center flex-wrap gap-5 mt-7">
                <!-- Back button -->
                <button class="bg-white text-blackish py-3 text-sm px-12 rounded-full uppercase"
                    @click="goBackToOfficer">
                    Back
                </button>
                <!-- Next button -->
                <div class="relative">
                    <button :disabled="!selectedPackage.id" :class="!selectedPackage.id ? 'cursor-not-allowed' : ''"
                        class="bg-blackish text-white py-3 text-sm px-8 rounded-full uppercase"
                        @click="showPurchaseSummary">
                        Next step
                    </button>
                    <div v-if="!selectedPackage"
                        class="absolute top-0 left-0 h-full w-full cursor-not-allowed rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        company_type: {
            type: String,
            default: () => ''
        },
        no_of_shares: {
            type: Number,
            default: () => null
        },
    },
    data: () => ({
        // Officers
        officerDetails: {
            name: "",
            ownership: null,
            title: "",
            email: "",
            ssn: "",
            is_from_blacklisted_countries: false,
        },
        isEditOfficer: false,
        selectedOfficer: null,
        officers: [],
        // Package
        selectPackage: false,
        selectedPackage: {
            id: null
        },
        isLoading: false,
        allPackages: [],
        percentage: null,
        noOfShares: null,
    }),
    computed: {
        isOfficerFormFilled() {
            if(this.officerDetails.name && this.officerDetails.title && this.officerDetails.email && this.officerDetails.ssn && this.officerDetails.ownership){
                return true
            }
            return false
        },  
        availabeShares() {
            let shares = 100
            this.noOfShares = this.no_of_shares
            if (this.company_type === 'C-CORP') {
                for (let i = 0; i < this.officers.length; i++) {
                    if (this.officers[i].ownership <= this.noOfShares) {
                        shares -= Math.floor(this.officers[i].ownership / this.no_of_shares * 100)
                        this.noOfShares = this.noOfShares - this.officers[i].ownership
                    }
                }
            }
            else {
                for (let i = 0; i < this.officers.length; i++) {
                    if (this.officers[i].ownership <= this.noOfShares) {
                        shares -= this.officers[i].ownership
                        this.noOfShares = this.noOfShares - this.officers[i].ownership
                    }
                }
            }
            return shares
        },
    },
    mounted() {
        this.getPackages()
    },
    methods: {
        ...mapActions({
            GET_PACKAGES: "createOrder/GET_PACKAGES",
        }),
        onSubmit() {
            const data = {
                name: this.officerDetails.name,
                ownership: parseInt(this.officerDetails.ownership),
                title: this.officerDetails.title,
                email: this.officerDetails.email,
                ssn: this.officerDetails.ssn,
                is_from_blacklisted_countries: this.officerDetails.is_from_blacklisted_countries,
            };
            // Updating Officer
            if (this.isEditOfficer) {
                this.officers = this.officers.map((arr) => {
                    return arr.email === data.email
                        ? {
                            ...arr,
                            name: data.name,
                            ownership: data.ownership,
                            title: data.title,
                            email: data.email,
                            ssn: data.ssn,
                            is_from_blacklisted_countries:
                                data.is_from_blacklisted_countries,
                        }
                        : arr;
                });
                this.isEditOfficer = false;
                this.selectedOfficer = null;
                this.resetForm()
            } else {
                if (data.ownership <= this.noOfShares) {
                    this.officers.push(data);
                    this.resetForm()
                }
                else {
                    this.$toast.error({
                        title: "Shares",
                        message: "You don't have enough shares"
                    });
                }
            }
        },
        percentageHandler() {
            this.percentage = `%${Math.floor(this.officerDetails.ownership / this.no_of_shares * 100)}`
        },
        resetForm() {
            this.officerDetails.name = "";
            this.officerDetails.ownership = null;
            this.officerDetails.title = "";
            this.officerDetails.email = "";
            this.officerDetails.ssn = "";
            this.percentage = null
            this.officerDetails.is_from_blacklisted_countries = true;
            this.$refs.officerFormValidator.reset();
        },
        editOfficer() {
            this.isEditOfficer = true;
            this.officerDetails.name = this.selectedOfficer.name;
            this.officerDetails.ownership = this.selectedOfficer.ownership;
            this.officerDetails.title = this.selectedOfficer.title;
            this.officerDetails.email = this.selectedOfficer.email;
            this.officerDetails.ssn = this.selectedOfficer.ssn;
            this.officerDetails.is_from_blacklisted_countries = this.selectedOfficer.is_from_blacklisted_countries;
        },
        removeOfficer() {
            this.officers = this.officers.filter(
                (officer) => officer.email !== this.selectedOfficer.email
            );
            this.selectedOfficer = null;
        },
        nextStepWithOfficerDetails() {
            if (!this.officers.length) {
                this.$toast.error({
                    title: "Validation Error",
                    message: "Please add at least one shareholder"
                });
            }
            else {
                this.selectPackage = true
                this.$emit('nextStep', this.officers)
            }
        },
        async getPackages() {
            this.isLoading = true;
            this.GET_PACKAGES('/' + this.company_type)
                .then(response => {
                    if (response.data.data) {
                        this.allPackages = response.data.data;
                    }
                    this.isLoading = false;
                })
                .catch((error) => {
                    this.isLoading = false;
                    this.$toast.error({
                        title: "Company Type",
                        message: "Invalid company type.",
                    });
                })
        },
        goBackToOfficer() {
            this.selectPackage = false
            this.$emit('goBackToOfficer')
        },
        showPurchaseSummary() {
            this.$emit('nextStepFromPackageSelected', this.selectedPackage)
        },
    }
}
</script>
