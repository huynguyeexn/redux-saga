import { Box, Grid, InputAdornment, TextField } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import { ListParams } from 'interface';
import React from 'react';
import { ChangeEvent } from 'react-router/node_modules/@types/react';

interface Props {
	filter: ListParams;
	onSearchChange?: (newFilter: ListParams) => void;
}

const SearchFilter = ({ filter, onSearchChange }: Props) => {
	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (!onSearchChange) return;

		const newFilter = {
			...filter,
			name_like: e.target.value,
		};

		onSearchChange(newFilter);
	};

	return (
		<Box>
			<Grid>
				<TextField
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
				/>
			</Grid>
			<Grid></Grid>
			<Grid></Grid>
			<Grid></Grid>
		</Box>
	);
};

export default SearchFilter;
