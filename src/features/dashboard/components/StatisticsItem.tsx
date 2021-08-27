import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: theme.spacing(2, 4),
		cursor: 'pointer',
		transition: 'box-shadow 0.25s ease-in-out',
		'&:hover': {
			boxShadow: theme.shadows[2],
		},
	},
	typoGr: {},
}));

interface Props {
	icon: React.ReactElement;
	label: string;
	value: string | number;
}

const StatisticsItem = ({ icon, label, value }: Props) => {
	const classes = useStyle();

	return (
		<Paper className={classes.root} variant="outlined">
			<Box>
				<Typography align="center">{icon}</Typography>
				<Typography variant="subtitle2">{label}</Typography>
			</Box>

			<Box>
				<Typography variant="h4">{value}</Typography>
			</Box>
		</Paper>
	);
};

export default StatisticsItem;
