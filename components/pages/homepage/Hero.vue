<template>
	<div class="relative">
		<div class="bg-homeHero bg-cover bg-bottom bg-no-repeat w-full md:pb-0 pb-16">
			<Header />
			<!-- Poster heading -->
			<div class="relative lg:mt-12 mt-8">
				<div class="left-side md:absolute relative lg:px-20 md:px-6">
					<Container>
						<div class="lg:my-6 my-3 mb-0">
							<h1
								class="2xl:text-6xl xl:text-5xl md:text-3xl sm:text-4xl text-3xl font-extrabold text-white leading-tight">
								Start & Manage <br />
								Your Business <br />
								<span class="text-lightBlue">in the U.S.</span>
							</h1>
						</div>
						<div class="flex items-center md:gap-7 gap-4 pr-10 mt-5">
							<nuxt-link to="/register">
								<button
									class="w-max flex-shrink-0 lg:py-3 py-2 lg:px-8 px-5 rounded-full lg:text-sm text-xs bg-white text-blackish font-semibold border-2 border-white">
									Get Started
								</button>
							</nuxt-link>
							<!--  -->
							<div class="bg-white bg-opacity-60 py-2 px-5 rounded-lg">
								<img src="@/assets/img/pages/homepage/trustpilot.svg" alt="" class="lg:h-9 h-6" />
							</div>
						</div>
					</Container>
				</div>
				<div class="md:block hidden w-max ml-auto">
					<img src="@/assets/img/pages/homepage/poster-macbook.svg" alt=""
						class="2xl:w-full xl:w-10/12 lg:w-8/12 md:w-6/12 ml-auto" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "../../common/Header.vue";

export default {
	components: {
		Header,
	},
};
</script>

<style scoped>
.left-side {
	top: 10%;
	left: 50%;
	transform: translateX(-50%);
	width: 100%;
	max-width: 1536px;
}
</style>
