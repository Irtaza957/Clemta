<template>
	<div class="fixed top-0 left-0 h-full w-full flex justify-center items-center z-20">

		<div class="fixed top-0 left-0 h-full w-full bg-darkBlue bg-opacity-60 cursor-pointer"
			@click="$emit('toggle')" />

		<div
			class="popup-animation relative flex flex-col justify-center items-center gap-6 bg-white rounded-xl px-9 py-12 z-30 scrollbar-none">
			<div class="absolute top-4 right-6 text-sm font-semibold cursor-pointer" @click="$emit('toggle')">
				&#9587;
			</div>
			<div v-if="isSwitchPersonalInfo" class="relative left-8">
				<h1 class="text-xl mb-5 font-semibold w-full text-center sm:w-3/4 sm:text-2xl">
					Personal information
				</h1>

				<ValidationObserver v-slot="{ handleSubmit }">
					<form @submit.prevent="handleSubmit(onSubmit)">
						<div class="w-full flex flex-col items-center gap-3">
							<ValidationProvider v-slot="{ errors }" name="name" rules="required" class="w-full">
								<input v-model="userDetails.name" type="text" placeholder="First name"
									:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
									class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
							</ValidationProvider>
							<ValidationProvider v-slot="{ errors }" name="surname" rules="required" class="w-full">
								<input v-model="userDetails.surname" type="text" placeholder="Last name"
									:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
									class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
							</ValidationProvider>
							<ValidationProvider v-slot="{ errors }" name="email" rules="" class="w-full">
								<input v-model="userDetails.email" disabled type="text" placeholder="Email"
									:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
									class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
							</ValidationProvider>

							<ValidationObserver v-slot="{ handleSubmit }" class="w-full">
								<form class="flex flex-col items-center w-10/12"
									@submit.prevent="handleSubmit(sendVerificationCode)">
									<div
										class="country-container relative flex justify-between items-center w-full border border-gray-300 py-3 px-4 rounded-lg mt-2 cursor-pointer">
										<div class="flex justify-between items-center w-full">
											<div class="w-full flex items-center gap-3">
												<img :src="SelectedCountry.flag" class="w-5" />
												<p class="text-sm text-blackish">
													{{ SelectedCountry.name }}
												</p>
											</div>
											<div>
												<img src="@/assets/img/pages/login/arrow-down.svg" />
											</div>
										</div>
										<!-- Country list -->
										<div v-if="isCountryList"
											class="country-list absolute top-full left-0 w-full h-full">
											<div
												class="w-full border rounded bg-white shadow-md max-h-64 overflow-y-scroll px-4 mt-2.5">
												<div v-for="(country, index) in allCountries" :key="index"
													class="flex justify-between items-center"
													@click="selectCountry(country)">
													<div class="flex items-center gap-3 py-2">
														<img :src="country.flag" class="w-5" />
														<p class="text-sm text-blackish">{{ country.name }}</p>
													</div>
													<div v-if="country.name === SelectedCountry.name"
														class="h-2 w-2 rounded-full bg-blackish bg-opacity-50"></div>
												</div>
											</div>
										</div>
									</div>

									<div class="w-full flex items-center gap-2 mt-3">
										<input v-model="SelectedCountry.dialCode" disabled
											class="w-1/4 py-3 px-4 bg-lighterBlue rounded outline-none" />
										<ValidationProvider v-slot="{ errors }" name="phone" rules="required"
											class="w-full">
											<input type="tel" name="phone" v-model="userDetails.phone"
												placeholder="Phone" :class="
													errors[0]
														? 'text-red-600 border-red-600 placeholder-red-600'
														: 'text-blackish border-gray-300 focus:border-blue-600'
												" class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
										</ValidationProvider>
									</div>
								</form>
							</ValidationObserver>

						</div>
						<div class="flex items-center gap-4 mt-5">
							<button type="button"
								class="text-xs sm:text-sm w-28 sm:w-36 py-2 rounded-full bg-normalBlue text-white uppercase"
								@click="$emit('toggle')">
								Cancel
							</button>
							<button type="submit" v-bind:disabled="isLoading"
								class="py-2 px-8 bg-blackish text-white rounded-full">
								<span v-if="!isLoading">Save Changes</span>
								<span v-if="isLoading" class="flex text-sm">
									<svg class="animate-spin ml-1 mr-3 h-5 w-5 text-white"
										xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
											stroke-width="4"></circle>
										<path class="opacity-75" fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
										</path>
									</svg>
									Processing
								</span>
							</button>
						</div>
					</form>
				</ValidationObserver>

			</div>
			<div v-else>
				<div class="w-full px-16 flex flex-col items-center">
					<p class="mt-16 text-sm">Enter 6-digit SMS code to verify</p>
					<ValidationObserver v-slot="{ handleSubmit }" class="w-full">
						<form class="flex flex-col items-center w-full"
							@submit.prevent="handleSubmit(verifyCodeSubmit)">
							<ValidationProvider v-slot="{ errors }" name="verifyCode" rules="required">
								<div class="mt-10">
									<div class="flex justify-center">
										<input type="text" name="verifyCode" v-model="verifyCode" placeholder="SMS code"
											:class="
												errors[0]
													? 'text-red-600 border-red-600 placeholder-red-600'
													: 'text-blackish border-gray-300 focus:border-blue-600'
											" class="w-full py-3 px-4 border rounded-lg outline-none" />
									</div>
								</div>
								<span class="input-invalid-message text-sm text-red-600 mt-2">
									{{ errors[0] }}
								</span>
							</ValidationProvider>
							<div>
								<button @click="resend"
									class="w-32 p-2 text-blackish border border-blackish rounded-full mt-2">
									Resend
								</button>
								<button type="submit" v-bind:disabled="isLoading"
									class="w-32 p-2 bg-blackish text-white rounded-full mt-9">
									<span v-if="!isLoading">Confirm</span>
									<span v-if="isLoading" class="flex text-sm">
										<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
											xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
											<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
												stroke-width="4"></circle>
											<path class="opacity-75" fill="currentColor"
												d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
											</path>
										</svg>
										Processing...
									</span>
								</button>
							</div>
						</form>
					</ValidationObserver>

				</div>
			</div>
		</div>

	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { countries } from "../../../../plugins/vue_country_list";

export default {
	data: () => ({
		phone: null,
		phone_code: null,
		SelectedCountry: {},
		allCountries: countries,
		isLoading: false,
		isCloseModal: true,
		userDetails: {},
		currentPhone: null,
		currentPhoneCode: null,
		isSwitchPersonalInfo: true,
		verifyCode: "",
		contactForm: null,
		isCountryList: true,
	}),

	created() {
		this.userDetails = { ...this.$auth.user }
		this.currentPhone = this.userDetails.phone
		this.currentPhoneCode = this.SelectedCountry.dialCode
		for (let i = 0; i < this.allCountries.length; i++) {
			if (this.userDetails.phone_code == this.allCountries[i].dialCode) {
				this.SelectedCountry = { ...this.allCountries[i] }
			}
		}
	},

	methods: {
		resend() {
			this.contactForm = {
				phone: this.userDetails.phone,
				phone_code: this.SelectedCountry.dialCode
			}
			this.SEND_PHONE_VERIFICATION_CODE(this.contactForm)
				.then(response => {
				})
				.catch((error) => {
					this.$toast.error({
						title: 'Something went wrong!',
						message: error.message,
					});
				})
		},
		...mapActions({
			UPDATE_USER: "authentication/UPDATE_USER",
			SEND_PHONE_VERIFICATION_CODE: "authentication/SEND_PHONE_VERIFICATION_CODE",
			VERIFY_USER_PHONE: "authentication/VERIFY_USER_PHONE",
			FETCH_USER: "authentication/FETCH_USER",
		}),
		selectCountry(country) {
			this.SelectedCountry.name = country.name;
			this.SelectedCountry.dialCode = country.dialCode;
			this.SelectedCountry.flag = country.flag;
			this.isCountryList = false
			setTimeout(() => {
				this.isCountryList = true
			}, 100)
		},
		async onSubmit() {
			if (this.currentPhone === this.userDetails.phone || this.currentPhoneCode === this.SelectedCountry.dialCode) {
				this.isLoading = true;
				const data = {
					name: this.userDetails.name,
					surname: this.userDetails.surname,
					email: this.userDetails.email,
				}
				this.UPDATE_USER(data)
					.then(response => {
						this.FETCH_USER()
						this.$emit('toggle')
						this.isCloseModal = false
						this.isLoading = false;
						this.$toast.success({
							title: "User Updated",
							message: response.data.message,
						});
					})
					.catch((error) => {
						this.isLoading = false;
						this.$toast.error({
							title: "Error",
							message: error.message,
						});
					})
			}
			else {
				this.isSwitchPersonalInfo = false
				this.contactForm = {
					phone: this.userDetails.phone,
					phone_code: this.SelectedCountry.dialCode
				}
				this.SEND_PHONE_VERIFICATION_CODE(this.contactForm)
					.then(response => { })
					.catch((error) => {
						this.$toast.error({
							title: 'Something went wrong!',
							message: error.message,
						});
					})
			}
		},
		async verifyCodeSubmit() {
			this.isLoading = true;
			this.VERIFY_USER_PHONE('?code=' + this.verifyCode)
				.then(response => {
					const data = {
						name: this.userDetails.name,
						surname: this.userDetails.surname,
						email: this.userDetails.email,
						phone: this.userDetails.phone,
						phone_code: this.SelectedCountry.dialCode,
					}
					this.UPDATE_USER(data)
						.then(response => {
							this.FETCH_USER()
							this.$emit('toggle')
							this.isCloseModal = false
							this.isLoading = false;
							this.$toast.success({
								title: "User Updated",
								message: response.data.message,
							});
						})
						.catch((error) => {
							this.isLoading = false;
							this.$toast.error({
								title: "Error",
								message: error.message,
							});
						})
				})
				.catch((error) => {
					this.isLoading = false;
					this.$toast.error({
						title: 'Verification Failed!',
						message: error.message,
					});
				})
		}
	},

}

</script>

<style scoped>
.country-container .country-list {
	display: none;
}

.country-container:hover .country-list {
	display: block;
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