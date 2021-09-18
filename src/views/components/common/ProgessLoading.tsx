import { Fade, Grid, LinearProgress } from '@material-ui/core';
import React from 'react';

interface Props {
	loading?: boolean;
}

const ProgessLoading = ({ loading = false }: Props) => {
	return (
		<Grid style={{ height: '5px' }}>
			<Fade timeout={{ exit: 1000 }} in={loading}>
				<LinearProgress />
			</Fade>
		</Grid>
	);
};

export default ProgessLoading;
