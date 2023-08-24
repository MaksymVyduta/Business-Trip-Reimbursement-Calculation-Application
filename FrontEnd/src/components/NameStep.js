import React from 'react';
import TextField from '@mui/material/TextField';

function NameStep({ name, setName }) {
  return (
    <div>
      <TextField
        label="Name and Surname"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
  );
}

export default NameStep;