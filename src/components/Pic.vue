<template>
  <div class="pic">
    <div class="pic-wrapper">
      <img
        :src="pic.picAddress || `${serverBaseUrl}/pics/${pic.picFileName}`"
        alt="Picture Missing"
        :title="picDetailsDisplay"
      />
      <div
        class="layer"
        :title="picDetailsDisplay"
        @mouseenter="getPicDetails(pic.id)"
      ></div>
    </div>
    <div class="pic-text">
      <h4>{{ pic.picName }}</h4>
      <h6>{{ pic.artist }}</h6>
      <div class="pic-desc" :title="pic.description">
        {{ pic.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { serverBaseUrl } from "@/services/pics.service";

export default {
  name: "Pic",
  props: {
    pic: {
      type: Object,
      required: true,
    },
  },
  computed: {
    picDetailsDisplay() {
      return this.picDetails || "Loading...";
    },
  },
  data() {
    return {
      serverBaseUrl,
      picDetails: null,
    };
  },
  methods: {
    async getPicDetails() {
      const details = await this.$store.dispatch("picDetails", this.pic.id);
      if (details) {
        this.picDetails = `Resolution: ${details.resolution}, Weight: ${details.imgWeight}`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.pic {
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  .pic-text {
    padding: 10px;
    min-height: 100px;

    .pic-desc {
      font-size: 14px;
    }

    h4,
    h6 {
      margin: 0;
    }

    h6 {
      font-size: 11px;
      font-weight: normal;
      margin-bottom: 10px;
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
