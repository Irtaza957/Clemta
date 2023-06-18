<template>
	<div
		class="relative flex flex-col justify-between border border-black border-t-0 rounded-3xl pt-12 h-full px-6 pb-6">
		<div :class="service.color" class="absolute top-0 left-0 w-full services rounded-t-3xl h-5"></div>

		<img :src="require('@/assets/img/pages/homepage/' + service.image)" alt="" class="w-12" />
		<div class="flex flex-col justify-between mt-6">
			<h1 class="text-xl font-semibold">{{ service.title }}</h1>
			<p class="text-sm my-4">{{ service.detail }}</p>
			<div class="flex items-cnenter gap-3 text-xs font-semibold cursor-pointer">
				Learn More
				<img src="@/assets/img/pages/homepage/arrow-right.svg" alt="" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		service: {
			type: Object,
			default: {},
		},
	},
};
</script>

<style scoped>
.services {
	transform: scale(1.01);
}
</style>
