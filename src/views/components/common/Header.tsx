import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useAppDispatch } from 'app/hooks';
import { authActions } from 'features/auth/authSlice';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
	})
);

export const HEADER = () => {
	const classes = useStyles();
	const dispatch = useAppDispatch();

	const handleLogoutClick = () => {
		dispatch(authActions.logout());
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						STUDENT MANAGEMENT
					</Typography>
					<Button color="inherit" onClick={handleLogoutClick}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};
