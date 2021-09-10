import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, PaginationParams, Student, ListResponse } from 'interface';

export interface StudentState {
	loading: boolean;
	list?: Student[];
	filter: ListParams;
	pagination: PaginationParams;
}

const initialState: StudentState = {
	loading: false,
	list: [],
	filter: {
		_page: 1,
		_limit: 15,
	},
	pagination: {
		_page: 1,
		_limit: 15,
		_totalRows: 15,
	},
};

const studentSlice = createSlice({
	name: 'student',
	initialState: initialState,
	reducers: {
		fetchStudentList: (state, action: PayloadAction<ListParams>) => {
			state.loading = true;
		},
		fetchStudentSuccess: (state, action: PayloadAction<ListResponse<Student>>) => {
			state.loading = false;
			state.list = action.payload.data;
			state.pagination = action.payload.pagination;
		},
		fetchStudentError: (state, action: PayloadAction<ListParams>) => {
			state.loading = false;
		},

		setStudentFilter: (state, action: PayloadAction<ListParams>) => {
			state.filter = action.payload;
		},
	},
});

// Actions
export const studentAction = studentSlice.actions;

// Selectors
export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
