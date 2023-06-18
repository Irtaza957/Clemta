<template>
  <div class="relative w-max">
    <select v-model="selectedYear" class="py-2 pr-8 pl-4 outline-none my-3 border rounded-full text-base taxYearSelect"
      @change="$emit('changeTaxYear', selectedYear)">
      <option v-for="(year, index) in years" :key="index" :value="year">
        Tax Year {{ year }}
      </option>
    </select>
    <svg class="-mr-1 ml-2 h-5 w-5 absolute top-6 right-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
      fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clip-rule="evenodd" />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    taxYear: {
      type: Number,
    },
  },
  data: () => ({
    selectedYear: null,
    years: [],
  }),
  mounted() {
    this.yearList();
    this.selectedYear = this.taxYear;
  },
  methods: {
    yearList() {
      for (let i = 2018; i <= new Date().getFullYear(); i++) {
        this.years.push(i);
      }
    },
  },
};
</script>

<style scoped>
.taxYearSelect {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>
