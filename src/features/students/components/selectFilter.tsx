import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { selectCityList } from 'features/cities/citySlice';
import { ListParams } from 'interface';
import React from 'react';
import { ChangeEvent } from 'react-router/node_modules/@types/react';

interface Props {
	filter: ListParams;
	onFilterChange: (newFilter: ListParams) => void;
}

const SelectFilter = ({ filter, onFilterChange }: Props) => {
	const cityList = useAppSelector(selectCityList);

	const handleChange = (e: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
		const newFilter = {
			...filter,
			city: e.target.value || undefined,
		};
		onFilterChange(newFilter);
	};

	return (
		<Box>
			<Grid sm={12} md={6} lg={3}>
				<FormControl variant="outlined" fullWidth size="small">
					<InputLabel id="demo-simple-select-outlined-label">Fillter by City</InputLabel>
					<Select
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						value={filter.city}
						onChange={handleChange}
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
		</Box>
	);
};

export default SelectFilter;
