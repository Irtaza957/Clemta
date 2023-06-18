<template>
	<div>
		<!-- Header and Hero -->
		<Hero />

		<!-- Main Services -->
		<Container :padding="'xl:px-32'">
			<h1 class="lg:text-5xl md:text-4xl text-3xl font-bold text=blackish md:my-20 my-14">
				<span class="text-normalBlue">Main</span> <br />Services
			</h1>
			<div
				class="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 gap-y-5 mb-10">
				<div v-for="(service, index) in services" :key="index">
					<Services :service="service" />
				</div>
			</div>
		</Container>

		<!-- How to use Clemta Dashboard -->
		<div class="business-dashboard-container bg-lightestGray mt-12 pt-12 pb-20">
			<div class="business-dashboard mx-auto grid md:grid-cols-2 grid-cols-1 gap-5">
				<div class="hidden relative md:block w-10/12">
					<img src="@/assets/img/pages/homepage/create-invoice.svg" alt=""
						class="lg:w-96 w-72 absolute top-0 left-1/2 transform -translate-x-1/3" />
					<!--  -->
					<img src="@/assets/img/pages/homepage/my-company.svg" alt=""
						class="my_company-img lg:w-96 w-72 absolute lg:top-full top-3/4 left-0 transform translate-x-0" />
					<!--  -->
					<img src="@/assets/img/pages/homepage/tax-filing.svg" alt=""
						class="lg:w-96 w-72 absolute lg:top-full top-3/4 left-full transform -translate-x-3/4 -translate-y-3/4" />
					<!--  -->
				</div>
				<div>
					<Container :padding="'xl:pr-32'">
						<h1 class="xl:text-5xl md:text-4xl text-3xl font-bold text-blackish md:mt-10 mt-3">
							<span class="text-normalBlue">How to use</span> <br />Clemta
							Dashboard
						</h1>
						<div
							class="lg:w-96 md:w-80 w-full block relative border border-gray-300 rounded-tl-3xl rounded-br-3xl p-5 pt-12 mt-16">
							<div class="absolute top-0 left-8 transform -translate-y-1/2 flex items-center gap-3">
								<div v-for="i in 3" :key="i" :class="i === businessSteps && 'bg-blackish text-white'"
									class="flex justify-center items-center md:h-12 h-9 md:w-12 w-9 bg-lightestGray sm:border-2 border border-blackish rounded-full cursor-pointer transition-all duration-200 ease-linear"
									@click="businessSteps = i">
									{{ i }}
								</div>
							</div>

							<h1 class="text-xl font-semibold">
								Choose your Business Structure
							</h1>
							<p class="mt-4 text-sm">
								Register to the system with your information and log in to your
								dashboard. You will face bunch of questions in order to
								understand what kind of service can we provide.
							</p>
						</div>
					</Container>
				</div>
			</div>
		</div>

		<!-- Stories & Customers -->
		<div class="bg-white md:py-24 py-16">
			<Container :padding="'xl:px-32'">
				<div class="flex items-center gap-10">
					<h1 class="flex-shrink-0 lg:text-5xl md:text-4xl text-3xl font-bold text-blackish">
						Real Stories from <br />
						<span class="text-normalBlue">Real Customers</span>
					</h1>
					<img src="@/assets/img/pages/homepage/quote-light.svg" alt="quote"
						class="sm:block hidden relative xl:w-20 md:w-16 w-14 transform md:translate-y-0 translate-y-5" />
				</div>
				<div class="flex justify-end items-center gap-3 text-sm font-semibold cursor-pointer pr-3 my-5">
					See all success stories
					<img src="@/assets/img/pages/homepage/arrow-right.svg" alt="" />
				</div>
				<!-- Slider -->
				<div>
					<slick ref="slick" :options="slickOptions">
						<div v-for="(story, index) in realStories" :key="index" class="p-6">
							<div class="flex items-center flex-wrap gap-4">
								<img :src="require(`@/assets/img/pages/homepage/${story.image}`)" alt="" class="w-20" />
								<p class="text-sm font-semibold">{{ story.title }}</p>
							</div>
							<p class="mt-5 text-sm">{{ story.description }}</p>
						</div>
					</slick>
				</div>
			</Container>
		</div>

		<!-- Services and Pricing -->
		<div class="md:py-20 py-16 bg-lightestGray">
			<Container :padding="'xl:px-32'">
				<h1
					class="lg:text-5xl md:text-4xl text-3xl text-center xl:w-8/12 w-full mx-auto md:font-bold font-semibold text=blackish md:mb-20 mb-12 leading-tight">
					Learn about our services and see the pricing page
				</h1>
				<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
					<div class="flex items-center gap-3 text-sm" v-for="(options, index) in servicePricing"
						:key="index">
						<div class="flex-shrink-0 h-8 w-8 flex justify-center items-center bg-blackish rounded-full">
							<img src="@/assets/img/pages/homepage/check.svg" alt="" />
						</div>
						<p>{{ options.title }}</p>
					</div>
				</div>
				<button class="w-max block mx-auto mt-12 bg-blackish text-white py-3 px-6 rounded-full text-sm">
					Register Now
				</button>
			</Container>
		</div>

		<!-- Industry leading companies -->
		<div class="md:py-20 py-16">
			<Container :padding="'xl:px-32'">
				<h1 class="md:text-4xl text-3xl text-center font-bold text-blackish leading-tight">
					Trusted by industry leading companies
				</h1>
				<div
					class="grid md:grid-flow-row grid-flow-col md:grid-cols-5 grid-cols-1 md:grid-rows-1 grid-rows-5 gap-3 px-4 mt-12">
					<div v-for="(company, index) in companies" :key="index"
						class="flex justify-center items-center h-full w-full">
						<img :src="require(`@/assets/img/pages/homepage/${company.icon}`)" alt="" />
					</div>
				</div>
			</Container>
		</div>

		<!-- Footer -->
		<Footer />
	</div>
</template>

<script>
import Hero from "../components/pages/homepage/Hero.vue";
import Services from "../components/pages/homepage/Services.vue";
import Footer from "../components/common/Footer.vue";
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default {
	components: {
		Hero,
		Services,
		Footer,
		Slick,
	},
	data: () => ({
		services: [
			{
				id: 1,
				title: "Company Filing",
				detail: "Simplify the process to create proposals.",
				color: "bg-lightestBlue",
				image: "company.svg",
			},
			{
				id: 2,
				title: "Taxation",
				detail: "Taxation is easier than ever.",
				color: "bg-normalBlue",
				image: "taxation.svg",
			},
			{
				id: 3,
				title: "Bookkeeping",
				detail: "We provide bookkeeping service.",
				color: "bg-lightestGreen",
				image: "bookkeeping.svg",
			},
			{
				id: 4,
				title: "Company Essentials",
				detail: "We provide essential company services.",
				color: "bg-lightPink",
				image: "essentials.svg",
			},
			{
				id: 5,
				title: "More!",
				detail: "Simplify the process to create proposals.",
				color: "bg-lightestBlue",
				image: "more.svg",
			},
		],

		// How to use Clemta dashboard
		businessSteps: 1,

		servicePricing: [
			{
				id: 1,
				title: "See the services and pay only what you need.",
			},
			{
				id: 2,
				title: "Get quotes and learn about your concerns.",
			},
			{
				id: 3,
				title: "100% customer satisfaction gurantee.",
			},
		],

		companies: [
			{
				id: 1,
				icon: "hype.svg",
			},
			{
				id: 2,
				icon: "vivoo.svg",
			},
			{
				id: 3,
				icon: "gmply.svg",
			},
			{
				id: 4,
				icon: "spiro.svg",
			},
			{
				id: 5,
				icon: "agrotics.svg",
			},
		],

		// SLICK SLIDER OPTIONS
		slickOptions: {
			dots: true,
			infinite: false,
			speed: 300,
			arrows: false,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2,
					},
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},

				// You can unslick at a given breakpoint now by adding:
				// settings: "unslick"
				// instead of a settings object
			],

			// Any other options that can be got from plugin documentation
		},

		realStories: [
			{
				id: 1,
				title: "HYPE Sports Innovation",
				description:
					"HYPE Sports Innovation has built the largest global ecosystem in sports innovation. With over 40,000 members, including retail brands, athletic clubs, federations and academia together with over 11,000 startups, HYPE has an unrivalled capacity for outreach to global partners across all sectors in this highly diverse field.",
				image: "hype2.svg",
			},
			{
				id: 2,
				title: "Vivoo",
				description:
					"Vivoo is a welness assistant service that offer urinalysis test strips. Anyone can use their mobile application which provides personalized nutrition advice based on urine sample given.",
				image: "vivoo2.svg",
			},
			{
				id: 3,
				title: "Gmply",
				description:
					"Gmply is a solution to meet the needs of the new generation workforce & workflow. It allows you to create interactive video training. It provides a powerful user-management system that lightens your workload. It enables you to target and reach detailed training analytics in real time.",
				image: "gmply2.svg",
			},
			{
				id: 4,
				title: "HYPE Sports Innovation",
				description:
					"HYPE Sports Innovation has built the largest global ecosystem in sports innovation. With over 40,000 members, including retail brands, athletic clubs, federations and academia together with over 11,000 startups, HYPE has an unrivalled capacity for outreach to global partners across all sectors in this highly diverse field.",
				image: "hype2.svg",
			},
			{
				id: 5,
				title: "Vivoo",
				description:
					"Vivoo is a welness assistant service that offer urinalysis test strips. Anyone can use their mobile application which provides personalized nutrition advice based on urine sample given.",
				image: "vivoo2.svg",
			},
			{
				id: 6,
				title: "Gmply",
				description:
					"Gmply is a solution to meet the needs of the new generation workforce & workflow. It allows you to create interactive video training. It provides a powerful user-management system that lightens your workload. It enables you to target and reach detailed training analytics in real time.",
				image: "gmply2.svg",
			},
		],
	}),
	methods: {
		next() {
			this.$refs.slick.next();
		},

		prev() {
			this.$refs.slick.prev();
		},
	},
};
</script>

<style scoped>
.dashboard-box {
	width: 100%;
	max-width: 420px;
}

.my_company-img {
	transform: translateY(-90%);
}

/* .business-dashboard-container {
  } */

.business-dashboard-container .business-dashboard {
	height: 400px;
	max-width: 1536px;
}

.slick-track {
	display: flex !important;
	margin-bottom: 1rem;
}

.slick-slide {
	height: inherit !important;
	margin: 1rem;
	border: 1px solid rgb(179, 179, 179) !important;
	border-radius: 1rem;
}

/* CUSTOMIZE SLICK SLIDER DOTS */

.slick-dots li:hover button:before {
	color: #2b7577;
}

.slick-dots li button:before {
	color: #66bfc2;
	font-size: 12px;
}

.slick-dots li.slick-active button:before {
	color: #2b7577;
}

@media screen and (max-width: 767px) {
	.business-dashboard-container .business-dashboard {
		height: auto !important;
	}
}
</style>
