<template>
	<div class="w-full bg-footerImage bg-cover bg-no-repeat bg-top">
		<div class="w-full bg-footerImageMask bg-cover bg-no-repeat bg-top md:pt-28 pt-14 md:pb-20 pb-10">
			<Container :padding="'xl:px-32'">
				<h1 class="md:text-4xl text-3xl text-center font-bold">
					Can't decide <span class="text-white">what you need?</span>
				</h1>
				<button class="bg-blackish text-white w-max block mx-auto text-sm py-3 px-6 rounded-full my-6">
					Take the Test
				</button>
				<p class="text-white text-center md:mb-0 mb-12">
					Don’t worry. It will only take 2 minutes.
				</p>
				<!--  -->
				<div
					class="grid md:grid-cols-4 grid-cols-2 gap-y-8 md:border-none border-t border-white md:py-28 py-12">
					<div class="md:col-span-1 col-span-2">
						<img src="@/assets/img/pages/homepage/logo.svg" alt="logo" class="w-32" />
					</div>
					<div>
						<h1 class="text-lg font-semibold text-white md:pl-4">Company</h1>
						<div class="mt-5 text-sm flex flex-col md:gap-3 gap-2 text-white md:pl-4">
							<nuxt-link to="#">About Us</nuxt-link>
							<nuxt-link to="#">Blog</nuxt-link>
							<nuxt-link to="#">Contact Us</nuxt-link>
							<nuxt-link to="#">Pricing</nuxt-link>
							<nuxt-link to="#">Testimonials</nuxt-link>
						</div>
					</div>
					<div>
						<h1 class="text-lg font-semibold text-white">Support</h1>
						<div class="mt-5 text-sm flex flex-col md:gap-3 gap-2 text-white">
							<nuxt-link to="#">Help Center</nuxt-link>
							<nuxt-link to="#">Terms of service</nuxt-link>
							<nuxt-link to="#">Legal</nuxt-link>
							<nuxt-link to="#">Privacy Policy</nuxt-link>
							<nuxt-link to="#">Status</nuxt-link>
						</div>
					</div>
					<div class="md:col-span-1 col-span-2 md:block flex items-center gap-7">
						<h1 class="text-lg font-semibold text-white w-max flex-shrink-0">
							Stay up to date
						</h1>
						<div class="max-w-52 border border-white flex items-stretch rounded-lg p-1.5 mt-4">
							<input type="text" placeholder="Your email"
								class="text-white bg-transparent placeholder-white text-xs font-light h-8 w-full rounded outline-none px-1" />
							<div
								class="flex-shrink-0 h-8 w-8 p-1 flex justify-center items-center rounded bg-white bg-opacity-30 cursor-pointer">
								<img src="@/assets/img/pages/homepage/send.svg" alt="" />
							</div>
						</div>
					</div>
				</div>
				<p class="text-xs text-center text-white">
					© 2021 Clemta. All rights reserved
				</p>
			</Container>
		</div>
	</div>
</template>

<script>
export default {};
</script>

