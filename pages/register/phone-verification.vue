<template>
	<div class="w-full flex flex-col items-center">
		<div class="w-full flex flex-col items-center">
			<p class="mt-16 text-sm">Phone verification</p>
			<p class="mt-6 text-sm text-gray-500 font-light">
				Get a verification number sent to your phone
			</p>
			<ValidationObserver v-slot="{ handleSubmit }" class="w-full">
				<form class="flex flex-col items-center w-full" @submit.prevent="handleSubmit(sendVerificationCode)">
					<div class="w-full relative mt-2">
						<ValidationProvider v-slot="{ errors }" name="country" rules="required">
							<input v-model="search" type="text" @keyup="debounce" placeholder="Select a country" :class="errors[0]
							? 'border border-red-600 placeholder-red-600'
							: 'border'" class="w-full py-2 px-4 rounded border focus:outline-none"
								@click="(isCountryList = !isCountryList), (searchCountries = allCountries)" />
						</ValidationProvider>
						<div v-show="isCountryList"
							class="country-list rounded-md border scrollbar-none max-h-72 overflow-y-auto h-48 bg-white absolute top-full left-0 w-full z-10">
							<div class="py-3 px-2">
								<div>
									<div v-for="(country, index) in searchCountries" :key="index"
										class="flex justify-between items-center cursor-pointer"
										@click="selectCountry(country)">
										<div class="flex items-center gap-3 py-2">
											<!-- <img :src="country.flag" class="w-5" /> -->
											<p class="text-sm text-blackish">{{ country.name }}</p>
										</div>
										<div v-if="country.name === selectedCountry.name"
											class="h-2 w-2 rounded-full bg-blackish bg-opacity-50"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="w-full flex items-center gap-2 mt-3">
						<button type="button" class="w-1/2 py-3 px-4 bg-lighterBlue rounded outline-none">
							{{ selectedCountry.dialCode }}
						</button>
						<ValidationProvider v-slot="{ errors }" name="phone" rules="required">
							<input type="tel" name="phone" v-model="contactForm.phone" placeholder="Phone" :class="
								errors[0]
									? 'text-red-600 border-red-600 placeholder-red-600'
									: 'text-blackish border-gray-300 focus:border-blue-600'
							" class="w-full py-2.5 px-4 border rounded outline-none" />
						</ValidationProvider>
					</div>
					<button type="submit" v-bind:disabled="isSubmitted"
						class="w-32 p-2 bg-blackish text-white rounded-full mt-9">
						<span v-if="!isSubmitted">Send code</span>
						<span v-if="isSubmitted" class="flex text-sm">
							<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
								fill="none" viewBox="0 0 24 24">
								<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
									stroke-width="4"></circle>
								<path class="opacity-75" fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
								</path>
							</svg>
							Processing...
						</span>
					</button>
				</form>
			</ValidationObserver>

			<button class="w-32 p-1.5 text-blackish border border-blackish rounded-full mt-2"
				@click="onClickBackButton()">
				Back
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import { countries } from "../../plugins/vue_country_list";

export default {

	layout: "auth-layout",

	data: () => ({
		contactForm: {
			phone: "",
			phone_code: null
		},
		selectedCountry: {
			name: '',
			dialCode: '',
			image: '',
		},
		allCountries: countries,
		searchCountries: countries,
		isSubmitted: false,
		isCountryList: false,
		search: '',
	}),
	created() {
		fetch('https://api.ipregistry.co/?key=tryout').then((response) => {
			return response.json();
		}).then((payload) => {
			this.selectCountry.name = payload.location.country.name
			this.selectCountry.dialCode = payload.location.country.code
			// this.selectCountry.image = payload.location.country.flag.emojitwo
    	}).catch((error) => {
			this.search = this.allCountries[0].name
			this.selectedCountry.name = this.allCountries[0].name
			this.selectedCountry.dialCode = this.allCountries[0].dialCode
			this.selectedCountry.image = this.allCountries[0].flag
		});
	},
	methods: {
		...mapActions({
			SEND_PHONE_VERIFICATION_CODE: "authentication/SEND_PHONE_VERIFICATION_CODE"
		}),
		selectCountry(country) {
			this.selectedCountry = { ...country }
			this.search = this.selectedCountry.name
			this.contactForm.phone_code = this.selectedCountry.dialCode
			this.isCountryList = false
		},
		async sendVerificationCode() {
			this.isSubmitted = true;
			this.SEND_PHONE_VERIFICATION_CODE(this.contactForm)
				.then(response => {
					this.isSubmitted = false;
					this.$router.push("/register/verify")
				})
				.catch((error) => {
					this.isSubmitted = false;
					this.$toast.error({
						title: 'Something went wrong!',
						message: error.message,
					});
				})
		},
		onClickBackButton() {
			this.$router.push("/" + "register");
		},
		debounce() {
			this.isCountryList = true
			setTimeout(() => {
				this.searchCountries = countries
				if(this.search){
					this.searchCountries = this.allCountries.filter((country) => country.name.toLowerCase().includes(this.search.toLowerCase()))
				}
			}, 300)
		},
	},
};
</script>

<style scoped>
.country-list {
	animation: dropDown 0.3s linear forwards;
}
@keyframes dropDown {
	0% {
		opacity: 0;
		transform: translateY(-10px) scale(0.9);
	}

	100% {
		opacity: 1;
		transform: translateY(0px) scale(1);
	}
}
</style>
