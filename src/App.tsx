import { Button } from '@material-ui/core';
import { RrivateRoute } from 'app/privateRoute';
import { authActions } from 'features/authSlice';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AdminLayout } from 'views/layouts/admin';
import { LoginPage } from 'views/pages/login';
import { NotFoundPage } from 'views/pages/notFound';
import './App.css';

function App() {
	const dispatch = useDispatch();

	const handleLogoutClick = () => {
		dispatch(authActions.logout());
	};

	return (
		<BrowserRouter>
			<Button variant="contained" color="primary" onClick={handleLogoutClick}>
				Logout
			</Button>
			<Switch>
				<Route path="/login">
					<LoginPage />
				</Route>
				<RrivateRoute path="/admin">
					<AdminLayout />
				</RrivateRoute>
				<Route>
					<NotFoundPage />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default App;
