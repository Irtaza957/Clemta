<template>
	<div class="w-full flex flex-col items-center">
		<div class="w-full">
			<!-- Google & Facebook Login -->
			<div class="w-full mt-16">
				<div class="w-full flex items-center gap-2 bg-lighterBlue rounded-full p-2">
					<img src="@/assets/img/pages/login/google.svg" class="w-7" />
					<p class="text-center w-full">
						Login with <span class="font-semibold">Google</span>
					</p>
				</div>
				<div class="w-full flex items-center gap-2 bg-lighterBlue rounded-full mt-4 p-0.5">
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
			<!-- Login Form -->
			<ValidationObserver v-slot="{ handleSubmit }">
				<form class="flex flex-col items-center" @submit.prevent="handleSubmit(onLogin)">
					<div class="mt-4 w-full text-sm">
						<ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
							<input type="text" v-model="loginForm.email" placeholder="Email" :class="
								errors[0]
									? 'border border-red-600 placeholder-red-600 text-red-600'
									: 'border focus:border-blue-600 border-gray-300'
							" class="w-full py-3 px-4 rounded outline-none" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="password" rules="required" class="w-full">
							<div class="relative w-full rounded mt-2">
								<input :type="viewPassword ? 'text' : 'password'" v-model="loginForm.password"
									placeholder="Password" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600 text-red-600'
											: 'border focus:border-blue-600 border-gray-300'
									" class="w-full py-3 pl-4 pr-10 rounded outline-none" />
								<img src="@/assets/img/pages/login/view.png" @mouseenter="viewPassword = true"
									@mouseleave="viewPassword = false"
									class="absolute top-1/2 right-4 transform -translate-y-1/2" />
							</div>
						</ValidationProvider>
					</div>
					<p class="w-max ml-auto text-gray-300 text-sm mt-2 cursor-pointer"
						@click="$router.push('/' + 'forget-password')">
						Forgot Password?
					</p>
					<button type="submit" v-bind:disabled="isSubmitted"
						class="py-2 px-12 bg-blackish text-white rounded-full mt-6">
						<span v-if="!isSubmitted">Login</span>
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
		</div>
		<p class="mt-16 text-sm">Is it your first time?</p>
		<h2 class="font-semibold mt-4 cursor-pointer" @click="$router.push('/register')">
			Sign up
		</h2>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	layout: "auth-layout",

	data: () => ({
		loginForm: {
			email: "",
			password: "",
		},
		viewPassword: false,
		isSubmitted: false
	}),

	methods: {
		...mapActions({
			LOGIN: "authentication/LOGIN",
		}),

		async onLogin() {
			this.isSubmitted = true;
			this.LOGIN(this.loginForm)
				.then(response => {
					if (!response.data.data.user.verifications.phone) {
						this.$toast.success({
							title: "Incomplete verification",
							message: "Your phone is not verified",
						});
						this.$router.push('/register/phone-verification');
					} else if (response.data['awaiting-orders'] > 0 || response.data['total-orders'] === 0) {
						this.$router.push('/create-order');
					} else {
						this.$router.push('/dashboard');
					}
					this.isSubmitted = false;
				})
				.catch((error) => {
					this.isSubmitted = false;
					this.$toast.error({
						title: 'Login Failed!',
						message: error.message,
					});
				})
		},
	}
}
</script>
