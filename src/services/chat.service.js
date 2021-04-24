import appConfig from "../config/config.json";
import { io } from "socket.io-client";

export const sendChatMessage = async (message) => {
  const socket = io(appConfig.serverBaseUrl);
};
