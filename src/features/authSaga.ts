import { IUser } from './../interface/user';
import { PayloadAction } from '@reduxjs/toolkit';
import { delay, fork, put, take, call } from 'redux-saga/effects';
import { authActions, ILoginPayload } from './authSlice';

function* handleLogin(payload: ILoginPayload) {
	try {
		// Fake API get user
		let user: IUser;
		yield delay(500);
		user = { id: 123, username: 'hui' };
		localStorage.setItem('access_token', 'fake_access_token');
		yield put(authActions.loginSuccess(user));
	} catch (error) {
		yield put(authActions.loginError(error.message));
	}
	console.log('handleLogin');
}

function* handleLogout() {
	yield delay(500);
	localStorage.removeItem('access_token');
	console.log('handleLogout');
}

function* watchLoginFlow() {
	while (true) {
		console.log('watchLoginFlow');
		// Nếu chưa login thì watch action login
		const isLoggedIn = Boolean(localStorage.getItem('access_token'));
		if (!isLoggedIn) {
			// yeid take => đợi action login được dispatch
			const action: PayloadAction<ILoginPayload> = yield take(authActions.login.type);
			// Thực thi hàm handleLogin
			yield fork(handleLogin, action.payload);
		}

		// yeid take => đợi action logout được dispatch
		yield take(authActions.logout.type);
		// Thực thi hàm handleLogout
		yield call(handleLogout);
	}
}

export default function* authSaga() {
	yield fork(watchLoginFlow);
}
