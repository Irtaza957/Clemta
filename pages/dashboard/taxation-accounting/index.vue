<template>
	<div>
		<div class="rounded-xl p-8 my-6">
			<div class="max-w-7xl mx-auto grid md:grid-cols-3 grid-cols-1 gap-10 md:gap-4 2xl:gap-16">
				<div v-for="(tax, index) in taxOptions" :key="index"
					class="flex flex-col items-center text-center cursor-pointer hover:bg-lightBlue hover:shadow-lg py-7 px-5 border border-transparent hover:border-gray-300 transition-all duration-200 ease-linear rounded-lg"
					@click="$router.push('/dashboard/taxation-accounting/' + tax.slug)">
					<div
						class="2xl:h-52 lg:h-48 h-40 2xl:w-52 lg:w-48 w-40 rounded-full bg-white flex justify-center items-center p-2">
						<img :src="getIcon(tax.icon)" class="lg:w-auto w-5/12" />
					</div>
					<h1 class="text-xl font-semibold mt-8 mb-6">{{ tax.name }}</h1>
					<p class="text-sm px-2 2xl:px-6">{{ tax.detail }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import federal from "@/assets/img/pages/dashboard/taxation/federal.svg";
import tax from "@/assets/img/pages/dashboard/taxation/tax.svg";
import book from "@/assets/img/pages/dashboard/taxation/book.svg";

export default {
	layout: 'dashboard-layout',

	data: () => ({
		taxOptions: [
			{
				id: 1,
				name: "Federal Tax Filing",
				detail:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
				icon: "federal.svg",
				slug: "federal-tax-filing",
			},
			{
				id: 2,
				name: "State Tax Filing",
				detail:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
				icon: "tax.svg",
				slug: "state-tax-filing",
			},
			{
				id: 3,
				name: "Bookkeeping",
				detail:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
				icon: "book.svg",
				slug: "bookkeeping",
			},
		],
	}),
	methods: {
		getIcon(name) {
			switch (name) {
				case 'federal.svg':
					return federal
				case 'tax.svg':
					return tax
				case 'book.svg':
					return book
			}
		},
	},
};
</script>

