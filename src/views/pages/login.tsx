import { Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppSelector } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';
import React from 'react';
import { useDispatch } from 'react-redux';

interface Props {}

const useStyle = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	},
	box: {
		padding: theme.spacing(3),
	},
	button: {
		marginTop: theme.spacing(3),
		width: '100%',
	},
}));

export const LoginPage = (props: Props) => {
	const classes = useStyle();
	const dispatch = useDispatch();
	const isLoading = useAppSelector((state) => state.auth.isLoading);

	const handleLoginClick = () => {
		dispatch(
			authActions.login({
				username: '',
				password: '',
			})
		);
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.box} elevation={2}>
				<Typography variant="h5" component="h1">
					User management
				</Typography>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={handleLoginClick}
					startIcon={isLoading ? <CircularProgress color="inherit" size="1rem" /> : null}
				>
					Click to login
				</Button>
			</Paper>
		</div>
	);
};
