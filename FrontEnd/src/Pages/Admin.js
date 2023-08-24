import React from 'react';
import { TextField, Button, Container, Grid, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ROUTES } from '../routes/routes';
import { Link } from 'react-router-dom';
import './adminStyles.css'; 
import { useLimitsContext } from '../context/LimitsContext';

const Admin = () => {
  const { limits, setLimits } = useLimitsContext();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLimits((prevLimits) => ({
      ...prevLimits,
      [name]: value,
    }));
  };

  const handleAddReceipt = () => {
    if (limits.receipts.every(receipt => receipt !== '')) {
      setLimits((prevLimits) => ({
        ...prevLimits,
        receipts: [...prevLimits.receipts, ''],
      }));
    }
  };

  const handleRemoveReceipt = (index) => {
    setLimits((prevLimits) => {
      const newReceipts = prevLimits.receipts.filter((_, i) => i !== index);
      return {
        ...prevLimits,
        receipts: newReceipts,
      };
    });
  };

  const handleReceiptChange = (index, value) => {
    setLimits((prevLimits) => {
      const newReceipts = [...prevLimits.receipts];
      newReceipts[index] = value;
      return {
        ...prevLimits,
        receipts: newReceipts,
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.values(limits).some(value => value === '')) {
      alert('Please fill in all fields before updating limits.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(limits),
      });

      if (response.ok) {
        console.log('Limits updated successfully');
        setLimits(limits);
      } else {
        console.error('Failed to update limits');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container className="container">
      <Typography variant="h4" gutterBottom>
        Update the Data
      </Typography>
      <form className="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Reimbursement Rate"
              type="number"
              name="reimbursementRate"
              value={limits.reimbursementRate}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Car Rate"
              type="number"
              name="carRate"
              value={limits.carRate}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Reimbursement Limit"
              type="number"
              name="reimbursementLimit"
              value={limits.reimbursementLimit}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Distance Limit"
              type="number"
              name="distanceLimit"
              value={limits.distanceLimit}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Receipts Limit"
              type="number"
              name="receiptsLimit"
              value={limits.receiptsLimit}
              onChange={handleInputChange}
              inputProps={{ min: 0, step: 0.1 }} 
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Receipts</h3>
            {limits.receipts.map((receipt, index) => (
              <div key={index}>
                <TextField
                  label={`Receipt ${index + 1}`}
                  value={receipt}
                  onChange={(e) => handleReceiptChange(index, e.target.value)}
                  fullWidth
                />
                <IconButton onClick={() => handleRemoveReceipt(index)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            ))}
            <Button type="button" variant="outlined" onClick={handleAddReceipt}>
              Add Receipt
            </Button>
          </Grid>
        </Grid>
        <br/>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button"
        >
          Update Limits
        </Button>
        <Button
        variant="contained"
        color="secondary"
        component={Link}
        to={ROUTES.ROOT}
        className="button"
      >
        Go back to HomePage
      </Button>
      </form>
    </Container>
  );
};

export default Admin;
