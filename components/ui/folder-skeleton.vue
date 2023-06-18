<template>
	<div class="file-folder h-10 w-full bg-light-gray" />
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.file-folder {
	position: relative;
	overflow: hidden;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		background: linear-gradient(to right, #E4E4E4, #f3f3f3, #E4E4E4);
		animation: move 1s infinite;
	}
}

@media only screen and (max-width: 639px) {
	.file-folder {
		width: calc(75vw);
	}
}

@keyframes move {
	0% {
		transform: translateX(-50%);
	}

	100% {
		transform: translateX(100%);
	}
}
</style>
