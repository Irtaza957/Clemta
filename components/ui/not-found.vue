<template>
	<div class="flex justify-center items-center rounded-2xl bg-white h-full w-full mt-6 overflow-hidden">
		<div class="max-w-sm w-11/12 flex flex-col items-center">
			<div class="h-[8rem] w-[8rem] bg-gray-100 rounded-full flex justify-center items-center p-5">
				<img src="@/assets/img/pages/dashboard/service/not-found.png" alt="succes" class="w-full" />
			</div>
			<h1 class="text-normalBlue font-semibold text-center text-3xl my-3 md:my-8">
				{{ heading }}
			</h1>
			<p class="text-xl text-center mb-0 md:mb-5">
				{{ description }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		heading: {
			type: String,
			default: () => '',
		},
		description: {
			type: String,
			default: () => '',
		}
	},
}
</script>
