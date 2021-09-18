import { Box, Button, Fade, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import studentApi from 'api/students.Api';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { cityActions, selectCityListMap } from 'features/cities/citySlice';
import { ListParams, Student } from 'interface';
import { useEffect } from 'react';
import StudentFilter from './components/studentFilter';
import STUDENT_TABLE from './components/studentTable';
import {
	selectStudentFilter,
	selectStudentList,
	selectStudentLoading,
	selectStudentPagination,
	studentAction,
} from './studentSlice';

const useStyles = makeStyles((theme) => ({
	root: {},
	header: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: theme.spacing(3),
	},
	progress: {
		height: '5px',
	},
}));

export const STUDENTS_PAGE = () => {
	const dispatch = useAppDispatch();
	const studentList = useAppSelector(selectStudentList);
	const pagination = useAppSelector(selectStudentPagination);
	const filter = useAppSelector(selectStudentFilter);
	const loading = useAppSelector(selectStudentLoading);
	const cityMap = useAppSelector(selectCityListMap);

	const classes = useStyles();

	useEffect(() => {
		dispatch(studentAction.fetchStudentList(filter));
	}, [dispatch, filter]);

	useEffect(() => {
		dispatch(cityActions.fetchCityList());
	}, [dispatch]);

	const changePage = (event: object, page: number) => {
		const payload = {
			...filter,
			_page: page,
		};

		dispatch(studentAction.setStudentFilter(payload));
	};

	const handleSearchChange = (newFilter: ListParams) => {
		dispatch(studentAction.searchChange(newFilter));
	};

	const handleFilterChange = (newFilter: ListParams) => {
		dispatch(studentAction.setStudentFilter(newFilter));
	};

	const handleRemoveStudent = async (student: Student) => {
		if (!student.id) return;
		try {
			await studentApi.remove(student.id);
			dispatch(studentAction.setStudentFilter({ ...filter }));
		} catch (error) {
			console.error('handleRemoveStudent:', error);
		}
	};

	return (
		<Box>
			<Grid className={classes.progress}>
				<Fade timeout={{ exit: 1000 }} in={loading}>
					<LinearProgress />
				</Fade>
			</Grid>
			<Box className={classes.header}>
				<Typography variant="h4">Student List</Typography>
				<Button variant="contained" color="primary">
					Add new Student
				</Button>
			</Box>
			<Box mb={2}>
				<StudentFilter
					filter={filter}
					onSearchChange={handleSearchChange}
					onFilterChange={handleFilterChange}
				/>
			</Box>
			<Box>
				{studentList && (
					<STUDENT_TABLE
						cityMap={cityMap}
						studentList={studentList}
						onRemove={handleRemoveStudent}
					/>
				)}
			</Box>
			<Box my={2} display="flex" justifyContent="center">
				<Pagination
					count={Math.ceil(pagination._totalRows / pagination._limit)}
					page={pagination._page}
					onChange={changePage}
					color="primary"
				/>
			</Box>
		</Box>
	);
};
