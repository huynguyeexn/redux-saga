import {
	Button,
	FormControl,
	Grid,
	InputAdornment,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/cities/citySlice';
import { ListParams } from 'interface';
import React, { ChangeEvent, useRef } from 'react';

interface Props {
	filter: ListParams;
	onSearchChange?: (newFilter: ListParams) => void;
	onFilterChange: (newFilter: ListParams) => void;
}

const StudentFilter = ({ filter, onSearchChange, onFilterChange }: Props) => {
	const searchRef = useRef<HTMLInputElement>();
	const cityList = useAppSelector(selectCityList);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!onSearchChange) return;

		const newFilter = {
			...filter,
			_page: 1,
			name_like: e.target.value,
		};

		onSearchChange(newFilter);
	};

	const handleCityChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
		if (!onFilterChange) return;

		const newFilter = {
			...filter,
			_page: 1,
			city: (e.target.value as string) || undefined,
		};

		onFilterChange(newFilter);
	};

	const handleSortChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
		if (!onFilterChange) return;

		const [_sort, _order] = (e.target.value as string).split('.');

		const newFilter = {
			...filter,
			_page: 1,
			_sort: _sort || undefined,
			_order: (_order as 'desc' | 'asc' | undefined) || undefined,
		};

		onFilterChange(newFilter);
	};

	const handleClearFilter = () => {
		if (!onFilterChange) return;

		const newFilter = {
			...filter,
			_sort: undefined,
			_order: undefined,
			city: undefined,
			name_like: undefined,
		};

		onFilterChange(newFilter);

		if (searchRef.current) {
			searchRef.current.value = '';
		}
	};

	return (
		<Grid container spacing={2}>
			<Grid item sm={12} md={6} lg={5}>
				<TextField
					fullWidth
					size="small"
					id="outlined-basic"
					label="Search by name"
					variant="outlined"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchOutlined />
							</InputAdornment>
						),
					}}
					onChange={handleOnChange}
					inputRef={searchRef}
				/>
			</Grid>
			<Grid item sm={12} md={6} lg={3}>
				<FormControl variant="outlined" fullWidth size="small">
					<InputLabel id="labelFilterCity">Fillter by City</InputLabel>
					<Select
						labelId="labelFilterCity"
						id="filterCity"
						value={filter.city || ''}
						onChange={handleCityChange}
						label="Fillter by City"
					>
						<MenuItem value="">
							<em>Tất cả</em>
						</MenuItem>
						{cityList &&
							cityList.map((city, idx) => (
								<MenuItem key={city.code} value={city.code}>
									{city.name}
								</MenuItem>
							))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item sm={12} md={6} lg={3}>
				<FormControl variant="outlined" fullWidth size="small">
					<InputLabel id="labelSortBy">Sort by</InputLabel>
					<Select
						labelId="labelSortBy"
						id="sortBy"
						value={filter._sort ? `${filter._sort}.${filter._order}` : ''}
						onChange={handleSortChange}
						label="Sort by"
					>
						<MenuItem value="">
							<em>Không</em>
						</MenuItem>
						<MenuItem value="name.asc">Name A -&gt; Z</MenuItem>
						<MenuItem value="name.desc">Name Z &lt;- A</MenuItem>
						<MenuItem value="mark.asc">Mark 0 -&gt; 10</MenuItem>
						<MenuItem value="mark.desc">Mark 10 &lt;- 0</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item sm={12} md={6} lg={1}>
				<Button variant="outlined" color="primary" onClick={handleClearFilter}>
					Clear
				</Button>
			</Grid>
		</Grid>
	);
};

export default StudentFilter;
