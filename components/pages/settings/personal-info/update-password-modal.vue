<template>
	<div class="fixed top-0 left-0 h-full w-full flex justify-center items-center z-20">
		<div class="fixed top-0 left-0 h-full w-full bg-darkBlue bg-opacity-60 cursor-pointer"
			@click="$emit('toggle')" />
		<div
			class="popup-animation relative flex flex-col items-center gap-6 bg-white rounded-xl px-9 py-12 z-30 scrollbar-none">
			<div class="absolute top-4 right-6 text-sm font-semibold cursor-pointer" @click="$emit('toggle')">
				&#9587;
			</div>
			<h1 class="sm:text-2xl text-xl font-semibold sm:w-3/4 w-full text-center">
				Change Password
			</h1>
			<ValidationObserver v-slot="{ handleSubmit }">
				<form @submit.prevent="handleSubmit(onPasswordChange)">
					<div class="w-full flex flex-col items-center gap-3">
						<h2 class="font-semibold text-center">Current password</h2>
						<ValidationProvider v-slot="{ errors }" name="current_password" rules="required" class="w-full">
							<input v-model="updatePassword.current_password" type="password"
								placeholder="Enter your current password"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<h2 class="font-semibold text-center">New password</h2>
						<ValidationProvider v-slot="{ errors }" name="new_password" rules="required" class="w-full">
							<input v-model="updatePassword.new_password" type="password"
								placeholder="Enter your new password"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
						<ValidationProvider v-slot="{ errors }" name="confirm_password" rules="required" class="w-full">
							<input v-model="updatePassword.confirm_password" type="password"
								placeholder="Confirm your new password"
								:class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'"
								class="p-3 rounded-lg outline-none text-sm border border-gray-300 w-full max-w-xs" />
						</ValidationProvider>
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
	</div>
</template>
<script>
import { mapActions } from "vuex";
export default {
	data: () => ({
		updatePassword: {
			current_password: '',
			new_password: '',
			confirm_password: '',
		},
		isLoading: false,
	}),

	methods: {
		...mapActions({
			CHANGE_PASSWORD: "authentication/CHANGE_PASSWORD",
		}),
		async onPasswordChange() {
			if (this.updatePassword.new_password !== this.updatePassword.confirm_password) {
				this.$toast.error({
					title: "Error!",
					message: "Passwords don't match*",
				});
			}
			else if (this.updatePassword.new_password.length < 6 || this.updatePassword.confirm_password.length < 6) {
				this.$toast.error({
					title: "Error!",
					message: "Password must be at least 6 characters",
				});
			}
			else if (this.updatePassword.new_password === this.updatePassword.current_password || this.updatePassword.confirm_password === this.updatePassword.current_password) {
				this.$toast.error({
					title: "Error!",
					message: "New password can't be the same as current password",
				});
			}
			else {
				this.isLoading = true;
				this.CHANGE_PASSWORD(this.updatePassword)
					.then(response => {
						this.isLoading = false;
						this.$toast.success({
							title: 'Password Updated',
							message: response.data.message,
						});
						this.$emit('toggle')
					})
					.catch((error) => {
						this.isLoading = false;
						this.$toast.error({
							title: 'Error!',
							message: error.message,
						});
					})
			}
		},
	},
}
</script>
