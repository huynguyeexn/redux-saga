import { put, retry, takeLatest } from '@redux-saga/core/effects';
import citiesApi from 'api/citiesApi';
import { City, ListResponse } from 'interface';
import { cityActions } from './citySlice';

function* fetchCityList() {
	try {
		const response: ListResponse<City> = yield retry(3, 10000, citiesApi.getAll);
		yield put(cityActions.fetchCityListSuccess(response));
	} catch (error) {
		yield put(cityActions.fetchCityListError);
	}
}

export default function* citySaga() {
	yield takeLatest(cityActions.fetchCityList, fetchCityList);
}
