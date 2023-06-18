<template>
	<div :class="padding" class="px-8 mx-auto">
		<slot />
	</div>
</template>

<script>
export default {
	props: {
		padding: {
			type: String,
			default: "md:px-10",
		},
	},
};
</script>
