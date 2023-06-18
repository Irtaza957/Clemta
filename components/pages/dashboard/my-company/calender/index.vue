<template>
	<div class="grid md:grid-cols-12 grid-cols-1 gap-6 bg-white p-7 pb-0 border-t border-gray=300">
		<div class="md:col-span-5 col-span-1">
			<DatePicker :attributes="attributes" @moveTo="setCurrentDate" />
		</div>
		<div class="md:col-span-7 col-span-1 flex flex-col gap-3 rounded-lg bg-lighterBlue px-6 pt-4 h-96">
			<button class="text-xs font-semibold py-2.5 px-6 bg-normalBlue text-white w-max ml-auto rounded-full"
				@click="addIssueModal = true">
				Add Issue
			</button>
			<div v-if="issues.length && !loading" class="events-section max-h-full overflow-y-scroll pb-2 h-full">
				<div>
					<div v-for="(issue, index) in issues" :key="index" class="mb-6 flex w-full">
						<div class="flex-1">
							<p class="text-sm font-semibold">
								{{ $moment(new Date(issue.issue_date * 1000).toISOString(true)).format("DD-MMMM-YYYY") }}
							</p>
							<p>{{ issue.description }}</p>
						</div>
					</div>
				</div>
			</div>
			<div v-else-if="loading">
				<IssueSkeleton />
			</div>
			<div v-else>
				<NotFound heading="No Issue" description="No Issue Created For This Month..." class="mt-0 p-5" />
			</div>
		</div>
		<!-- Add ISSUE MODAL -->
		<div v-if="addIssueModal">
			<addIssueModel @addAndClose="close()" @close="addIssueModal = false" @getIssue="(n) => addToAllIssues(n)"
				:attributes="attributes" />
		</div>
	</div>
</template>
<script>
import { mapActions } from "vuex";
import DatePicker from "./date-picker.vue";
import addIssueModel from "./add-issue-modal.vue";
export default {
	components: {
		DatePicker,
		addIssueModel,
	},
	data: () => ({
		addIssueModal: false,
		allIssues: [],
		issues: [],
		loading: false,
		form: {
			currentMonth: new Date().getMonth() + 1,
			currentYear: new Date().getFullYear()
		}
	}),
	computed: {
		attributes() {
			return [
				{
					highlight: {
						color: "blue",
						fillMode: "solid",
					},
					dates: new Date(),
				},
				...this.allIssues.map(issue => ({
					dates: this.$moment((new Date(issue.issue_date * 1000))).format("DD-MMMM-YYYY"),
					highlight: {
						color: "blue",
						fillMode: "light",
					},
					// popover: {
					//   label: issue.description,
					// },
				})),
			];
		},
	},
	mounted() {
		this.getIssues()
	},
	methods: {
		...mapActions({
			GET_ISSUE: "myCompany/GET_ISSUE",
		}),
		setCurrentDate(form) {
			this.form.currentMonth = form.currentMonth
			this.form.currentYear = form.currentYear
			this.getIssues()
		},
		async getIssues() {
			this.loading = true
			this.issues = []
			this.GET_ISSUE({ form: this.form })
				.then((response) => {
					this.issues = response.data.issues
					this.addToAllIssues(this.issues)
					this.loading = false
				})
		},
		addToAllIssues(issue) {
			issue.forEach((i) => {
				this.allIssues.push(i);
			});
		},
		close() {
			this.addIssueModal = false
			this.getIssues()
		}
	}
}
</script>
<style scoped>
/* width */
.events-section::-webkit-scrollbar {
	width: 8px;
	height: 0.5em;
	border-radius: 1rem;
}

/* Track */
.events-section::-webkit-scrollbar-track {
	background: transparent;
	border-radius: 1rem;
}

/* Handle */
.events-section::-webkit-scrollbar-thumb {
	background: #cbe7e8;
	border-radius: 1rem;
}
</style>
