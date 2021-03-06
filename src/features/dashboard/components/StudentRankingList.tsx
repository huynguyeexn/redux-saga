import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student } from 'interface';
import React from 'react';

const useStyles = makeStyles({
	table: {},
});

interface Props {
	studentList: Student[];
}

export default function StudentRankingList({ studentList }: Props) {
	const classes = useStyles();

	return (
		<TableContainer>
			<Table className={classes.table} size="small">
				<TableHead>
					<TableRow>
						<TableCell align="center">#</TableCell>
						<TableCell align="left">Name</TableCell>
						<TableCell align="right">Mark</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{studentList.map((student, idx) => (
						<TableRow key={student.id}>
							<TableCell align="center">{idx}</TableCell>
							<TableCell align="left">{student.name}</TableCell>
							<TableCell align="right">{student.mark}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
