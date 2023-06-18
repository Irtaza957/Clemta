<template>
	<div class="bg-white lg:p-6 p-4 py-6 rounded-xl">
		<!-- Top heading -->
		<div class="flex justify-between items-center pl-4">
			<div class="flex items-center gap-3">
				<img src="@/assets/img/pages/dashboard/homepage/service.svg" class="w-5" />
				<h1 class="text-sm uppercase font-semibold">Service Progress</h1>
			</div>
			<div
				class="hidden lg:flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full cursor-pointer">
				<p class="text-xs font-semibold">Complete the Tasks</p>
				<img src="@/assets/img/pages/dashboard/homepage/arrow-right.svg" />
			</div>
		</div>
		<div v-if="All_SERVICES.length">
		<div v-for="(service,index) in All_SERVICES" :key="index">
		<!-- Middle section -->
		<div v-if="slideIndex===index">
		<div class="flex items-center justify-center my-12">
			<div class="cursor-pointer" @click="handleSlider('left')">
				<img src="@/assets/img/pages/dashboard/homepage/arrow-left-circle.svg" class="w-9" />
			</div>
			<div class="text-xl font-semibold w-44 text-center truncate px-3">
				{{service.name}}
			</div>
			<div class="cursor-pointer" @click="handleSlider('right')">
				<img src="@/assets/img/pages/dashboard/homepage/arrow-right-circle.svg" class="w-9" />
			</div>
		</div>

		<div class="bg-lightestBlue bg-opacity-40 px-4 py-9 rounded-xl w-full flex flex-col justify-between gap-6">
					<!-- Stepper -->
					<div
						class="flex sm:grid grid-cols-5 overflow-x-scroll scrollbar-none w-full lg:mb-0 mb-2 lg:pb-0 pb-2">
						<div v-for="(step, index) in steps(service.steps)" :key="index" class="flex items-start">
							<div class="flex-shrink-0 flex flex-col items-center w-20">
								<div
									class="flex-shrink-0 flex justify-center items-center sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-white border border-normalBlue sm:p-1.5 p-2">
									<div v-if="step.status === 'completed'">
										<img src="@/assets/img/pages/dashboard/service/check-lg.svg" alt="" />
									</div>
									<div v-else-if="
									  step.status === 'progress' || step.status === 'open'
									">
										<div
											class="border-2 border-normalBlue flex-shrink-0 flex justify-center items-center sm:h-10 h-8 sm:w-10 w-8 rounded-full bg-white transition duration-200 ease-linear sm:p-1.5 p-2">
											<p class="font-semibold text-normalBlue">
												{{ index + 1 }}
											</p>
										</div>
									</div>
								</div>
								<p class="text-sm text-center w-max truncate capitalize mt-3">
									{{ step.name }}
								</p>
							</div>
							<div class="bg-lightGreen h-px sm:w-full w-12 mt-6"></div>
						</div>
						<div class="ml-3">
							<div v-if="check(service.steps)">
								<svg width="40" height="40" viewBox="0 0 50 50" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g filter="url(#filter0_b_3467_5874)">
										<path
											d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z"
											fill="#0D659D" />
										<path
											d="M0.5 25C0.5 11.469 11.469 0.5 25 0.5C38.531 0.5 49.5 11.469 49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.5 38.531 0.5 25Z"
											stroke="#0D659D" />
									</g>
									<path d="M35 17L21.25 32L15 25.1818" stroke="white" stroke-width="2"
										stroke-linecap="round" stroke-linejoin="round" />
									<defs>
										<filter id="filter0_b_3467_5874" x="-34" y="-34" width="100" height="100"
											filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
											<feFlood flood-opacity="0" result="BackgroundImageFix" />
											<feGaussianBlur in="BackgroundImage" stdDeviation="17" />
											<feComposite in2="SourceAlpha" operator="in"
												result="effect1_backgroundBlur_3467_5874" />
											<feBlend mode="normal" in="SourceGraphic"
												in2="effect1_backgroundBlur_3467_5874" result="shape" />
										</filter>
									</defs>
								</svg>
								<p class="text-sm text-center w-max truncate capitalize mt-3">
									Completed
								</p>

							</div>
							<div v-else>
								<svg width="40" height="40" viewBox="0 0 50 50" fill="none"
									xmlns="http://www.w3.org/2000/svg">
									<g opacity="0.3">
										<g filter="url(#filter0_b_3467_5817)">
											<path
												d="M0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25Z"
												fill="#0D659D" />
											<path
												d="M0.5 25C0.5 11.469 11.469 0.5 25 0.5C38.531 0.5 49.5 11.469 49.5 25C49.5 38.531 38.531 49.5 25 49.5C11.469 49.5 0.5 38.531 0.5 25Z"
												stroke="#0D659D" />
										</g>
										<path d="M31 33.3333V22.5" stroke="white" stroke-width="2"
											stroke-linecap="round" stroke-linejoin="round" />
										<path d="M24.5 33.3333V16" stroke="white" stroke-width="2"
											stroke-linecap="round" stroke-linejoin="round" />
										<path d="M18 33.333V26.833" stroke="white" stroke-width="2"
											stroke-linecap="round" stroke-linejoin="round" />
									</g>
									<defs>
										<filter id="filter0_b_3467_5817" x="-34" y="-34" width="118" height="118"
											filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
											<feFlood flood-opacity="0" result="BackgroundImageFix" />
											<feGaussianBlur in="BackgroundImage" stdDeviation="17" />
											<feComposite in2="SourceAlpha" operator="in"
												result="effect1_backgroundBlur_3467_5817" />
											<feBlend mode="normal" in="SourceGraphic"
												in2="effect1_backgroundBlur_3467_5817" result="shape" />
										</filter>
									</defs>
								</svg>
								<p class="text-sm text-center w-max truncate capitalize mt-3">
									In Progress
								</p>
							</div>
						</div>
					</div>
		</div>
	</div>
	</div>
	</div>
	<div v-else>
		<NotFound heading="No Service Found" description="Unfortunatly You don't Have Any Service Yet." />
	</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data: () => ({
		slideIndex: 0,
	}),
	mounted() {
		this.getServices();
	},
	computed:{
		...mapGetters({
			All_SERVICES: "serviceProgress/All_SERVICES",
		}),
	},
	methods: {
		...mapActions({
			GET_SERVICES: "serviceProgress/GET_SERVICES",
		}),
		getServices() {
			this.GET_SERVICES()
				.then((response) => {})
				.catch((error) => {
					this.$toast.error({
						title: "Error",
						message: error.message,
					});
				});
		},
		handleSlider(direction){
        if(direction==="left"){
            this.slideIndex > 0 ? this.slideIndex-=1 : this.slideIndex=2
        }
        else{
            this.slideIndex < 2 ? this.slideIndex+=1 : this.slideIndex=0
        }
		},
		check(steps) {
			let check = true
			steps.forEach(step => {
				if (step.status === 'progress' || step.status === 'open') {
					check = false
					return
				}
			});
			return check
		},
		steps(step) {
			if (step.length > 4) {
				return step.slice(-4)
			} else {
				return step
			}
		}
	},
};
</script>
