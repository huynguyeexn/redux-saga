import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'interface';

export interface CityState {
	loading: boolean;
	list: City[];
}

const initialState: CityState = {
	loading: false,
	list: [],
};

const citySlice = createSlice({
	name: 'city',
	initialState: initialState,
	reducers: {
		fetchCityList: (state) => {
			state.loading = true;
		},
		fetchCityListSuccess: (state, action: PayloadAction<ListResponse<City>>) => {
			state.loading = false;
			state.list = action.payload.data;
		},
		fetchCityListError: (state) => {
			state.loading = false;
		},
	},
});

// Actions
export const cityActions = citySlice.actions;

// Selected
export const selectCityList = (state: RootState) => state.city.list;
export const selectCityLoading = (state: RootState) => state.city.loading;
export const selectCityListMap = createSelector(selectCityList, (cityList: City[]) => {
	return cityList.reduce((map: { [key: string]: City }, city) => {
		map[city.code] = city;
		return map;
	}, {});
});

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
