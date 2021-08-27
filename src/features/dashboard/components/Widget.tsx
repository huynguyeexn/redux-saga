import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';

const useStyle = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}));

interface Props {
	title: string;
	children: any;
}

const Widget = ({ title, children }: Props) => {
	const classes = useStyle();

	return (
		<Paper className={classes.root} variant="outlined">
			<Typography variant="button">{title}</Typography>
			<Box>{children}</Box>
		</Paper>
	);
};

export default Widget;
