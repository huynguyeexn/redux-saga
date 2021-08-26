import { IUser } from 'interface/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILoginPayload {
	username: string;
	password: string;
}

export interface IAuthState {
	isLoggedIn: boolean;
	isLoading: boolean;
	currentUser?: IUser;
}

const initialState: IAuthState = {
	isLoggedIn: false,
	isLoading: false,
	currentUser: undefined,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<ILoginPayload>) => {
			state.isLoading = true;
		},
		loginSuccess: (state, action: PayloadAction<IUser>) => {
			state.isLoggedIn = true;
			state.isLoading = false;
			state.currentUser = action.payload;
		},
		loginError: (state, action: PayloadAction<string>) => {
			state.isLoading = false;
		},
		logout: (state) => {
			state.isLoggedIn = true;
			state.isLoading = false;
			state.currentUser = undefined;
		},
	},
});

// Actions
export const authActions = authSlice.actions;

// Seletors

// Reducers
const authReducer = authSlice.reducer;
export default authReducer;
