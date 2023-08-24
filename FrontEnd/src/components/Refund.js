import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useLimitsContext } from '../context/LimitsContext';



function Refund({
  receipts,
  selectedOption,
  setSelectedOption,
  receiptAmount,
  setReceiptAmount,
  handleAddReceipt,
  upperLimit
}) {

  const { limits } = useLimitsContext();

  const totalReceiptsAmount = receipts.reduce(
    (total, receipt) => total + parseFloat(receipt.amount),
    0
  );
  
  if (totalReceiptsAmount > limits.receiptsLimit) {
    upperLimit = true;
  }

  return (
    <div>
      <h3>Step 3: Add Receipts for Refund
      <p style={{ color: 'red' }}>
        Maximum amount to refund: ${limits.receiptsLimit}
      </p></h3>
      <FormControl>
        <Select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          {limits.receipts.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="number"
        value={receiptAmount}
        onChange={(e) => setReceiptAmount(e.target.value)}
        label="Receipt Amount (USD)"
        inputProps={{ min: 0 }}
      />
      <Button
        onClick={handleAddReceipt}
        variant="contained"
        color="primary"
        disabled={upperLimit}
      >
        Add Receipt
      </Button>
      <div>
        <h4>Receipts for Refund:</h4>
        {receipts.map((receipt, index) => (
          <div key={index}>
            {receipt.option}: ${receipt.amount.toFixed(2)}
          </div>
        ))}
      </div>

      {upperLimit && (
        <h3>
        <p style={{ color: 'red' }}>
        The total receipts amount exceeds the reimbursement limit! Refund is possible up to the maximum reimbursement threshold. The excess will not be returned.
        </p>
        </h3>
      )}

  
    </div>
  );
}

export default Refund;