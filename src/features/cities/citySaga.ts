import { call, put, takeLatest } from '@redux-saga/core/effects';
import citiesApi from 'api/citiesApi';
import { City, ListResponse } from 'interface';
import { cityActions } from './citySlice';

function* fetchCityList() {
	try {
		const response: ListResponse<City> = yield call(citiesApi.getAll);
		yield put(cityActions.fetchCityListSuccess(response));
	} catch (error) {
		console.error(error);
	}
}

export default function* citySaga() {
	yield takeLatest(cityActions.fetchCityList, fetchCityList);
}
