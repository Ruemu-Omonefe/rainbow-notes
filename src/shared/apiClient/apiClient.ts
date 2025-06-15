import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (handler: () => void) => {
  logoutHandler = handler;
};


// Request interceptor to include the token in headers
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally
        if (error.response) {
            // console.error("API Error:", error);
            if (error.response?.status === 401 && logoutHandler) {
                logoutHandler(); 
            }

        } else {
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
);

export const apiClient = {
    get: (url: string, params?: any) => api.get(url, { params }),
    post: (url: string, data?: any) => api.post(url, data),
    put: (url: string, data?: any) => api.put(url, data),
    delete: (url: string) => api.delete(url),
    patch: (url: string, data?: any) => api.patch(url, data),
};

export default apiClient;