import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://hire-game.pertimm.dev",
});

// Add a request interceptor to dynamically set the token
axiosInstance.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
