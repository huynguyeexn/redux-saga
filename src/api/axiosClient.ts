import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
	baseURL: 'http://js-post-api.herokuapp.com/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosClient.interceptors.request.use(
	function (config: AxiosRequestConfig) {
		return config;
	},
	function (error: AxiosError) {
		return Promise.reject(error);
	}
);

axiosClient.interceptors.response.use(
	function (response: AxiosResponse) {
		return response.data;
	},
	function (error: AxiosError) {
		return Promise.reject(error);
	}
);

export default axiosClient;
