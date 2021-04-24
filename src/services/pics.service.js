import axios from "axios";
import appConfig from "../config/config.json";

const createQuery = (searchTerm) => {
  if (searchTerm) {
    return `?artist=${searchTerm}&picName=${searchTerm}`;
  }
  return "";
};

export const fetchPictures = async (searchTerm) => {
  const pics = (
    await axios.get(
      `${appConfig.serverBaseUrl}/${appConfig.apiBaseUrl}/pics${createQuery(
        searchTerm
      )}`
    )
  ).data.data;
  return pics;
};

export const fetchPicDetails = async (picId) => {
  const pic = (
    await axios.get(
      `${appConfig.serverBaseUrl}/${appConfig.apiBaseUrl}/pics/${picId}/details`
    )
  ).data.data;
  return pic;
};

export const fetchPic = async (picId) => {
  const pic = (
    await axios.get(
      `${appConfig.serverBaseUrl}/${appConfig.apiBaseUrl}/pics/${picId}`
    )
  ).data.data;
  return pic;
};
