export const calculateDays = (startDate, endDate, specificDays) => {
    if (startDate && endDate) {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
      const adjustedSpecificDays = Math.max(0, specificDays);
      return diffDays - adjustedSpecificDays;
    }
    return 0;
  };
  
  export const calculateDaysReimbursement = (days, reimbursementRate) => {
    return days * reimbursementRate;
  };
  
  export const calculateCarReimbursement = (kilometers, carRate) => {
    return carRate * kilometers;
  };
  
  export const calculateTotalRefund = (receipts) => {
    return receipts.reduce((total, receipt) => total + receipt.amount, 0);
  };