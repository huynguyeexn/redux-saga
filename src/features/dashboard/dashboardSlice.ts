import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'interface';
import { RootState } from './../../app/store';

export interface IDashboardStatistics {
	maleCount: number;
	femaleCount: number;
	highMarkCount: number;
	lowMarkCount: number;
}

export interface IRannkingByCity {
	cityId: string;
	cityName: string;
	rankingList: Student[];
}

export interface IDashboardState {
	loading: boolean;
	statistics: IDashboardStatistics;
	highestStudentList: Student[];
	lowestStudentList: Student[];
	rankingByCityList: IRannkingByCity[];
}

///////////////

const initialState: IDashboardState = {
	loading: false,
	statistics: {
		maleCount: 0,
		femaleCount: 0,
		highMarkCount: 0,
		lowMarkCount: 0,
	},
	highestStudentList: [],
	lowestStudentList: [],
	rankingByCityList: [],
};

const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		fetchData: (state) => {
			state.loading = true;
		},
		fetchDataSuccess: (state) => {
			state.loading = false;
		},
		fetchDataError: (state) => {
			state.loading = false;
		},

		setStatistics: (state, action: PayloadAction<IDashboardStatistics>) => {
			state.statistics = action.payload;
		},
		setHighestStudentList: (state, action: PayloadAction<Student[]>) => {
			state.highestStudentList = action.payload;
		},
		setLowestStudentList: (state, action: PayloadAction<Student[]>) => {
			state.lowestStudentList = action.payload;
		},
		setRankingByCityList: (state, action: PayloadAction<IRannkingByCity[]>) => {
			state.rankingByCityList = action.payload;
		},
	},
});

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors
export const selectDashBoardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashBoardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentList;
export const selectRankingByCityList = (state: RootState) => state.dashboard.rankingByCityList;

// Reducer
const dashboardReducer = dashboardSlice.reducer;
export default dashboardReducer;
