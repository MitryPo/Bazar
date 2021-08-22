import axios from 'axios';

export const baseURL = 'http://localhost:8000/api/';


export const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
});

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {

		if (typeof error.response === 'undefined') {
			alert(
				'Произошла ошибка.' +
				' Проверьте соединение с интернетом или повторите запрос позже. '
			);
			return Promise.reject(error)
		}
		// else if (
		// 	error.response.status === 404
		// ) {
		// 	window.location.href = '404/';
		// }
		return Promise.reject(error)
	}
)