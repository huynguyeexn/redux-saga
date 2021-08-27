import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import { dashboardActions } from './dashboardSlice';

export const DASHBOARD_PAGE = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(dashboardActions.fetchData());
	}, [dispatch]);

	return <div>Dashboard page</div>;
};
