<template>
	<div class="flex">
		<div
			class="flex flex-col justify-between items-center 2xl:w-96 md:w-80 w-full flex-shrink-0 bg-white px-5 pt-12 h-screen text-blackish overflow-y-scroll scrollbar-none">
			<!-- Logo -->
			<div class="flex flex-col items-center">
				<img src="@/assets/img/pages/login/logo.svg" class="w-7" />
				<h2 class="mt-4">Welcome to Clemta Dashboard</h2>
			</div>

			<!-- Child data -->
			<div class="w-full">
				<Nuxt />
			</div>

			<!-- Footer -->
			<div class="flex flex-col items-center">
				<div class="flex items-center gap-3 mt-20">
					<img src="@/assets/img/pages/login/logo.svg" class="w-7" />
					<h1 class="text-2xl font-medium">Clemta</h1>
				</div>
				<p style="font-size: 13px" class="mt-4 text-center leading-5 mb-10">
					By logging in, you agree to our terms of service and privacy policy. Money transmission is provided
					by Startup
					Law Consultancy, Inc. pursuant to its licenses.
				</p>
			</div>
		</div>
		<!-- SIDE POSTER -->
		<div
			class="hidden md:flex justify-center items-center bg-gradient-to-br from-lighterBlue to-lightestBlue h-screen w-full">
			<SidePoster />
		</div>
	</div>
</template>

<script>
import SidePoster from "../components/pages/login/side-poster.vue";

export default {
	components: {
		SidePoster,
	},
	data: () => ({
	}),
};
</script>
