<template>
	<div>
		<client-only>
			<v-date-picker class="calendar" v-model="date" :formats="formats" :attributes="attributes" is-expanded
				title-position="left" ref="calendar" :masks="{ title: 'MMMM', weekdays: 'WW' }">
				<a slot='header-left-button' slot-scope='{ page }' @click="prev">
					<img src="@/assets/img/pages/dashboard/my-company/arrow-left-calender.png" alt="" />
				</a>
				<a slot='header-right-button' slot-scope='{ page }' @click="next">
					<img src="@/assets/img/pages/dashboard/my-company/arrow-right-calender.png" alt="" />
				</a>
			</v-date-picker>
		</client-only>
	</div>
</template>
<script>
export default {
	props: {
		attributes: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {
			date: new Date(),
			form: {
				currentMonth: new Date().getMonth() + 1,
				currentYear: new Date().getFullYear()
			},
			formats: {
				title: 'MMMM',
				weekdays: 'WW',
			}
		}
	},
	methods: {
		prev() {
			this.form.currentMonth = this.form.currentMonth - 1
			this.form.currentYear = new Date().getFullYear()
			if (this.form.currentMonth < 1) {
				this.form.currentMonth = 12
				this.form.currentYear = new Date().getFullYear() - 1
			}
			this.$emit('moveTo', this.form)
		},
		next() {
			this.form.currentMonth = this.form.currentMonth + 1
			this.form.currentYear = new Date().getFullYear()
			if (this.form.currentMonth > 12) {
				this.form.currentMonth = 1
				this.form.currentYear = new Date().getFullYear() + 1
			}
			this.$emit('moveTo', this.form)
		}
	},
};
</script>
<style scoped>
.vc-container.vc-is-expanded {
	border: none !important;
}
</style>
