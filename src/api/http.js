import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const result = JSON.parse(window.localStorage.getItem('result'))
instance.defaults.headers.common["Authorization"] = result?`Bearer ${result.token.access}`:null;

export default instance;