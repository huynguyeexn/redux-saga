import { City, ListResponse } from 'interface';
import axiosClient from './axiosClient';

const citiesApi = {
	getAll(): Promise<ListResponse<City>> {
		const url = '/cities';
		return axiosClient.get(url, {
			params: {
				_limit: 10,
				_page: 1,
			},
		});
	},
};

export default citiesApi;
