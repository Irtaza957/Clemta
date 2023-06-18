<template>
	<Container>
		<div class="bg-white rounded-xl p-5 mt-6">
			<div :class="showSmallList && 'mb-0'" class="w-full overflow-x-scroll overflow-y-clip">
				<!-- Top Options -->

				<div v-if="!showSmallList" class="w-full flex items-center gap-5 ml-2 pr-2">
					<div class="flex-shrink-0 flex items-center">
						<div class="flex-shrink-0 transform translate-y-4">
							<img src="@/assets/img/pages/dashboard/taxation/arrow-down-line.svg" alt="" />
						</div>

						<div
							class="batch-option relative flex-shrink-0 flex justify-between items-center gap-5 bg-lighterBlue py-3.5 px-4 rounded-md text-xs w-max mr-3">
							<p>Batch Action</p>
							<img src="@/assets/img/pages/login/arrow-down.svg"
								class="transition-all duration-200 ease-linear" />

							<div class="batch-option-list hidden absolute top-full left-0 w-full rounded-md pt-2">
								<div class="rounded-md bg-lighterBlue border border-gray-400 py-3">
									<div @click="isBatchLabel = true"
										class="px-3 py-2 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-linear">
										Label
										<span v-if="selectedBookkeeping.length">({{ selectedBookkeeping.length
										}})</span>
									</div>
									<div
										class="px-3 py-2 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-linear">
										Add
										<span v-if="selectedBookkeeping.length">({{ selectedBookkeeping.length
										}})</span>
									</div>
									<div @click="isBatchRemove = true"
										class="px-3 py-2 hover:bg-gray-200 cursor-pointer transition-all duration-200 ease-linear">
										Remove
										<span v-if="selectedBookkeeping.length">({{ selectedBookkeeping.length
										}})</span>
									</div>

									<div v-if="!selectedBookkeeping.length"
										class="absolute top-0 left-0 h-full w-full rounded-md cursor-not-allowed"></div>
								</div>
							</div>
						</div>

						<button :class="labeledDisable ? 'bg-lighterBlue' : 'bg-lightestBlue'"
							class="flex-shrink-0 w-max text-center py-3.5 px-4 rounded-md cursor-pointer text-xs mr-3"
							@click="labeledHandler">
							Labeled ({{ labelCount }})
						</button>

						<button :class="uncategorizedDisable ? 'bg-pink-100' : 'bg-lightPink'"
							class="flex-shrink-0 w-max text-center py-3.5 px-4 rounded-md cursor-pointer text-xs"
							@click="uncategorizedHandler">
							Uncategorized ({{ uncategorizedCount }})
						</button>
					</div>
					<div class="flex-shrink-0 flex-grow flex items-center gap-3">
						<div
							class="relative flex-shrink-0 flex-grow w-48 flex items-center gap-2 bg-lighterBlue rounded-md text-xs px-4">
							<img src="@/assets/img/pages/dashboard/taxation/search.svg" class="cursor-pointer" />
							<input v-model="term" type="text" placeholder="search here..."
								class="bg-transparent outline-none py-3.5 px-2" @focus="isSearching = true"
								@keyup="debounce" />
							<div v-if="isSearching && labels.length"
								class="search-results h-32 overflow-y-scroll scrollbar-none absolute top-full left-0 w-full bg-lighterBlue border border-gray-400 rounded-bl-md rounded-br-md py-3 z-10">
								<p v-for="(result, index) in labels" :key="index"
									class="px-4 py-2 hover:bg-lightBlue cursor-pointer transition-all duration-200 ease-linear"
									@click="selectedLabel(result)">
									{{ result.title }}
								</p>
							</div>
						</div>
						<button :class="labelSelected ? 'bg-lighterBlue' : 'bg-lightestBlue'"
							class="flex-shrink-0 w-max text-center py-3.5 px-4 rounded-md cursor-pointer text-xs"
							:disabled='labelSelected'>
							Label Selected
						</button>
						<div class="flex-shrink-0 w-max text-center bg-blackish text-white py-3 px-8 rounded-full cursor-pointer text-xs uppercase outline-none"
							@click="isManualTransaction = true">
							Add Manually
						</div>
					</div>
				</div>

				<!-- Table Bookkeeping -->

				<div :class="!showSmallList && 'mt-6'" class="">
					<!-- Headings -->

					<div :class="!showSmallList && 'pr-20'"
						class="w-full flex items-center text-xs font-semibold uppercase py-3">
						<div>
							<div v-if="!showSmallList"
								class="flex-shrink-0 h-5 w-5 mr-4 pt-1 pl-0.5 border border-gray-400 rounded-sm cursor-pointer"
								@click="allBookKeeping">
								<img v-if="checkeAll" class="check"
									src="@/assets/img/pages/dashboard/taxation/Vector.svg" />
							</div>
						</div>
						<div class="flex-shrink-0 flex-grow w-28 px-3">Date</div>
						<div class="flex-shrink-0 flex-grow w-44 px-3">Description</div>
						<div class="flex-shrink-0 flex-grow w-28 px-3">Payee</div>
						<div class="flex-shrink-0 flex-grow w-48 px-3">Category</div>
						<div class="flex-shrink-0 flex-grow w-24 px-3">Spent</div>
						<div class="flex-shrink-0 flex-grow w-24 px-3">Received</div>
					</div>

					<!-- Records -->
					<div class="w-full">
						<div v-for="(book, index) in bookkeepingList" :key="index"
							class="w-full flex items-center my-2">
							<div v-if="!showSmallList"
								class="flex-shrink-0 h-5 w-5 mr-4 pt-1 pl-0.5 border border-gray-400 rounded-sm cursor-pointer"
								@click="toggleBookkeeping(book)">
								<img v-if="selectedBookkeeping.includes(book)"
									src="@/assets/img/pages/dashboard/taxation/Vector.svg" />
							</div>
							<div class="min-w-max w-full flex items-center bg-lighterBlue rounded-md text-xs">
								<div class="flex-shrink-0 flex-grow w-28 px-3 py-4">
									{{ $moment((new Date(book.date * 1000))).format("DD-MM-YYYY") }}
								</div>
								<div class="flex-shrink-0 flex-grow w-44 px-3 py-4">
									{{ book.description }}
								</div>
								<div class="flex-shrink-0 flex-grow w-28 px-3 py-4">
									{{ book.payee }}
								</div>
								<div
									class="category flex-shrink-0 flex-grow flex items-center justify-between bg-lightestBlue rounded-md relative cursor-pointer transition-all duration-200 ease-linear w-48 px-3 py-4">
									Category

									<img src="@/assets/img/pages/login/arrow-down.svg"
										class="transition-all duration-200 ease-linear" />
									<div
										class="category-options hidden absolute top-3/4 left-0 w-full bg-white p-1 rounded-md z-10">

									</div>
								</div>
								<div class="flex-shrink-0 flex-grow w-24 px-3 py-4">
									{{ book.type === 'spent' ? `$${book.amount}` : '' }}
								</div>
								<div class="flex-shrink-0 flex-grow w-24 px-3 py-4">
									{{ book.type === 'received' ? `$${book.amount}` : '' }}
								</div>
							</div>
							<button v-if="!showSmallList"
								class="flex-shrink-0 ml-2 p-4 w-20 bg-lightBlue rounded-md uppercase text-xs">
								Add
							</button>
						</div>
					</div>
				</div>
				<div v-if="isManualTransaction">
					<AddManualTransactionModal @close="isManualTransaction = false"
						@transactions="filterTrancastions" />
				</div>
			</div>
			<div v-if="isBatchRemove">
				<BatchRemove @batch="batch" :selectedBookkeeping="selectedBookkeeping" />
			</div>
			<div v-if="isBatchLabel">
				<BatchLabel @batch="batch" :selectedBookkeeping="selectedBookkeeping" />
			</div>
		</div>
		<template v-if="bookkeepingList.length">
			<Pagination v-if="!showSmallList" :num_page="filter.num_page" :total_pages="pagination.total_pages"
				@changePage='changePage' />
		</template>
	</Container>
</template>
<script>
import AddManualTransactionModal from './add-manual-transaction-modal.vue';
import Pagination from "../../../../ui/pagination.vue";
import { mapGetters, mapActions } from 'vuex';
import BatchRemove from './batch-remove.vue';
import BatchLabel from './batch-label.vue';
export default {
	components: {
		AddManualTransactionModal,
		Pagination,
		BatchRemove,
		BatchLabel
	},
	props: {
		showSmallList: {
			type: Number,
			default: null,
		},
	},
	data: () => ({
		isManualTransaction: false,
		isBatchRemove: false,
		checkeAll: false,
		isBatchLabel: false,
		// Book Keeping list
		bookkeepingList: [],
		pagination: {
			total_pages: 0
		},
		bookkeepingCategories: [
			{
				id: 1,
				name: "Workers's Compensation",
			},
			{
				id: 2,
				name: "Employee Benefit",
			},
			{
				id: 3,
				name: "Uncategorized",
			},
		],
		selectedBookkeeping: [],
		labels: [],
		isSearching: false,
		labelSelected: true,
		uncategorizedDisable: true,
		labeledDisable: true,
		term: '',
		filter: {
			num_page: 1,
			per_page: 10,
			labeled: null,
			uncategorized: null,
			label_id: null
		},
		labelCount: null,
		uncategorizedCount: null,
		timeout: null,
	}),
	computed: {
		...mapGetters({
			GET_CURRENT_COMPANY: "authentication/GET_CURRENT_COMPANY"
		}),
	},
	mounted() {
		this.filterTrancastions()
		if (!this.showSmallList) {
			this.autocompleteLabels()
		}
		if (this.showSmallList) {
			this.bookkeepingList = this.bookkeepingList.filter(
				(arr, index) => index < this.showSmallList && arr
			);
		}
	},
	methods: {
		...mapActions({
			FILTLER_TRANSACTIONS: 'bookKeeping/FILTLER_TRANSACTIONS',
			AUTOCOMPLETE_LABELS: 'bookKeeping/AUTOCOMPLETE_LABELS'
		}),
		batch() {
			this.filterTrancastions()
			this.selectedBookkeeping = []
			this.isBatchLabel = false
			this.isBatchRemove = false
		},

		changePage(val) {
			switch (val) {
				case 0: this.filter.num_page = 1; break;
				case -1: this.filter.num_page = this.filter.num_page > 1 ? this.filter.num_page - 1 : this.filter.num_page; break;
				case 1: this.filter.num_page = this.filter.num_page < this.pagination.total_pages ? this.filter.num_page + 1 : this.filter.num_page; break;
				case this.pagination.total_pages: this.filter.num_page = this.pagination.total_pages; break;
			}
			this.filterTrancastions()
		},

		filterTrancastions() {
			let filterParams = `per_page=${this.filter.per_page}&num_page=${this.filter.num_page}`
			if (this.filter.labeled) {
				filterParams += `&labeled=${this.filter.labeled}`
			}
			if (this.filter.uncategorized) {
				filterParams += `&uncategorized=${this.filter.uncategorized}`
			}
			if (this.filter.label_id) {
				filterParams += `&label_id=${this.filter.label_id}`
			}
			this.FILTLER_TRANSACTIONS({ company_id: this.GET_CURRENT_COMPANY.id, filter: filterParams })
				.then(response => {
					if (response.data.transactions) {
						this.bookkeepingList = response.data.transactions
					}
					else {
						this.bookkeepingList = []
					}
					this.pagination.total_pages = response.data.pagination.total_pages
					this.labelCount = response.data['count-labeled']
					this.uncategorizedCount = response.data['count-uncategorized']
				})
		},

		autocompleteLabels() {
			let filterParams = `term=A`
			if (this.term) {
				filterParams = `term=${this.term}`
			}
			this.AUTOCOMPLETE_LABELS({ filter: filterParams })
				.then(response => {
					this.labels = response.data.labels
				})
		},
		labeledHandler() {
			this.labeledDisable = !this.labeledDisable
			this.filter.labeled = !this.filter.labeled
			this.filterTrancastions()
		},

		uncategorizedHandler() {
			this.uncategorizedDisable = !this.uncategorizedDisable
			this.filter.uncategorized = !this.uncategorizedDisable
			this.filterTrancastions()
		},

		selectedLabel(result) {
			this.term = result.title
			this.labelSelected = false
			this.filter.label_id = result.id
			this.filterTrancastions()
		},
		// All select bookkeeping
		allBookKeeping() {
			this.checkeAll = !this.checkeAll
			if (this.checkeAll === true) {
				this.selectedBookkeeping = this.bookkeepingList
			} else {
				this.selectedBookkeeping = [];
			}
		},

		// Select bookkeeping
		toggleBookkeeping(book) {
			if (!this.selectedBookkeeping.includes(book)) {
				this.selectedBookkeeping.push(book);
			} else {
				this.selectedBookkeeping = this.selectedBookkeeping.filter(
					(arr) => arr !== book
				);
			}
		},

		// Fetch search results
		debounce(e) {
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => {
				this.autocompleteLabels()
			}, 3000)

		},
	},
};
</script>
<style scoped>
/*   Batch options  */
.batch-option:hover>img {
	transform: rotate(-180deg);
}

.batch-option:hover .batch-option-list {
	display: block;
	animation: dropDown 0.2s linear forwards;
}

/*   Search results section   */
.search-results {
	animation: slideDown 0.2s linear forwards;
}

/*   Category Dropdown  */
.category:hover .category-options {
	display: block;
	animation: dropDown 0.2s linear forwards;
}

.category:hover>img {
	transform: rotate(-180deg);
}

.scrollbar-none {
	-ms-overflow-style: none;
	scrollbar-width: none;
}

.scrollbar-none::-webkit-scrollbar {
	display: none;
}

/* _______________________________________ */
/*            Animation Section            */

@keyframes dropDown {
	0% {
		opacity: 0;
		transform: translateY(-1rem) scale(0.8);
	}

	100% {
		opacity: 1;
		transform: translateY(0) scale(1);
	}
}

@keyframes slideDown {
	0% {
		opacity: 0;
		transform: translateY(-1rem);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
