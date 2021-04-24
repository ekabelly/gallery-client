<template>
  <div class="gallery">
    <h2>Gallery</h2>
    <searchbar @search="setPics($event)" />
    <div class="loader" v-if="!pics">loading...</div>
    <div class="pics-container" v-if="pics && pics.length < 1">
      No Pictures Found
    </div>
    <div class="pics-container" v-if="pics">
      <Pic :pic="pic" v-for="pic in pics" :key="pic.id" />
    </div>
  </div>
</template>

<script>
import { fetchPictures } from "@/services/pics.service";
import Searchbar from "@/components/Searchbar.vue";
import Pic from "@/components/Pic.vue";

export default {
  name: "Gallery",
  components: { Searchbar, Pic },
  data() {
    return {
      pics: null,
    };
  },
  mounted() {
    this.setPics();
  },
  methods: {
    async setPics(searchTerm) {
      this.pics = null;
      this.pics = await fetchPictures(searchTerm);
    },
  },
};
</script>

<style lang="scss" scoped>
.gallery {
  margin: 10px;
}

.pics-container {
  margin-top: 20px;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
