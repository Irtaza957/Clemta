<template>
	<div class="md:my-20 my-16">
		<Container :padding="'xl:px-32'">
			<h1 class="flex-shrink-0 lg:text-5xl md:text-4xl text-3xl font-bold text-normalBlue">
				Clemta <span class="text-blackish">Blog</span>
			</h1>
			<!-- SEARCH & FILTERS -->
			<div
				class="flex lg:flex-row flex-col items-center justify-between gap-y-4 sm:mt-16 mt-12 mb-4 lg:px-0 px-5">
				<!-- SEARCH FORM -->
				<div class="w-full max-w-lg">
					<form @submit.prevent="onSearch">
						<div
							class="flex flex-row-reverse items-center gap-4 w-10/12 bg-white border border-gray-400 rounded-lg px-4">
							<input type="text" placeholder="Search" class="py-3.5 outline-none text-sm w-full" />
							<button type="submit" class="outline-none">
								<img src="@/assets/img/pages/dashboard/taxation/search.svg" alt="" />
							</button>
						</div>
					</form>
				</div>
				<!--  -->
				<div class="flex-shrink-0 flex items-center flex-wrap gap-4 text-sm">
					Filter by
					<div class="bg-lightestBlue md:w-36 w-[120px] rounded-lg pr-4">
						<select name="speed" class="rounded-lg outline-none w-full bg-lightestBlue pl-4 py-3.5 text-sm">
							<option selected disabled value="">State</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
					<div class="bg-lightestBlue md:w-36 w-[120px] rounded-lg pr-4">
						<select name="speed" class="rounded-lg outline-none w-full bg-lightestBlue pl-4 py-3.5 text-sm">
							<option selected disabled value="">Taxation</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
					<div class="bg-lightestBlue md:w-36 w-[120px] rounded-lg pr-4">
						<select name="speed" class="rounded-lg outline-none w-full bg-lightestBlue pl-4 py-3.5 text-sm">
							<option selected disabled value="">Entity type</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
					<div class="bg-lightestBlue md:w-36 w-[120px] rounded-lg pr-4">
						<select name="speed" class="rounded-lg outline-none w-full bg-lightestBlue pl-4 py-3.5 text-sm">
							<option selected disabled value="">Services</option>
							<option value="1">1</option>
							<option value="2">2</option>
						</select>
					</div>
				</div>
			</div>

			<!-- BLOGS -->
			<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 xl:gap-10 gap-6 mt-10">
				<div v-for="(blog, index) in blogs" :key="index"
					class="relative border-2 border-gray-300 md:rounded-[2.3rem] rounded-[2.8rem] pb-10">
					<div :style="{
						'background-image':
							'url(' +
							require(`@/assets/img/pages/blog/${blog.image}.svg`) +
							')',
					}" class="relative transform md:scale-[1.012] scale-[1.005] rounded-t-[2rem] h-48 bg-cover bg-no-repeat -mt-px">
						<div
							class="absolute top-0 left-0 h-full w-full md:rounded-t-[2rem] rounded-t-[2.5rem] flex items-end bg-gradient-to-b from-transparent to-black text-white xl:text-2xl text-xl font-semibold py-4 px-8">
							{{ blog.title }}
						</div>
					</div>
					<!--  -->
					<div class="py-4 px-8">
						<p class="text-sm text-gray-400 mb-2">{{ blog.date }}</p>
						<p class="xl:text-lg text-gray-600 mb-4 xl:leading-6 leading-5">
							{{ blog.description }}
						</p>
					</div>
					<div
						class="absolute bottom-5 left-8 flex items-center gap-3 text-sm font-semibold my-3 cursor-pointer">
						Learn More
						<img src="@/assets/img/pages/homepage/arrow-right.svg" alt="" class="mt-0.5" />
					</div>
				</div>
			</div>
		</Container>
	</div>
</template>
<script>
export default {
	layout: "base-layout",

	data() {
		return {
			blogs: [
				{
					id: 1,
					title: "Close Your Business: Dissolution Guide",
					date: "31.03.2022",
					description:
						"Annual payments and meeting state and federal obligations can be difficult for an inactive company. You may decide to close a company that you do not use so that dissolving may rescue you from taxes and registered agent debts.",
					image: "blog1",
				},
				{
					id: 2,
					title: "EIN Letter From IRS: Everything You Need to Know",
					date: "26.03.2022",
					description:
						"If you lose your EIN confirmation letter, how to get an EIN verification letter from the IRS is clarified.",
					image: "blog2",
				},
				{
					id: 3,
					title: "Federal Income Tax in Six Questions",
					date: "14.03.2022",
					description:
						"The federal tax is one of the main tax categories in the United States, which is directly levied by IRS over the annual taxable income of individuals and legal entities.",
					image: "blog3",
				},
				{
					id: 4,
					title: "Close Your Business: Dissolution Guide",
					date: "31.03.2022",
					description:
						"Annual payments and meeting state and federal obligations can be difficult for an inactive company. You may decide to close a company that you do not use so that dissolving may rescue you from taxes and registered agent debts.",
					image: "blog1",
				},
				{
					id: 5,
					title: "EIN Letter From IRS: Everything You Need to Know",
					date: "26.03.2022",
					description:
						"If you lose your EIN confirmation letter, how to get an EIN verification letter from the IRS is clarified.",
					image: "blog2",
				},
				{
					id: 6,
					title: "Federal Income Tax in Six Questions",
					date: "14.03.2022",
					description:
						"The federal tax is one of the main tax categories in the United States, which is directly levied by IRS over the annual taxable income of individuals and legal entities.",
					image: "blog3",
				},
			],
		};
	},
};
</script>
<style scoped>
</style>
