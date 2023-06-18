<template>
	<div class="md:my-20 my-16 text-blackish">
		<Container :padding="'xl:px-32'">
			<h1 class="flex-shrink-0 lg:text-5xl md:text-4xl text-3xl font-bold text-normalBlue">
				Frequently Asked <br /><span class="text-blackish">Questions</span>
			</h1>
			<!--  -->
			<div class="md:mt-16 mt-12">
				<div v-for="(list, index) in questions" :key="index"
					:class="index === questions.length - 1 && 'border-b'"
					class="border-t border-gray-300 pt-5 pb-4 sm:px-6">
					<div class="flex justify-between items-center gap-10 cursor-pointer mb-1"
						@click="toggleQuestions(list)">
						<h2 class="font-semibold">
							{{ list.question }}
						</h2>
						<img src="@/assets/img/pages/dashboard/homepage/arrow-right.svg" alt=""
							:class="showAnswer === list ? '-rotate-90' : 'rotate-90'"
							class="sm:block hidden transform transition-all duration-200 ease-linear" />
					</div>
					<transition name="slide">
						<p v-if="showAnswer === list" class="sm:w-10/12 w-full sm:text-base text-sm">
							{{ list.answer }}
						</p>
					</transition>
				</div>
			</div>
		</Container>
	</div>
</template>
<script>
export default {
	layout: "base-layout",
	data: () => ({
		showAnswer: "",
		questions: [
			{
				id: 1,
				question:
					"What taxes does a limited liability company pay to Delaware?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 2,
				question:
					"Does the limited liability company have to do business in Delaware?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 3,
				question: "What is a General Corporation in Delaware?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 4,
				question:
					"How is forming a corporation or LLC important for attracting investors?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 5,
				question: "What Is Delaware Franchise Tax?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 6,
				question: "What is Par Value?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 7,
				question: "What par value should I place on my stock?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
			{
				id: 8,
				question: "What is no-par stock?",
				answer:
					"No-par stock is stock that is essentially issued without a face value. It can be issued to shareholders without the exchange of funds, goods or services.Having no par value will not restrict the selling of your shares to investors at the price determined by the Board of Directors and accepted by the investor (just like shares that do have a par value).It should be noted that some U.S. states do not allow corporations to issue no-par stock.Fortunately, Delaware is not one of those states. The Delaware Division of Corporations allows Delaware general corporations to hold up to to 1,500 shares of no-par stock fee-free.",
			},
		],
	}),
	methods: {
		toggleQuestions(val) {
			val === this.showAnswer
				? (this.showAnswer = "")
				: (this.showAnswer = val);
		},
	},
};
</script>
<style scoped>
/* Slide Transition */
.slide-enter-active {
	-moz-transition-duration: 0.5s;
	-webkit-transition-duration: 0.5s;
	-o-transition-duration: 0.5s;
	transition-duration: 0.5s;
	-moz-transition-timing-function: ease-in-out;
	-webkit-transition-timing-function: ease-in-out;
	-o-transition-timing-function: ease-in-out;
	transition-timing-function: ease-in-out;
}

.slide-leave-active {
	-moz-transition-duration: 0.3s;
	-webkit-transition-duration: 0.3s;
	-o-transition-duration: 0.3s;
	transition-duration: 0.3s;
	-moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	-webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	-o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
	max-height: 800px;
	overflow: hidden;
}

.slide-enter,
.slide-leave-to {
	overflow: hidden;
	max-height: 0;
}
</style>
