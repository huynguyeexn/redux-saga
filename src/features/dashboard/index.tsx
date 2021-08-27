import { Box, Fade, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { CallMade, CallReceived, PeopleAlt } from '@material-ui/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import StatisticsItem from './components/StatisticsItem';
import Widget from './components/Widget';
import StudentRankingList from './components/StudentRankingList';
import {
	dashboardActions,
	selectDashBoardLoading,
	selectDashBoardStatistics,
	selectHighestStudentList,
	selectLowestStudentList,
	selectRankingByCityList,
} from './dashboardSlice';

const useStyle = makeStyles((theme) => ({
	root: {},
	progress: {
		height: '5px',
	},
}));

export const DASHBOARD_PAGE = () => {
	const dispatch = useAppDispatch();

	const loading = useAppSelector(selectDashBoardLoading);
	const statistics = useAppSelector(selectDashBoardStatistics);
	const rankingByCity = useAppSelector(selectRankingByCityList);
	const highestStudent = useAppSelector(selectHighestStudentList);
	const lowestStudent = useAppSelector(selectLowestStudentList);

	const classes = useStyle();

	useEffect(() => {
		dispatch(dashboardActions.fetchData());
	}, [dispatch]);

	return (
		<>
			<Box>
				<Grid container spacing={2}>
					<Grid sm={12} className={classes.progress}>
						<Fade timeout={{ exit: 1000 }} in={loading}>
							<LinearProgress />
						</Fade>
					</Grid>
					<Grid item sm={12} md={6} lg={3}>
						<StatisticsItem
							icon={<PeopleAlt />}
							value={statistics.maleCount}
							label="Male count"
						/>
					</Grid>

					<Grid item sm={12} md={6} lg={3}>
						<StatisticsItem
							icon={<PeopleAlt />}
							value={statistics.femaleCount}
							label="Female count"
						/>
					</Grid>

					<Grid item sm={12} md={6} lg={3}>
						<StatisticsItem
							icon={<CallMade />}
							value={statistics.highMarkCount}
							label="Mark >= 8"
						/>
					</Grid>

					<Grid item sm={12} md={6} lg={3}>
						<StatisticsItem
							icon={<CallReceived />}
							value={statistics.lowMarkCount}
							label="Mark <= 5"
						/>
					</Grid>
				</Grid>
			</Box>
			<Box mt={4}>
				<Typography variant="h5">Student</Typography>
				<Grid container spacing={2}>
					<Grid item sm={12} md={6}>
						<Box mt={3}>
							<Widget title="Highest mark student">
								<StudentRankingList
									studentList={highestStudent}
								></StudentRankingList>
							</Widget>
						</Box>
					</Grid>
					<Grid item sm={12} md={6}>
						<Box mt={3}>
							<Widget title="Lowest mark student">
								<StudentRankingList
									studentList={lowestStudent}
								></StudentRankingList>
							</Widget>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box mt={4}>
				<Typography variant="h5">Ranking by City</Typography>
				<Grid container spacing={2}>
					{rankingByCity.map((city) => (
						<Grid item sm={12} md={6} lg={3}>
							<Box mt={3}>
								<Widget title={city.cityName}>
									<StudentRankingList
										studentList={city.rankingList}
									></StudentRankingList>
								</Widget>
							</Box>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	);
};
