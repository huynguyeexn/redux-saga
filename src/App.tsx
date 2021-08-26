import { Route, Switch } from 'react-router-dom';
import { RrivateRoute } from 'utils/privateRoute';
import { AdminLayout } from 'views/layouts/admin';
import { LoginPage } from 'views/pages/login';
import { NotFoundPage } from 'views/pages/notFound';

function App() {
	return (
		<>
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
		</>
	);
}

export default App;
