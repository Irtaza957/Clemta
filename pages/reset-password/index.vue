<template>
	<div class="w-full flex flex-col items-center">
		<!-- *****************   New Password Form   *****************  -->
		<div class="w-full mt-20">
			<p class="text-center text-sm">Create new password</p>
			<ValidationObserver v-slot="{ handleSubmit }" ref="createNewPasswordForm">
				<form @submit.prevent="handleSubmit(onUpdatePassword)" class="flex flex-col items-center">
					<div class="mt-5 w-full text-sm">
						<ValidationProvider v-slot="{ errors }" name="password" rules="required">
							<div class="relative w-full rounded">
								<input :type="viewPassword ? 'text' : 'password'" v-model="password"
									placeholder="New Password" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600 text-red-600'
											: 'border focus:border-blue-600 border-gray-300'
									" class="w-full py-3 pl-4 pr-10 rounded outline-none" />
								<img src="@/assets/img/pages/login/view.png" alt="" @mouseenter="viewPassword = true"
									@mouseleave="viewPassword = false"
									class="absolute top-1/2 right-4 transform -translate-y-1/2" />
							</div>
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="confirm" rules="required|confirmed:password">
							<div class="relative w-full rounded mt-3">
								<input :type="viewConfirmPassword ? 'text' : 'password'" v-model="confirmPassword"
									placeholder="Confirm New Password" :class="
										errors[0]
											? 'border border-red-600 placeholder-red-600 text-red-600'
											: 'border focus:border-blue-600 border-gray-300'
									" class="w-full py-3 pl-4 pr-10 rounded outline-none" />
								<img src="@/assets/img/pages/login/view.png" alt=""
									@mouseenter="viewConfirmPassword = true" @mouseleave="viewConfirmPassword = false"
									class="absolute top-1/2 right-4 transform -translate-y-1/2" />
							</div>
						</ValidationProvider>
					</div>

					<button type="submit" v-bind:disabled="isSubmitted"
						class="py-2 w-32 bg-blackish text-white rounded-full mt-6">
						<span v-if="!isSubmitted">Save</span>
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
		isSubmitted: false,
		password: "",
		confirmPassword: "",
		viewPassword: false,
		viewConfirmPassword: false,
	}),
	methods: {
		...mapActions({
			RESTORE_PASSWORD: "authentication/RESTORE_PASSWORD"
		}),
		onUpdatePassword() {
			const queryString = window.location.search;
			const urlParams = new URLSearchParams(queryString);
			const code = urlParams.get('code')
			if(code){
			this.RESTORE_PASSWORD({ new_password: this.password , verification_code: code})
				.then(response => {
					this.$toast.success({
						title: "Success!",
						message: "Password successfully updated",
					});
					this.$router.push('/login');
				}).catch((error) => {
					this.$toast.error({
						title: "Error!",
						message: error.message,
					});
				})
			}
			else{
				this.$toast.error({
					title: "Error!",
					message: 'Invalid Access!',
				});
			}
		}
	}
};
</script>

