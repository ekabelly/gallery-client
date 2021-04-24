<template>
  <div class="pic">
    <div v-if="picData">
      <div class="pic-wrapper">
        <img
          :src="
            picData.picAddress || `${serverBaseUrl}/pics/${picData.picFileName}`
          "
          alt="Picture Missing"
          :title="picDetailsDisplay"
        />
        <div
          class="layer"
          :title="picDetailsDisplay"
          @mouseenter="getPicDetails(picData.id)"
          @click="navigateToPicChat()"
        ></div>
      </div>
      <div class="pic-text">
        <h4>{{ picData.picName }}</h4>
        <h6>{{ picData.artist }}</h6>
        <div class="pic-desc" :title="picData.description">
          {{ picData.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchPic } from "@/services/pics.service";
import { serverBaseUrl } from "../config/config.json";

export default {
  name: "Pic",
  props: {
    pic: {
      type: Object,
      default: null,
    },
    picId: {
      type: String,
      default: null,
    },
  },
  computed: {
    picDetailsDisplay() {
      return this.picDetails || "Loading...";
    },
    picData() {
      return this.pic || this.fetchedPic;
    },
  },
  mounted() {
    this.setComponentData();
  },
  data() {
    return {
      serverBaseUrl,
      picDetails: null,
      fetchedPic: null,
    };
  },
  methods: {
    async setComponentData() {
      if (!this.pic) {
        this.fetchedPic = await fetchPic(this.picId);
      }
    },
    async getPicDetails() {
      if (this.picData) {
        const details = await this.$store.dispatch(
          "picDetails",
          this.picData.id
        );
        if (details) {
          this.picDetails = `Resolution: ${details.resolution}, Weight: ${details.picWeight}`;
        }
      }
    },
    navigateToPicChat() {
      if (this.$route.name === "Gallery") {
        this.$router.push(`/pic-chat/${this.picData.id}`);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pic {
  .pic-text {
    padding: 10px;
    min-height: 100px;

    .pic-desc {
      font-size: 14px;
    }
  }

  .pic-wrapper {
    position: relative;
    cursor: pointer;
    .layer {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #ffffff00;
      transition: background-color 0.1s linear;
      z-index: -1;
    }

    &:hover .layer {
      background-color: #ffffff30;
      z-index: 1;
    }
  }

  img {
    width: 100%;
  }
}
</style>
