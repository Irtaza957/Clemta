<template>
	<div :class="showBorder && 'border-b border-gray-300'"
		class="flex justify-between items-center md:p-0 p-5 md:pb-5 pb-5">
		<div class="flex items-center gap-3">
			<!-- Menu icon -->
			<div class="xl:hidden flex flex-col gap-1 bg-white md:p-2 p-1.5 rounded-md cursor-pointer"
				@click="$emit('showSidebar')">
				<div class="md:h-1 h-0.5 md:w-5 w-4 bg-normalBlue rounded-xl"></div>
				<div class="md:h-1 h-0.5 md:w-7 w-5 bg-normalBlue rounded-xl"></div>
				<div class="md:h-1 h-0.5 md:w-4 w-3 bg-normalBlue rounded-xl"></div>
			</div>
			<h1 class="md:text-3xl text-xl font-semibold">{{ heading }}</h1>
		</div>
		
	</div>
</template>

<script>
export default {
	props: {
		heading: {
			type: String,
			default: "",
		},
		showBorder: {
			type: Boolean,
			default: true,
		},
	},

	
};
</script>
