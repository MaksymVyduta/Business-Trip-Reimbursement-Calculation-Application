import React from 'react';
import Grid from '@mui/material/Grid';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function DateStep({ startDate, setStartDate, endDate, setEndDate, specificDays, setSpecificDays }) {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Choose Dates
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(date) => setStartDate(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(date) => setEndDate(date)}
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
      <div style={{ marginTop: '10px' }}>
        <label>
          Specific Days (These days will not count towards the refund):
          <input
            type="number"
            value={specificDays}
            onChange={(e) => setSpecificDays(Math.max(0, e.target.value))}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </label>
      </div>
    </div>
  );
}

export default DateStep;