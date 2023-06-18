<template>
	<div class="w-full flex flex-col items-center">
		<!-- Code to verify -->
		<div class="w-full flex flex-col items-center">
			<p class="mt-16 text-sm">Enter 6-digit SMS code to verify</p>
			<ValidationObserver v-slot="{ handleSubmit }" class="w-full">
				<form class="flex flex-col items-center w-full" @submit.prevent="handleSubmit(verifyCodeSubmit)">
					<ValidationProvider v-slot="{ errors }" name="verifyCode" rules="required">
						<div class="mt-10">
							<div class="flex justify-center">
								<input type="text" name="verifyCode" v-model="verifyCode" placeholder="SMS code" :class="
									errors[0]
										? 'text-red-600 border-red-600 placeholder-red-600'
										: 'text-blackish border-gray-300 focus:border-blue-600'
								" class="w-32 py-3 px-4 border rounded outline-none" />
							</div>
						</div>
						<span class="input-invalid-message text-sm text-red-600 mt-2">
							{{ errors[0] }}
						</span>
					</ValidationProvider>
					<button type="submit" v-bind:disabled="isSubmitted"
						class="w-32 p-2 bg-blackish text-white rounded-full mt-9">
						<span v-if="!isSubmitted">Confirm</span>
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
				@click="$router.push('/' + 'register/phone-verification')">
				Back
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";

export default {
	layout: "auth-layout",

	data: () => ({
		verifyCode: "",
		isSubmitted: false,
	}),

	methods: {
		...mapActions({
			VERIFY_USER_PHONE: "authentication/VERIFY_USER_PHONE",
			FETCH_USER: "authentication/FETCH_USER",
		}),

		async verifyCodeSubmit() {
			this.isSubmitted = true;
			this.VERIFY_USER_PHONE('?code=' + this.verifyCode)
				.then(response => {
					this.$toast.success({
						title: "Verification Successfull",
						message: response.data.message,
					});
					this.FETCH_USER()
						.then(response => {
							this.isSubmitted = false;
							this.$router.push("/create-order");
						})
						.catch((error) => {
							this.isSubmitted = false;
							this.$router.push("/create-order");
						})
				})
				.catch((error) => {
					this.isSubmitted = false;
					this.$toast.error({
						title: 'Verification Failed!',
						message: error.message,
					});
				})
		},
	},
};
</script>
