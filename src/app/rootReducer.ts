import authReducer from 'features/auth/authSlice';
import { connectRouter } from 'connected-react-router';
import { combineReducers } from '@reduxjs/toolkit';
import { history } from 'utils';
import dashboardReducer from 'features/dashboard/dashboardSlice';
import studentReducer from 'features/students/studentSlice';

const rootReducer = combineReducers({
	auth: authReducer,
	dashboard: dashboardReducer,
	router: connectRouter(history),
	student: studentReducer,
});

export default rootReducer;
