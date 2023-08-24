import React, { useEffect } from 'react';
import { FormControlLabel, Checkbox, TextField } from '@mui/material';
import { useLimitsContext } from '../context/LimitsContext';

function CarStep({ kilometers, setKilometers }) {
  const [travelByCar, setTravelByCar] = React.useState(false);
  const { limits } = useLimitsContext(); 

  const handleCheckboxChange = (event) => {
    setTravelByCar(event.target.checked);
    if (!event.target.checked) {
      setKilometers(0);
    }
  };

  const handleKilometersChange = (event) => {
    const newKilometers = event.target.value;
    if (newKilometers <= limits.distanceLimit) {
      setKilometers(newKilometers);
    }
  };

  useEffect(() => {
    if (kilometers > limits.distanceLimit) {
      setKilometers(prevKilometers => Math.min(prevKilometers, limits.distanceLimit));
    }
  }, [kilometers, limits.distanceLimit, setKilometers]);


  return (
    <div>
      <h3>Travel by Car</h3>
      <FormControlLabel
        control={<Checkbox checked={travelByCar} onChange={handleCheckboxChange} />}
        label="Do you travel by your own car?"
      />
      {travelByCar && (
        <div>
          <TextField
            type="number"
            label="Enter kilometers"
            value={kilometers}
            onChange={handleKilometersChange}
            inputProps={{ min: 0, max: limits.distanceLimit }} 
            style={{ width: '15%' }}
          />
          <p>Maximum allowed kilometers: {limits.distanceLimit}</p>
        </div>
      )}
    </div>
  );
}

export default CarStep;