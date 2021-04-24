<template>
  <div class="searchbar">
    <input
      type="text"
      v-model="searchTerm"
      @keydown.enter="$emit('search', searchTerm)"
    />
    <button @click="$emit('search', searchTerm)">Search</button>
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
<style lang="scss">
.searchbar {
  display: flex;
  justify-content: center;
}
</style>
