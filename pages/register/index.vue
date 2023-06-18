<template>
	<div class="w-full flex flex-col items-center">
		<div class="flex flex-col items-center">
			<!-- Google & Facebook Login -->
			<div class="w-full mt-16">
				<div class="flex items-center gap-2 bg-lighterBlue rounded-full p-2">
					<img src="@/assets/img/pages/login/google.svg" class="w-7" />
					<p class="text-center w-full">
						Login with <span class="font-semibold">Google</span>
					</p>
				</div>
				<div class="flex items-center gap-2 bg-lighterBlue rounded-full mt-4 p-0.5">
					<img src="@/assets/img/pages/login/facebook.svg" />
					<p class="text-center w-full -ml-4">
						Login with <span class="font-semibold">Facebook</span>
					</p>
				</div>
			</div>
			<!-- OR -->
			<div class="flex items-center w-full gap-2 text-gray-400 text-sm px-2 mt-3">
				<div class="w-full h-px bg-gray-400"></div>
				OR
				<div class="w-full h-px bg-gray-400"></div>
			</div>
			<!-- Sign up credentials -->
			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="flex flex-col items-center" @submit.prevent="handleSubmit(signup)">
					<div class="mt-4 w-full text-sm">
						<ValidationProvider v-slot="{ errors }" name="Name" rules="required">
							<input :class="
						errors[0]
							? 'text-red-600 border-red-600 placeholder-red-600'
							: 'text-blackish border-gray-300 focus:border-blue-600'" v-model="signupForm.name" type="text"
								name="name" placeholder="Name" class="w-full py-3 px-4 border rounded outline-none" />
						</ValidationProvider>

						<ValidationProvider v-slot="{ errors }" name="surname" rules="required">
							<input type="text" v-model="signupForm.surName" name="surname" placeholder="Surname" :class="
								errors[0]
									? 'text-red-600 border-red-600 placeholder-red-600'
									: 'text-blackish border-gray-300 focus:border-blue-600'
							" class="w-full py-3 px-4 border rounded outline-none mt-2" />
						</ValidationProvider>

						<ValidationProvider v-slot="{ errors }" name="email" rules="required|email">
							<input type="text" name="email" v-model="signupForm.email" placeholder="Email" :class="
								errors[0]
									? 'text-red-600 border-red-600 placeholder-red-600'
									: 'text-blackish border-gray-300 focus:border-blue-600'
							" class="w-full py-3 px-4 border rounded outline-none mt-2" />
						</ValidationProvider>

						<ValidationProvider v-slot="{ errors }" name="password" rules="required">
							<div class="w-full relative mt-2">
								<input :type="viewPassword ? 'text' : 'password'" name="password" minlength="8"
									v-model="signupForm.password" placeholder="Password" :class="
										errors[0]
											? 'text-red-600 border-red-600 placeholder-red-600'
											: 'text-blackish border-gray-300 focus:border-blue-600'
									" class="w-full py-3 px-4 border rounded outline-none" />
								<img src="@/assets/img/pages/login/view.png" @mouseenter="viewPassword = true"
									@mouseleave="viewPassword = false"
									class="absolute top-1/2 right-4 transform -translate-y-1/2" />
							</div>
						</ValidationProvider>
					</div>
					<button type="submit" v-bind:disabled="isSubmitted"
						class="py-2 px-12 bg-blackish text-white rounded-full mt-6">
						<span v-if="!isSubmitted">Sign Up</span>
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
			<p class="mt-7 text-sm">Is it your first time?</p>
			<h2 class="font-semibold mt-4 cursor-pointer" @click="$router.push('/login')">
				Login
			</h2>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	layout: "auth-layout",
	data: () => ({
		signupForm: {
			name: "",
			surName: "",
			email: "",
			password: "",
		},
		viewPassword: false,
		isSubmitted: false
	}),
	methods: {
		...mapActions({
			REGISTER: "authentication/REGISTER",
		}),
		async signup() {
			this.isSubmitted = true;
			this.REGISTER(this.signupForm)
				.then(response => {
					this.$toast.success({
						title: "Registeration SuccessFull",
						message: "Your account is created successfully!",
					});
					this.$router.push("/register/phone-verification");
					this.isSubmitted = false;
				})
				.catch((error) => {
					this.isSubmitted = false;
					this.$toast.error({
						title: 'Registration Failed!',
						message: error.message,
					});
				})
		},
	},
};
</script>
