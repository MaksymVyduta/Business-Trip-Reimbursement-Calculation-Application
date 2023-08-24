import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLimitsContext } from '../context/LimitsContext';

function SummaryStep({
  calculateReimbursement,
  calculateCarReimbursement,
  receipts,
  calculateTotalRefund,
  name
}) {
  const { limits } = useLimitsContext();

  const calculatedRefund = calculateReimbursement() + calculateCarReimbursement() + calculateTotalRefund();

  let totalRefund;
  if (calculateTotalRefund() < limits.receiptsLimit) {
    totalRefund = calculateReimbursement() + calculateCarReimbursement() + calculateTotalRefund();
  } else {
    totalRefund = calculateReimbursement() + calculateCarReimbursement() + limits.receiptsLimit;
  }

  if (totalRefund > limits.reimbursementLimit) {
    totalRefund = limits.reimbursementLimit;
  }

  return (
    <div>
      <h3>Summary for {name}</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Refund for the number of days in a business trip</TableCell>
              <TableCell align="right">${calculateReimbursement()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Car reimbursement</TableCell>
              <TableCell align="right">${calculateCarReimbursement()}</TableCell>
            </TableRow>
            {receipts.map((receipt, index) => (
              <TableRow key={index}>
                <TableCell>{receipt.option}</TableCell>
                <TableCell align="right">${receipt.amount}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>Total Refund</TableCell>
              <TableCell align="right">${calculatedRefund}</TableCell>
            </TableRow>

            {calculatedRefund > limits.reimbursementLimit && (
              <TableRow>
                 <TableCell style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
                  You have exceeded the maximum possible refund amount. The refund will be limited to the highest possible refund amount. The refund amount you will get is: <span style={{ color: 'red', fontSize: '29px' }}>${totalRefund}</span>
                </TableCell>
              </TableRow>
            )}

            {(calculatedRefund < limits.reimbursementLimit && calculateTotalRefund() > limits.receiptsLimit) && (
              <TableRow>
                 <TableCell style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold', textAlign: 'center' }}>
                  The total amount of receipts has exceeded the refund limit! Refunds are limited to the maximum refund threshold for receipts. The refund amount you will get is: <span style={{ color: 'red', fontSize: '29px' }}>${totalRefund}</span>
                </TableCell>
              </TableRow>
            )}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SummaryStep;
