const { default: axios } = require("axios");

export const serverBaseUrl = "http://localhost:4000";

const apiBaseUrl = "api/v1";

export const fetchPictures = async () => {
  const pics = (await axios.get(`${serverBaseUrl}/${apiBaseUrl}/pics`)).data
    .data;
  return pics;
};
