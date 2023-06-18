<template>
	<Container>
	<div>
		<div class="my-6">
			<div class="flex justify-between gap-3 overflow-x-scroll scrollbar-none items-center md:px-0 px-5">
				<div
					class="flex-shrink-0 flex justify-between items-center gap-4 bg-normalBlue text-white rounded-full cursor-pointer p-1.5">
					<div class="bg-white sm:h-8 h-7 sm:w-8 w-7 rounded-full p-0.5 flex justify-center items-center">
						<img src="@/assets/img/pages/dashboard/service/info-blue.svg" alt="" />
					</div>
					<p class="text-xs">Available Upgrades</p>
					<div
						class="sm:h-8 h-7 sm:w-8 w-7 rounded-full p-2 flex justify-center items-center border border-white text-xs">
						3
					</div>
				</div>
				<div class="flex-shrink-0 flex items-center gap-3" :class="!All_SERVICES.length ? 'pointer-events-none': null">
					<div @click="completed= false" :class="completed ? 'opacity-50': 'opacity-100'"
						class="flex items-center bg-normalBlue text-white rounded-full cursor-pointer p-1.5">
						<div class="bg-white sm:h-8 h-7 sm:w-8 w-7 rounded-full p-0.5 flex justify-center items-center">
							<img src="@/assets/img/pages/dashboard/service/progress.svg" alt="" />
						</div>
						<p class="text-xs ml-4 mr-5">In Progress</p>
					</div>
					<div @click="completed= true" :class="completed === false ? 'opacity-50': 'opacity-100'"
						class="flex items-center bg-normalBlue text-white rounded-full cursor-pointer p-1.5">
						<div class="bg-white sm:h-8 h-7 sm:w-8 w-7 rounded-full p-0.5 flex justify-center items-center">
							<img src="@/assets/img/pages/dashboard/service/check.svg" alt="" />
						</div>
						<p class="text-xs ml-4 mr-5">Completed</p>
					</div>
				</div>
			</div>
			<div v-if="All_SERVICES.length">
			<!-- completed services -->
			<div v-for="(service, index) in All_SERVICES" :key="index">
				<div v-if="check(service.steps) && completed" class="flex flex-col lg:flex-row justify-between lg:gap-20 gap-12 bg-white rounded-xl sm:p-7 p-5 py-7 my-6">
				<div class="flex-shrink-0 lg:w-1/4 sm:w-10/12 w-full">
					<div>
						<img src="@/assets/img/pages/dashboard/service/formation.svg" alt="" />
					</div>
					<div>
						<h1 class="text-2xl font-extrabold mt-6 mb-5">
							{{ service.name }}
						</h1>
						<p>
							{{ service.description }}
						</p>
					</div>
				</div>

				<div class="w-full flex flex-col justify-between gap-6">
					<div
						class="flex sm:grid grid-cols-5 overflow-x-scroll scrollbar-none w-full lg:mb-0 mb-2 lg:pb-0 pb-2">
						<div v-for="(step, index) in steps(service.steps)" :key="index" class="flex items-start">
							<div class="flex-shrink-0 flex flex-col items-center w-20">
								<div
									class="flex-shrink-0 flex justify-center items-center sm:h-12 h-10 sm:w-12 w-10 rounded-full bg-white border border-normalBlue sm:p-2 p-2.5">
									<div v-if="step.status === 'completed'">
										<img src="@/assets/img/pages/dashboard/service/check-lg.svg" alt="" />
									</div>
									<div v-else-if="
									  step.status === 'progress' || step.status === 'open'
									">
										<div
											class="border-2 border-normalBlue flex-shrink-0 flex justify-center items-center sm:h-12 h-10 sm:w-12 w-10 rounded-full bg-white transition duration-200 ease-linear sm:p-2 p-2.5">
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
								<svg width="50" height="50" viewBox="0 0 50 50" fill="none"
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
										<filter id="filter0_b_3467_5874" x="-34" y="-34" width="118" height="118"
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
								<svg width="50" height="50" viewBox="0 0 50 50" fill="none"
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
					<div>
						<div v-if="check(service.steps)"
							class="bg-lightestBlue flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-2 sm:py-4 py-3 sm:px-7 px-4 rounded-xl">
							<h1
								class="py-2 pr-8 sm:mb-0 mb-1 text-lg font-extrabold sm:border-r sm:border-b-0 border-b border-lightGreen">
								Congratulations!
							</h1>
							<p>
								You are all set. <br />
								Still have questions?
								<span class="font-semibold cursor-pointer">Contact our team.</span>
							</p>
						</div>
						<div v-else
							class="bg-white border border-blackish flex flex-col sm:flex-row sm:items-center gap-5 py-3 px-4 rounded-xl">
							<h1
								class="py-3 pr-4 text-lg font-extrabold sm:border-r sm:border-b-0 border-b border-blackish">
								Waiting for approval
							</h1>
							<p>
								All your work is done, waiting for approval of IRC. <br />
								Still have questions?
								<span class="font-semibold text-normalBlue cursor-pointer">Contact our team.</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			</div>
			<!-- In-progress Services -->
			<div v-for="service in All_SERVICES" :key="service.name">
				<div v-if="!check(service.steps) && !completed" class="flex flex-col lg:flex-row justify-between lg:gap-20 gap-12 bg-white rounded-xl sm:p-7 p-5 py-7 my-6">
				<div class="flex-shrink-0 lg:w-1/4 sm:w-10/12 w-full">
					<div>
						<img src="@/assets/img/pages/dashboard/service/formation.svg" alt="" />
					</div>
					<div>
						<h1 class="text-2xl font-extrabold mt-6 mb-5">
							{{ service.name }}
						</h1>
						<p>
							{{ service.description }}
						</p>
					</div>
				</div>

				<div class="w-full flex flex-col justify-between gap-6">
					<!-- Stepper -->
					<div
						class="flex sm:grid grid-cols-5 overflow-x-scroll scrollbar-none w-full lg:mb-0 mb-2 lg:pb-0 pb-2">
						<div v-for="(step, index) in steps(service.steps)" :key="index" class="flex items-start">
							<div class="flex-shrink-0 flex flex-col items-center w-20">
								<div
									class="flex-shrink-0 flex justify-center items-center sm:h-12 h-10 sm:w-12 w-10 rounded-full bg-white border border-normalBlue sm:p-2 p-2.5">
									<div v-if="step.status === 'completed'">
										<img src="@/assets/img/pages/dashboard/service/check-lg.svg" alt="" />
									</div>
									<div v-else-if="
									  step.status === 'progress' || step.status === 'open'
									">
										<div
											class="border-2 border-normalBlue flex-shrink-0 flex justify-center items-center sm:h-12 h-10 sm:w-12 w-10 rounded-full bg-white transition duration-200 ease-linear sm:p-2 p-2.5">
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
								<svg width="50" height="50" viewBox="0 0 50 50" fill="none"
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
										<filter id="filter0_b_3467_5874" x="-34" y="-34" width="118" height="118"
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
								<svg width="50" height="50" viewBox="0 0 50 50" fill="none"
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
					<div>
						<div v-if="check(service.steps)"
							class="bg-lightestBlue flex flex-col sm:flex-row sm:items-center sm:gap-8 gap-2 sm:py-4 py-3 sm:px-7 px-4 rounded-xl">
							<h1
								class="py-2 pr-8 sm:mb-0 mb-1 text-lg font-extrabold sm:border-r sm:border-b-0 border-b border-lightGreen">
								Congratulations!
							</h1>
							<p>
								You are all set. <br />
								Still have questions?
								<span class="font-semibold cursor-pointer">Contact our team.</span>
							</p>
						</div>
						<div v-else
							class="bg-white border border-blackish flex flex-col sm:flex-row sm:items-center gap-5 py-3 px-4 rounded-xl">
							<h1
								class="py-3 pr-4 text-lg font-extrabold sm:border-r sm:border-b-0 border-b border-blackish">
								Waiting for approval
							</h1>
							<p>
								All your work is done, waiting for approval of IRC. <br />
								Still have questions?
								<span class="font-semibold text-normalBlue cursor-pointer">Contact our team.</span>
							</p>
						</div>
					</div>
				</div>
			</div>
			</div>
		    </div>
			<div v-else>
			<NotFound class="py-8" heading="No Service Found" description="Unfortunatly You don't Have Any Service Yet." />
		</div>
		</div>
	</div>
</Container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Container from '../../../components/ui/Container.vue';
export default {
  components: { Container },
	layout: "dashboard-layout",

	data: () => ({
		completed: false,
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
