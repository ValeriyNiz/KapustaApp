import axios from 'axios';

const API = axios.create({
  baseURL: 'https://kapusta-dvde.onrender.com/api-docs/',
});

const authToken = {
  set(accessToken) {
    API.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },

  unset() {
    API.defaults.headers.common.Authorization = ``;
  },
};
export { API, authToken };
