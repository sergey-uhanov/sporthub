
import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { useAuthStore } from '@/features/auth/model/useAuthStore.ts';
import {useRouter} from "vue-router";

const router = useRouter();

const apiClient: AxiosInstance = axios.create({
    baseURL: 'булущий-URL-бэка.com/api',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});


apiClient.interceptors.request.use(config => {
    const authStore = useAuthStore();

    if (authStore.accessToken) {
        config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});



apiClient.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
        const originalRequest = error.config!;
        let _retry = false;

        if (error.response?.status === 401 && !_retry) {
            _retry = true;
            const authStore = useAuthStore();
            try {

                const response = await apiClient.post<{ accessToken: string, refreshToken: string }>('/auth/refresh', {
                    refreshToken: authStore.refreshToken
                });

                const { accessToken, refreshToken } = response.data;

                authStore.setTokens(accessToken, refreshToken);

                originalRequest.headers = originalRequest.headers || {};
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);

            } catch (refreshError) {

                authStore.clearTokens();
                await router.push('/login');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

async function handleResponse<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
    try {
        const response = await promise;
        return response.data;
    } catch (err: any) {
        const message = err.response?.data?.message || err.message;
        throw new Error(message);
    }
}

//auth
// export const logIn = (data: LogInData) => handleResponse<LogInResponse>(apiClient.post('/auth/login', data));
// export const register = (data: RegisterData) => handleResponse<RegisterResponse>(apiClient.post('/auth/register', data));
// export const resetPassword = (data: ResetPasswordData) => handleResponse<ResetPasswordResponse>(apiClient.post('/auth/reset-password', data));
// export const checkResetToken = (token: string) => handleResponse<AxiosResponse>(apiClient.get(`/auth/check-reset-token?token=${token}`));
// export const setNewPassword = (data: SetNewPasswordData) => handleResponse<SetNewPasswordResponse>(apiClient.post('/auth/set-new-password', data));
// export const refreshToken = (data: RefreshTokenData) =>  handleResponse<RefreshTokenResponse>(apiClient.post('/auth/refresh-token', data));


