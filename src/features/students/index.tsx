import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useEffect } from 'react';
import STUDENT_TABLE from './components/studentTable';
import { selectStudentList, studentAction } from './studentSlice';

const useStyles = makeStyles((theme) => ({
	root: {},
	header: {
		display: 'flex',
		flexFlow: 'row nowrap',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: theme.spacing(3),
	},
}));

export const STUDENTS_PAGE = () => {
	const dispatch = useAppDispatch();
	const studentList = useAppSelector(selectStudentList);

	const classes = useStyles();

	console.log(studentList);

	useEffect(() => {
		dispatch(
			studentAction.fetchStudentList({
				_page: 1,
				_limit: 15,
			})
		);
	}, [dispatch]);
	return (
		<Box>
			<Box className={classes.header}>
				<Typography variant="h4">Student List</Typography>
				<Button variant="contained" color="primary">
					Add new Student
				</Button>
			</Box>
			<Box>{studentList && <STUDENT_TABLE studentList={studentList} />}</Box>
		</Box>
	);
};
