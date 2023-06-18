<template>
	<div class="bg-white lg:p-6 px-4 py-6 rounded-xl" :class="!GET_CURRENT_COMPANY && 'blur-sm pointer-events-none'">
		<!-- Top heading -->
		<div class="flex justify-between items-center pl-4">
			<div class="flex items-center gap-3">
				<img src="@/assets/img/pages/dashboard/homepage/company.svg" class="w-5" />
				<h1 class="text-sm uppercase font-semibold">Company details</h1>
			</div>
			<div
				class="hidden lg:flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full cursor-pointer">
				<p class="text-xs font-semibold">See Details</p>
				<img src="@/assets/img/pages/dashboard/homepage/arrow-right.svg" />
			</div>
		</div>
		<!-- Middle section -->
		<div v-if="GET_CURRENT_COMPANY" class="bg-lighterBlue bg-opacity-60 rounded-lg px-4 py-5 my-5">
			<h1 class="text-xl font-semibold">{{ GET_CURRENT_COMPANY.name }}, {{ GET_CURRENT_COMPANY.type }}</h1>
			<p class="text-sm mt-0.5">{{ GET_CURRENT_COMPANY.billing_address.zipcode }}
				{{ GET_CURRENT_COMPANY.billing_address.addr1 }} {{ GET_CURRENT_COMPANY.billing_address.addr2 }},
				{{ GET_CURRENT_COMPANY.billing_address.city }}, {{ GET_CURRENT_COMPANY.billing_address.country }}</p>
		</div>
		<!-- Bottom section -->
		<div class="pl-4 mt-8">
			<div v-for="(detail, index) in companyDetails" :key="index" class="grid grid-cols-2 text-sm my-5">
				<p>{{ detail.name }}:</p>
				<p class="font-semibold">{{ detail.value }}</p>
			</div>
		</div>
		<div
			class="w-max ml-auto lg:hidden flex items-center gap-3 bg-lightestBlue bg-opacity-70 py-2.5 px-4 rounded-full cursor-pointer mt-3">
			<p class="text-xs font-semibold">See Details</p>
			<img src="@/assets/img/pages/dashboard/homepage/arrow-right.svg" />
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
	data: () => ({
		companyDetails: [],
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
	},
	mounted() {
		this.getCompanyDetails()
	},
	methods: {
		...mapActions({
			ORDER_SPECIFIC_COMPANY: 'myCompany/ORDER_SPECIFIC_COMPANY',
		}),
		getCompanyDetails() {
			if (this.GET_CURRENT_COMPANY) {
				this.ORDER_SPECIFIC_COMPANY()
					.then(response => {
						if (response.data.data && response.data.data.length) {
							this.companyDetails = response.data.data
						}
						else {
							this.companyDetails = []
						}
					})
			}
		}
	}
};
</script>