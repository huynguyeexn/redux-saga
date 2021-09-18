import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Student, City } from 'interface';
import React, { useState } from 'react';
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
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<Student>();

	const classes = useStyles();

	const handleRemoveClick = (student: Student) => {
		setDialogOpen(true);
		setSelectedStudent(student);
	};

	const handleDialogClose = () => {
		setDialogOpen(false);
	};

	const handleRemoveConfirm = () => {
		if (!onRemove || !selectedStudent) return;

		onRemove(selectedStudent);
		setDialogOpen(false);
		setSelectedStudent(undefined);
	};

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
									onClick={() => handleRemoveClick(row)}
								>
									Remove
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Dialog
				open={dialogOpen}
				onClose={handleDialogClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Remove a student?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure to remove student named{' '}
						<strong>{selectedStudent?.name}</strong>. This action can't be undo.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleDialogClose}
						color="default"
						variant="outlined"
						autoFocus
					>
						Cancel
					</Button>
					<Button onClick={handleRemoveConfirm} variant="contained" color="secondary">
						Remove
					</Button>
				</DialogActions>
			</Dialog>
		</TableContainer>
	);
}
