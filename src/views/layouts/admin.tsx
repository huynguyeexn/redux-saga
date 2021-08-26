import { Box, makeStyles } from '@material-ui/core';
import { DASHBOARD_PAGE } from 'features/dashboard';
import { STUDENTS_PAGE } from 'features/students';
import { Redirect, Route, Switch } from 'react-router-dom';
import { HEADER } from 'views/components/common/Header';
import { SIDEBAR } from 'views/components/common/Sidebar';

const useStyle = makeStyles((theme) => ({
	root: {
		display: 'grid',
		gridTemplateRows: 'auto 1fr',
		gridTemplateColumns: '300px 1fr',
		gridTemplateAreas: `"header header" "sidebar main"`,
	},
	header: {
		gridArea: 'header',
	},
	sidebar: {
		gridArea: 'sidebar',
	},
	main: {
		gridArea: 'main',
		borderLeft: `1px solid ${theme.palette.divider}`,
		padding: theme.spacing(3),
	},
}));

export const AdminLayout = () => {
	const classess = useStyle();

	return (
		<Box className={classess.root}>
			<Box className={classess.header}>
				<HEADER />
			</Box>
			<Box className={classess.sidebar}>
				<SIDEBAR />
			</Box>
			<Box className={classess.main}>
				<Switch>
					<Route path="/admin/dashboard">
						<DASHBOARD_PAGE />
					</Route>
					<Route path="/admin/students">
						<STUDENTS_PAGE />
					</Route>
					<Redirect exact from="/admin" to="/admin/dashboard" />
					<Route>Not found</Route>
				</Switch>
			</Box>
		</Box>
	);
};
