import citiesApi from 'api/citiesApi';
import studentApi from 'api/students.Api';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { City } from './../../interface/city';
import { ListResponse } from './../../interface/common';
import { Student } from './../../interface/student';
import { dashboardActions, IRannkingByCity } from './dashboardSlice';

function* fetchStatistics() {
	const responseList: Array<ListResponse<Student>> = yield all([
		call(studentApi.getAll, { _limit: 1, gender: 'male' }), // Male count
		call(studentApi.getAll, { _limit: 1, gender: 'female' }), // Female count
		call(studentApi.getAll, { _limit: 1, mark_gte: 8 }), // High mark
		call(studentApi.getAll, { _limit: 1, mark_lte: 5 }), // Low mark
	]);

	const statisticsList = responseList.map((x) => x.pagination._totalRows);
	const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticsList;

	yield put(
		dashboardActions.setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
	);
}

function* fetchHighestStudentList() {
	const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
		_page: 1,
		_limit: 5,
		_sort: 'mark',
		_order: 'desc',
	});

	yield put(dashboardActions.setHighestStudentList(data));
}

function* fetchLowestStudentList() {
	const { data }: ListResponse<Student> = yield call(studentApi.getAll, {
		_page: 1,
		_limit: 5,
		_sort: 'mark',
		_order: 'asc',
	});

	yield put(dashboardActions.setLowestStudentList(data));
}

function* fetchRankingByCityList() {
	const { data: cityList }: ListResponse<City> = yield call(citiesApi.getAll);

	const cityCall = cityList.map((x) =>
		call(studentApi.getAll, {
			_page: 1,
			_limit: 5,
			_sort: 'mark',
			_order: 'desc',
			city: x.code,
		})
	);

	const responseList: Array<ListResponse<Student>> = yield all(cityCall);

	const rankingByCityList: Array<IRannkingByCity> = responseList.map((x, idx) => ({
		cityId: cityList[idx].code,
		cityName: cityList[idx].name,
		rankingList: x.data,
	}));

	yield put(dashboardActions.setRankingByCityList(rankingByCityList));
}

function* fetchDashboardData() {
	try {
		yield all([
			call(fetchHighestStudentList),
			call(fetchLowestStudentList),
			call(fetchRankingByCityList),
			call(fetchStatistics),
		]);
		yield put(dashboardActions.fetchDataSuccess());
	} catch (error) {
		console.log('Failed to fetch dashboard data: ', error);
		yield put(dashboardActions.fetchDataError());
	}
}

export default function* dashboardSaga() {
	yield takeLatest(dashboardActions.fetchData, fetchDashboardData);
}
