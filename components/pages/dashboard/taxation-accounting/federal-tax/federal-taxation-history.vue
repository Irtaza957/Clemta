
<template>
	<div class="mt-14 md:px-0 px-5">
		<h1 class="md:text-2xl text-xl font-semibold mb-4">My Taxation History</h1>
		<div class="overflow-x-auto">
			<table class="min-w-max w-full flex flex-col gap-px">
				<tr class="w-full px-4 py-1">
					<th class="uppercase text-xs font-extrabold w-52 text-left">Company name</th>
					<th class="uppercase text-xs font-extrabold w-32 text-left">Filing Year</th>
					<th class="uppercase text-xs font-extrabold w-auto text-left">Shareholders</th>
				</tr>
			</table>
			<div v-if="!loader">
				<table class="min-w-max w-full flex flex-col gap-px">
					<tr v-for="(data, index) in history" :key="index"
						class="w-full bg-white bg-opacity-80 p-4 rounded-md text-sm mt-1">
						<td class="w-52">
							{{ data.company_legalname }}
						</td>
						<td class="w-32">
							{{ data.fiscal_year }}
						</td>
						<td class="w-auto" v-for="(partner, index) in data.partners" :key="index">
							<span v-if="index != 0">,</span> {{ partner.first_name }} {{ partner.last_name }}
						</td>
					</tr>
				</table>
			</div>
			<div v-else class="grid grid-cols-1 gap-4 mt-4">
				<div v-for="i in 3" :key="i">
					<div class="w-full flex items-center">
						<FolderSkeleton />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data: () => ({
		history: [],
		loader: false,
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
	},
	mounted() {
		this.taxationHistory()
	},
	methods: {
		...mapActions({
			FEDERAL_TAXATION_HISTORY: "federalTaxation/FEDERAL_TAXATION_HISTORY"
		}),
		taxationHistory() {
			this.loader = true
			this.FEDERAL_TAXATION_HISTORY({ company_id: this.GET_CURRENT_COMPANY.id })
				.then((response) => {
					this.loader = false
					if (response.data['federal-tax-history']) {
						this.history = response.data['federal-tax-history']
					}
				})
		}
	},
};
</script>
