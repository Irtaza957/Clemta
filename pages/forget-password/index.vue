<template>
	<div class="w-full flex flex-col items-center">
		<div class="w-full mt-20">
			<p class="text-center text-sm">
				Enter your account email. <br />
				On this email we will send password restore link.
			</p>
			<ValidationObserver v-slot="{ handleSubmit }" ref="forgotPasswordValidator">
				<form @submit.prevent="handleSubmit(onSubmit)" class="flex flex-col items-center">
					<div class="mt-4 w-full text-sm">
						<ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
							<input type="email" v-model="email" placeholder="Email" :class="
								errors[0]
									? 'border border-red-600 placeholder-red-600 text-red-600'
									: 'border focus:border-blue-600 border-gray-300'
							" class="w-full py-3 px-4 rounded outline-none" />
						</ValidationProvider>
					</div>
					<button type="submit" :disabled="isSubmitted"
						class="py-2 w-32 bg-blackish text-white rounded-full mt-6">
						<span v-if="!isSubmitted">Send</span>
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
					<button type="button" :disabled="isSubmitted"
						class="p-1.5 w-32 bg-white text-blackish border border-blackish rounded-full mt-2"
						@click="$router.push('/' + 'login')">
						Back
					</button>
				</form>
			</ValidationObserver>
			<div class="text-center mt-10">
				<p class="text-sm text-gray-600 mb-2">Didn't recieve?</p>
				<p
					class="text-sm w-max mx-auto border-b border-blackish text-blackish font-semibold cursor-pointer pb-px">
					Re-send link
				</p>
			</div>
		</div>
		<p class="mt-16 text-sm">Is it your first time?</p>
		<h2 class="font-semibold mt-4 cursor-pointer" @click="$router.push('/register')">
			Sign up
		</h2>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	layout: "auth-layout",
	data: () => ({
		isSubmitted: false,
		email: ''
	}),
	methods: {
		...mapActions({
			RESET_PASSWORD: "authentication/RESET_PASSWORD"
		}),
		onSubmit() {
			this.RESET_PASSWORD({ email: this.email }).then(response => {
				this.$toast.success({
					title: "Success!",
					message: response.data.data,
				});
				this.email = '';
				this.$refs.forgotPasswordValidator.reset()
			}).catch((error) => {
				this.$toast.error({
					title: "Error!",
					message: 'User does not exist',
				});
			})
		}
	}
}
</script>
