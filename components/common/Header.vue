<template>
	<div class="bg-skyBlue">
		<Container :padding="'xl:px-20'">
			<div class="relative flex justify-between items-center text-white py-7">
				<!-- Logo -->
				<nuxt-link to="/">
					<div class="flex items-center gap-5">
						<img src="@/assets/img/pages/homepage/logo.svg" alt="logo" class="md:w-32 w-24" />
					</div>
				</nuxt-link>
				<!-- Nav links -->
				<div class="flex items-center xl:gap-20 gap-14">
					<nav class="hidden lg:flex items-center xl:gap-12 gap-6">
						<nuxt-link to="/pricing" class="px-1.5 font-semibold py-2"
							:class="$route.name === 'pricing' && 'nav-bar'">Pricing</nuxt-link>
						<nuxt-link to="/FAQ" class="px-1.5 font-semibold py-2"
							:class="$route.name === 'FAQ' && 'nav-bar'">FAQ</nuxt-link>
						<nuxt-link to="/blog" class="px-1.5 font-semibold py-2"
							:class="$route.name === 'blog' && 'nav-bar'">Blog</nuxt-link>
						<nuxt-link to="/success-stories" class="px-1.5 font-semibold py-2"
							:class="$route.name === 'success-stories' && 'nav-bar'">Success Stories</nuxt-link>
						<nuxt-link to="/contact-us" class="px-1.5 font-semibold py-2"
							:class="$route.name === 'contact-us' && 'nav-bar'">Contact Us</nuxt-link>
					</nav>
					<!-- Login or register -->
					<div class="hidden lg:flex items-center gap-6 text-sm">
						<nuxt-link to="/login">
							<button class="py-3 px-7 rounded-2xl border-2 font-medium border-white">
								Login
							</button>
						</nuxt-link>
						<nuxt-link to="/register">
							<button
								class="py-3 px-8 rounded-full bg-white text-blackish font-medium border-2 border-white">
								Get Started
							</button>
						</nuxt-link>
					</div>
				</div>
				<!-- Menu bar (Mobiile & small Tablet view) -->
				<div class="lg:hidden block cursor-pointer" @click="openMenu = !openMenu">
					<img src="@/assets/img/pages/homepage/menu.svg" alt="" />
				</div>

				<!-- Mobile menu -->
				<div :class="openMenu ? 'h-[17rem] px-5 py-6' : 'h-0 p-0'"
					class="absolute top-full left-0 w-full lg:hidden block bg-white rounded-lg transition-all duration-200 ease-in-out overflow-hidden shadow-xl text-sm z-40">
					<nav class="flex flex-col items-center gap-4 text-blackish">
						<nuxt-link to="/pricing" class="hover:font-semibold"><span @click="openMenu = false"
								:class="$route.name === 'pricing' && 'font-semibold'">
								Pricing
							</span></nuxt-link>
						<nuxt-link to="/FAQ" class="hover:font-semibold"><span @click="openMenu = false"
								:class="$route.name === 'FAQ' && 'font-semibold'">FAQ</span></nuxt-link>
						<nuxt-link to="/blog" class="hover:font-semibold"><span @click="openMenu = false"
								:class="$route.name === 'blog' && 'font-semibold'">Blog</span></nuxt-link>
						<nuxt-link to="/success-stories" class="hover:font-semibold"><span @click="openMenu = false"
								:class="$route.name === 'success-stories' && 'font-semibold'">Success Stories</span>
						</nuxt-link>
						<nuxt-link to="/contact-us" class="hover:font-semibold"><span @click="openMenu = false"
								:class="$route.name === 'contact-us' && 'font-semibold'">Contact Us</span></nuxt-link>
					</nav>
					<div class="lg:hidden flex justify-center items-center gap-2 text-blackish mt-5">
						<nuxt-link to="/login">
							<button class="py-1.5 px-5 rounded-2xl border-2 border-lightestGray"
								@click="openMenu = false">
								Login
							</button>
						</nuxt-link>
						<nuxt-link to="/register">
							<button class="py-2 px-5 rounded-full bg-lightestGray" @click="openMenu = false">
								Get Started
							</button>
						</nuxt-link>
					</div>
				</div>
			</div>
		</Container>
	</div>
</template>

<script>
export default {
	data: () => ({
		openMenu: false,
	}),
};
</script>

<style scoped>
.nav-bar {
	position: relative;
}

.nav-bar::after {
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	width: 100%;
	height: 2.1px;
	border-radius: 1rem;
	transform: translateX(-50%);
	background-color: white;
	animation: bar 0.2s linear forwards;
}

@keyframes bar {
	0% {
		width: 0;
	}

	100% {
		width: 100%;
	}
}
</style>
