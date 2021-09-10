import { Button, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student, City } from 'interface';
import React from 'react';
import { capitilizedString, markColor } from 'utils';

const useStyles = makeStyles((theme) => ({
	table: {
		minWidth: 650,
	},
	editBtn: {
		marginRight: theme.spacing(1),
	},
}));

interface Props {
	studentList: Student[];
	cityMap: { [key: string]: City };
	onEdit?: (student: Student) => void;
	onRemove?: (student: Student) => void;
}

export default function STUDENT_TABLE({ studentList, cityMap, onEdit, onRemove }: Props) {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table" size="small">
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Gender</TableCell>
						<TableCell>Mark</TableCell>
						<TableCell>City</TableCell>
						<TableCell align="right" width={200}>
							Actions
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{studentList.map((row, idx) => (
						<TableRow key={row.id}>
							<TableCell component="th" scope="row">
								{idx}
							</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{capitilizedString(row.gender)}</TableCell>
							<TableCell>
								<Typography
									style={{
										color: markColor(row.mark),
										fontWeight: 'bold',
									}}
								>
									{row.mark}
								</Typography>
							</TableCell>
							<TableCell>{cityMap[row.city]?.name}</TableCell>
							<TableCell align="right" width={200}>
								<Button
									className={classes.editBtn}
									variant="outlined"
									color="primary"
									onClick={() => onEdit?.(row)}
								>
									Edit
								</Button>
								<Button
									variant="outlined"
									color="secondary"
									onClick={() => onRemove?.(row)}
								>
									Remove
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
