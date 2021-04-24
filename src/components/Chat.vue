<template>
  <div class="chat">
    <div>
      <h4>Chat</h4>
      <div class="chat-area">
        <div
          v-for="chatLine in chat"
          :key="chatLine.timestamp"
          class="chat-line"
          :title="chatLine.timestamp"
        >
          <div>
            <b>{{ chatLine.userName }}:</b>
            <div>{{ chatLine.content }}</div>
          </div>
          <div>
            <img
              v-if="!!chatLine.status"
              src="@/assets/watch.svg"
              alt="sending"
              :class="{ apear: chatLine.status === 'LOADING' }"
            />
            <img
              v-if="!!chatLine.status"
              src="@/assets/check-circle.webp"
              alt="sent"
              :class="{ apear: chatLine.status === 'COMPLETED' }"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-section">
      <input
        type="text"
        @keydown.enter="sendUserInput(userInput)"
        v-model="userInput"
      />
      <button @click="sendUserInput(userInput)">Send</button>
    </div>
  </div>
</template>

<script>
import appConfig from "../config/config.json";
import { io } from "socket.io-client";

export default {
  name: "Chat",
  props: {
    userName: {
      type: String,
      required: false,
    },
    picId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      userInput: "",
      chat: [],
      io: null,
      socket: null,
    };
  },
  mounted() {
    this.createSocket();
  },
  methods: {
    createSocket() {
      this.io = io.connect(appConfig.serverBaseUrl);
      this.io.emit("createPicIdRoom", this.picId);
      this.io.on("chat", this.onSocketChat);
    },
    onSocketChat(message) {
      const messageToUpdateIndex = this.chat.findIndex(
        (localChatMessage) =>
          localChatMessage.timestamp === message.timestamp &&
          localChatMessage.userName === message.userName
      );
      if (this.chat[messageToUpdateIndex]) {
        this.chat[messageToUpdateIndex].status = "COMPLETED";
      } else {
        this.chat.push(message);
      }
    },
    sendUserInput(userInput) {
      this.userInput = "";
      const userInputData = {
        content: userInput,
        userName: this.userName || "Guest",
        date: new Date().toLocaleString(),
        timestamp: new Date().getTime(),
      };
      this.chat.push({ ...userInputData, status: "LOADING" });
      this.io.emit("chat", userInputData);
    },
  },
};
</script>

<style lang="scss" scoped>
.chat {
  > div {
    height: -webkit-fill-available;
  }
  display: flex;
  flex-direction: column;
  align-content: space-between;

  .chat-area {
    height: -webkit-fill-available;
  }

  .chat-area,
  h4 {
    padding: 10px;
  }

  .chat-line {
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    > div {
      display: flex;
      b {
        margin-right: 3px;
      }

      img {
        width: 10px;
        height: 10px;
        opacity: 0;
        transition: opacity 0.1s linear;
        &.apear {
          opacity: 1;
        }
      }
    }
  }

  h4 {
    background-color: lightgrey;
  }

  .bottom-section {
    height: 40px;
    padding: 10px;
    display: flex;
  }
}
</style>
