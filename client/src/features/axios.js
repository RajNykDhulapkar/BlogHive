const axios = require("axios");

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

// interception unauthorized request and request assess token using refresh token
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");
            try {
                const response = await axiosInstance.get("/api/auth/refresh", {
                    refreshToken,
                });
                if (response.status === 200) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    return axiosInstance(originalRequest);
                }
            } catch (err) {
                console.log(err);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;