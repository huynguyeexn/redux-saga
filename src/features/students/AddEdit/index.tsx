import { Box, Button, Grid, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/students.Api';
import { Student } from 'interface';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProgessLoading from 'views/components/common/ProgessLoading';

interface Props {}

const ADD_EDIT_STUDENT = (props: Props) => {
	const { studentId } = useParams<{ studentId: string }>();
	const isEdit = Boolean(studentId);
	const [student, setStudent] = useState<Student>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!isEdit) return;

		(async () => {
			try {
				setLoading(true);
				const data: Student = await studentApi.getById(studentId);
				setStudent(data);
				setLoading(false);
			} catch (error) {
				console.error('Failed to featch student details.', error);
			}
		})();
	}, [isEdit, studentId]);

	console.log(student);

	return (
		<Grid>
			<ProgessLoading loading={loading} />
			<Box display="flex" justifyContent="space-between">
				<Typography variant="h4">
					{isEdit ? 'Update student info' : 'Add new student'}
				</Typography>
				<Link to="/admin/students" style={{ textDecoration: 'none' }}>
					<Button startIcon={<ChevronLeft />} variant="outlined" color="default">
						Back to student list
					</Button>
				</Link>
			</Box>
		</Grid>
	);
};

export default ADD_EDIT_STUDENT;
