<template>
    <Container>
        <DashboardModal :maxWidth="'max-w-4xl'" @close="$emit('close')">
            <h1 class="text-xl text-center mb-5">Add Issue</h1>
            <ValidationObserver v-slot="{ handleSubmit }">
                <form class="grid sm:grid-cols-2 sm:gap-10 " @submit.prevent="handleSubmit(onSubmit)">
                    <div>
                        <div class="flex items-center justify-center">
                            <div class="relative w-full">
                                <select v-model="selectedMonth"
                                    class="relative py-2 pr-4 pl-4 outline-none my-3 border rounded-lg text-base w-full">
                                    <option v-for="(month, idx) in allMonths" :key="idx" :value="month.value">
                                        {{ month.text }}
                                    </option>
                                </select>
                                <svg class="-mr-1 ml-2 h-5 w-5 absolute top-6 right-3"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="relative">
                                <year-picker placeholder="Year" class="year-pick" v-model="selectedYear"
                                    :year-disable="'no'" />
                                <svg class="-mr-1 ml-2 h-5 w-5 absolute top-3 right-3"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div class="w-full pt-5">
                            <v-date-picker class="add-issue-modal-calendar" v-model="date" :attributes="attributes"
                                transition="none" is-expanded ref="calendar"></v-date-picker>
                        </div>
                    </div>
                    <div class="flex flex-col justify-between h-full w-full">
                        <ValidationProvider v-slot="{ errors }" name="Description" rules="required">
                            <textarea placeholder="Description" rows="6" v-model="submitForm.description"
                                class="border border-gray-300 rounded-lg py-3 px-4 text-sm w-full mb-5 outline-none"
                                :class="errors[0] ? 'border border-red-600 placeholder-red-600' : 'border border-gray-300'">
                            </textarea>
                        </ValidationProvider>
                        <div class="grid grid-cols-2 gap-3">
                            <button type="button"
                                class="text-xs rounded-full uppercase bg-normalBlue text-white py-2.5 px-3"
                                @click="$emit('close')">
                                Cancel
                            </button>
                            <button type="submit"
                                class="text-xs rounded-full uppercase bg-blackish text-white py-2.5 px-3">
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </DashboardModal>
    </Container>
</template>
<script>
import { mapActions } from "vuex";
import DatePicker from "./date-picker";
export default {
    props: {
        attributes: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        DatePicker
    },
    data() {
        return {
            selectedMonth: new Date().getMonth(),
            selectedYear: new Date().getFullYear(),
            date: '',
            submitForm: {
                description: '',
                issue_date: ''
            },
            allIssues: [],
            allMonths: [
                {
                    value: 0,
                    text: "January",
                },
                {
                    value: 1,
                    text: "February",
                },
                {
                    value: 2,
                    text: "March",
                },
                {
                    value: 3,
                    text: "April",
                },
                {
                    value: 4,
                    text: "May",
                },
                {
                    value: 5,
                    text: "June",
                },
                {
                    value: 6,
                    text: "July",
                },
                {
                    value: 7,
                    text: "August",
                },
                {
                    value: 8,
                    text: "September",
                },
                {
                    value: 9,
                    text: "October",
                },
                {
                    value: 10,
                    text: "November",
                },
                {
                    value: 11,
                    text: "December",
                },
            ],
        }
    },
    watch: {
        selectedMonth: function (month) {
            this.$refs.calendar.move(new Date(this.selectedYear, month))
            this.getIssues(month, this.selectedYear)
        },
        selectedYear: function (year) {
            this.$refs.calendar.move(new Date(year, this.selectedMonth))
            this.getIssues(this.selectedMonth, year)
        },
    },
    mounted() {
        this.getMonth();
    },
    methods: {
        ...mapActions({
            ADD_ISSUE: "myCompany/ADD_ISSUE",
            GET_ISSUE: "myCompany/GET_ISSUE",

        }),
        getMonth() {
            this.$nextTick(() => {
                this.submitForm.issue_date = this.$refs.calendar;
            })
        },
        getIssues(month, year) {
            this.GET_ISSUE({ form: { currentMonth: month + 1, currentYear: year } })
                .then((response) => {
                    this.allIssues = response.data.issues
                    this.$emit('getIssue', this.allIssues)
                })
        },
        onSubmit() {
            if (this.submitForm.issue_date.dateParts[0].date) {
                this.submitForm.issue_date = this.$moment(this.submitForm.issue_date.dateParts[0].date)
                let dt = Date.parse(this.submitForm.issue_date)
                this.submitForm.issue_date = dt / 1000;
                this.ADD_ISSUE({ form: this.submitForm })
                    .then((response) => {
                        this.$toast.success({
                            title: "Issue Created Success",
                            message: "Your issue has been successfully created",
                        });
                        this.$emit('addAndClose', response.data.issue);
                    })
                    .catch((error) => {
                        this.$emit('close');
                        this.$toast.error({
                            title: "Error",
                            message: error.message,
                        });
                    });
            } else {
                this.$toast.error({
                    title: "No Date",
                    message: "No Date Selected",
                });
            }
        },
    },
}
</script>
<style scoped>
select {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

.vc-container.vc-is-expanded {
    border: none !important;
}
</style>