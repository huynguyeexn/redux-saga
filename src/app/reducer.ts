import authReducer from 'features/auth/authSlice';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from '@reduxjs/toolkit';
import { history } from 'utils';

const rootReducer = combineReducers({
	router: connectRouter(history),
	auth: authReducer,
});

export default rootReducer;
