import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Dashboard, PeopleAlt } from '@material-ui/icons';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 300,
			backgroundColor: theme.palette.background.paper,
		},
		link: {
			textDecoration: 'none',
			color: theme.palette.text.primary,
			'&.active > div': {
				backgroundColor: theme.palette.action.selected,
			},
		},
	})
);

export const SIDEBAR = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<List component="nav">
				<NavLink to="/admin/dashboard" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<Dashboard />
						</ListItemIcon>
						<ListItemText primary="Dashboard" />
					</ListItem>
				</NavLink>
				<NavLink to="/admin/students" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<PeopleAlt />
						</ListItemIcon>
						<ListItemText primary="Students" />
					</ListItem>
				</NavLink>
			</List>
		</div>
	);
};
