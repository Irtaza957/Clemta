<template>
    <DashboardModal :maxWidth="'max-w-4xl'" @close="$emit('close')">
        <h1 class="text-xl text-center mb-6 mt-44 sm:mt-auto">Add Director</h1>
        <ValidationObserver v-slot="{ handleSubmit }" ref="addDirectorForm">
            <form class="flex flex-col gap-4" @submit.prevent="handleSubmit(addDirector)">
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
                    <ValidationProvider v-slot="{ errors }" name="First name" rules="required">
                        <input v-model="directorForm.first_name" type="text" placeholder="First Name" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Middle name" rules="required">
                        <input v-model="directorForm.middle_name" type="text" placeholder="Middle Name" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
                    <ValidationProvider v-slot="{ errors }" name="Last name" rules="required">
                        <input v-model="directorForm.last_name" type="text" placeholder="Last Name" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Title" rules="required">
                        <input v-model="directorForm.title" type="text" placeholder="Title" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                </div>
                <div class="flex items-center gap-2 my-2.5">
                    <input v-model="directorForm.non_us_address" type="checkbox" id="non-us" class="cursor-pointer"/>
                    <label for="non-us" class="text-sm cursor-pointer">Non-us address</label>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
                    <ValidationProvider v-slot="{ errors }" name="Address" rules="required">
                        <input v-model="directorForm.address" type="text" placeholder="Street Address" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="City" rules="required">
                        <input v-model="directorForm.city" type="text" placeholder="City" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                </div>
                <div class="grid sm:grid-cols-2 grid-cols-1 gap-x-7 gap-y-4">
                    <ValidationProvider v-slot="{ errors }" name="State" rules="required">
                        <input v-model="directorForm.state" type="text" placeholder="State" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="Zipcode" rules="">
                        <input v-model="directorForm.zip_code" disabled type="text" placeholder="Zipcode" :class="
                            errors[0]
                                ? 'border-red-600 placeholder-red-600'
                                : 'border-gray-300'
                        " class="w-full py-3 px-4 text-sm outline-none border rounded-lg" />
                    </ValidationProvider>
                </div>
                <div class="w-full mt-3.5 relative">
                <ValidationProvider v-slot="{ errors }" name="Country" rules="required">
                	<div :class="
						errors[0] ? 'border border-red-600 ' : 'border'"
					    class="px-3 py-2.5 rounded-lg flex justify-between items-center"
						@click="showCountryList = !showCountryList">
						<span v-if="directorForm.country">
							{{ directorForm.country }}
						</span>
						<span v-else> Choose a Country </span>
						<img src="@/assets/img/pages/dashboard/invoice/create-invoice/arrow-head.png" alt="down-arrow"
							class="w-2" />
						<input type="hidden" v-model="directorForm.country" />
					</div>
                </ValidationProvider>
                <div v-if="showCountryList"
					class="absolute top-full left-0 w-full transform translate-y-2 bg-white rounded-md border border-blackish py-1 pr-1 z-10">
					<div class="country-list max-h-52 overflow-y-scroll">
						<div v-for="(country, index) in countries" :key="index"
							class="flex items-center gap-3 cursor-pointer hover:bg-lightestGray transition-all duration-200 ease-linear px-3 p-2.5"
							@click="selectCountry(country)">
							<img :src="country.flag" alt="country" class="w-6" />
							{{ country.name }}
						</div>
					</div>
				</div>
                </div>
                <div class="sm:flex justify-end items-center grid grid-cols-2 flex-wrap gap-3 mt-3">
                    <button class="text-xs uppercase bg-normalBlue text-white p-3 w-32 rounded-full" type="button"
                        @click="$emit('close')">
                        Cancel
                    </button>
                    <button type="submit" class="text-xs uppercase bg-blackish text-white p-3 w-32 rounded-full"
                        :disabled="disableButton">
                        Add
                    </button>
                </div>
            </form>
        </ValidationObserver>
    </DashboardModal>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import { countries } from '../../../../../plugins/vue_country_list';
export default {
    data() {
        return {
            countries: countries,
            disableButton: false,
            showCountryList: false,
            directorForm: {
                role: 'director',
                first_name: "",
                middle_name: "",
                last_name: "",
                title: "",
                // non_us_address: false,
                address: "",
                city: "",
                state: "",
                // zip_code: "",
                country: null,
            },
        }
    },
    methods: {
        ...mapActions({
            ADD_PARTNER_DIRECTOR: "stateTaxation/ADD_PARTNER_DIRECTOR"
        }),
        ...mapMutations({
            SET_STATE_PARTNERS: "stateTaxation/SET_STATE_PARTNERS"
        }),
        addDirector() {
            this.disableButton = true
            this.ADD_PARTNER_DIRECTOR({ form: this.directorForm })
                .then((response) => {
                    this.disableButton = false
                    this.SET_STATE_PARTNERS(response.data[`state-tax`].partners)
                    this.$toast.success({
                        title: "Director Added! ",
                        message: "Director has been added successfully",
                    })
                    this.$emit('close')
                })
                .catch((error) => {
                    this.disableButton = false
                    this.$toast.error({
                        title: "Error",
                        message: error.message,
                    });
                });
        },

        selectCountry(country) {
		this.directorForm.country = country.name
		this.showCountryList = false				
		},
    },
};
</script>
<style scoped>
.selectCountry {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>