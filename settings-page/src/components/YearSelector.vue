<template>
  <select
    v-model="selectedYear"
    @change="selectYear"
    class="border rounded px-3 py-2"
  >
    <option value="">Виберіть рік</option>
    <option v-for="year in years" :value="year" :key="year">{{ year }}</option>
  </select>
</template>

<script>
export default {
  props: ["value"],
  data() {
    const currentYear = new Date().getFullYear();
    const startYear = 1937;
    const yearsArray = [];

    for (let year = currentYear; year >= startYear; year--) {
      yearsArray.push(year);
    }

    return {
      selectedYear: this.value || "",
      years: yearsArray,
    };
  },
  methods: {
    selectYear() {
      this.$emit("input", this.selectedYear);
    },
  },
};
</script>
