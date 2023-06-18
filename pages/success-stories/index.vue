<template>
	<div class="md:my-20 my-16">
		<Container :padding="'xl:px-32'">
			<h1 class="flex-shrink-0 lg:text-5xl md:text-4xl text-3xl font-bold text-normalBlue">
				Success <span class="text-blackish">Stories</span>
			</h1>
			<!--  -->
			<div class="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 md:mt-16 mt-12">
				<div v-for="(story, index) in realStories" :key="index"
					class="border-2 border-gray-300 rounded-3xl p-6">
					<div class="flex items-center flex-wrap gap-4">
						<img :src="require(`@/assets/img/pages/homepage/${story.image}`)" alt="" class="w-20" />
						<p class="text-sm font-semibold">{{ story.title }}</p>
					</div>
					<p class="mt-5 text-sm">{{ story.description }}</p>
				</div>
			</div>
		</Container>
	</div>
</template>
<script>
export default {
	layout: "base-layout",
	data: () => ({
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
};
</script>
<style scoped>
</style>
