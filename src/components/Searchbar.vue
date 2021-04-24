<template>
  <div class="searchbar">
    <input type="text" v-model="searchTerm" />
  </div>
</template>

<script>
export default {
  name: "Serachbar",
  data() {
    return {
      searchTerm: "",
    };
  },
};
</script>

<style></style>
