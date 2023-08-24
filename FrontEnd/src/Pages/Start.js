import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ROUTES } from '../routes/routes';

const Start = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Grid container spacing={2}>
        <Grid item xs={6} align="center">
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Button
              component={Link}
              to={ROUTES.USER}
              variant="contained"
              color="primary"
              size="large"
              style={{ width: '100%' }}
            >
              User
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={6} align="center">
          <Paper elevation={3} style={{ padding: '1rem' }}>
            <Button
              component={Link}
              to={ROUTES.ADMIN}
              variant="contained"
              color="secondary"
              size="large"
              style={{ width: '100%' }}
            >
              Admin
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Start;