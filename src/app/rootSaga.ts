import authSaga from 'features/authSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	console.log('Root saga');
	yield all([authSaga()]);
}
