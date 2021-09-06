import { put, call } from 'redux-saga/effects';
import { ListParams, ListResponse, Student } from 'interface';
import { PayloadAction } from '@reduxjs/toolkit';
import { studentAction } from './studentSlice';
import { takeLatest } from "@redux-saga/core/effects";
import studentApi from 'api/students.Api';

function* featchStudentList(action: PayloadAction<ListParams>) {
    try {
        const response: ListResponse<Student> = yield call(studentApi.getAll, action.payload);
        yield put(studentAction.fetchStudentSuccess(response));
    } catch (error) {
        console.error("Failed to fetch student list: ",error);
        yield put(studentAction.fetchStudentError);
    }
}

export default function* studentSaga() {
    yield takeLatest(studentAction.fetchStudentList, featchStudentList);
}