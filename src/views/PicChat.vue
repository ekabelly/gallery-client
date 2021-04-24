<template>
  <div>
    <h2>
      Hello {{ userName || "Guest" }}!
      <span :class="{ disapear: userName }" class="welcome-text"
        >Please Tell Us Your Name =]
      </span>
    </h2>
    <input type="text" v-model="userName" />
    <div class="pic-chat">
      <Pic :picId="picId" />
      <Chat :picId="picId" :userName="userName" />
    </div>
  </div>
</template>

<script>
import Pic from "@/components/Pic";
import Chat from "@/components/Chat";

export default {
  name: "PicChat",
  components: { Pic, Chat },
  computed: {
    picId() {
      return this.$route.params.picId;
    },
  },
  data() {
    return {
      userName: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.pic-chat {
  padding: 10px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 20px;
}

.welcome-text {
  opacity: 1;
  transition: opacity 0.1s linear;

  &.disapear {
    opacity: 0;
  }
}
</style>
