import { debounce, retry, takeLatest } from '@redux-saga/core/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import studentApi from 'api/students.Api';
import { ListParams, ListResponse, Student } from 'interface';
import { put } from 'redux-saga/effects';
import { studentAction } from './studentSlice';

function* featchStudentList(action: PayloadAction<ListParams>) {
	try {
		const response: ListResponse<Student> = yield retry(
			3,
			10000,
			studentApi.getAll,
			action.payload
		);
		yield put(studentAction.fetchStudentSuccess(response));
	} catch (error) {
		yield put(studentAction.fetchStudentError);
	}
}

function* featchSearch(action: PayloadAction<ListParams>) {
	yield put(studentAction.setStudentFilter(action.payload));
}

export default function* studentSaga() {
	yield takeLatest(studentAction.fetchStudentList, featchStudentList);
	yield debounce(500, studentAction.searchChange.type, featchSearch);
}
