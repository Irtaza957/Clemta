<template>
	<div class="md:my-20 my-16">
		<Container :padding="'xl:px-32'">
			<h1 class="flex-shrink-0 lg:text-5xl md:text-4xl text-3xl font-bold text-normalBlue">
				Contact <span class="text-blackish">Us</span>
			</h1>
			<!--  -->
			<div class="grid md:grid-cols-2 grid-cols-1 xl:gap-32 lg:gap-24 gap-16 lg:mt-12 mt-8">
				<div>
					<h2 class="text-2xl font-semibold mb-5">About Us</h2>
					<p class="lg:text-base text-sm leading-5 mb-4">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget
						elementum arcu. Fusce blandit augue enim, quis tempor justo aliquet
						vel. In hac habitasse platea dictumst. Ut tincidunt volutpat
						elementum. In hac habitasse platea dictumst. Suspendisse laoreet
						lectus non gravida dictum. Fusce eget diam et purus sodales pretium
						id ut ante.
					</p>
					<p class="lg:text-base text-sm leading-5 mb-4">
						Vivamus at dui commodo, fermentum dolor sed, imperdiet ipsum. Class
						aptent taciti sociosqu ad litora torquent per conubia nostra, per
						inceptos himenaeos. Donec eros augue, aliquet quis sagittis in,
						auctor et ligula. Sed sit amet commodo felis, id tincidunt turpis.
					</p>
					<p class="lg:text-base text-sm leading-5">
						Phasellus dignissim, nibh eu dignissim pulvinar, augue justo varius
						risus, eu fringilla arcu arcu in est. Donec sagittis aliquet auctor.
						Donec pellentesque dapibus gravida.
					</p>
				</div>
				<!--  -->
				<div>
					<ValidationObserver v-slot="{ handleSubmit }" ref="contact-us">
						<form @submit.prevent="handleSubmit(onContactUs)" class="flex flex-col gap-4 lg:w-10/12 w-full">
							<input v-model="contactForm.first_name" type="text" placeholder="First Name"
								class="py-3 px-4 rounded-lg border border-gray-300" />
							<input v-model="contactForm.last_name" type="text" placeholder="Last Name"
								class="py-3 px-4 rounded-lg border border-gray-300" />
							<input v-model="contactForm.email" type="text" placeholder="Email"
								class="py-3 px-4 rounded-lg border border-gray-300" />
							<textarea v-model="contactForm.message" type="text" placeholder="Your Message" rows="4"
								class="py-3 px-4 rounded-lg border border-gray-300"></textarea>
							<button type="submit"
								class="py-3 px-4 w-32 ml-auto rounded-full text-sm bg-blackish text-white">
								Send
							</button>
						</form>
					</ValidationObserver>
				</div>
			</div>
		</Container>
	</div>
</template>
<script>
export default {
	layout: "base-layout",
	data: () => ({
		contactForm: {
			first_name: "",
			last_name: "",
			email: "",
			message: "",
		},
	}),
	methods: {
		onContactUs() {
			console.log(this.contactForm);
		},
	},
};
</script>
<style scoped>
</style>
