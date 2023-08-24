import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import NameStep from '../components/NameStep';
import DateStep from '../components/DateStep';
import CarStep from '../components/CarStep';
import Refund from '../components/Refund';
import SummaryStep from '../components/SummaryStep';
import { useLimitsContext } from '../context/LimitsContext';
import { ROUTES } from '../routes/routes';
import { Link } from 'react-router-dom';

function User() {
    const STEPS = ['Enter Name', 'Choose Dates', 'Travel by Car', 'Add Receipts', 'Summary']; 
    const [activeStep, setActiveStep] = useState(0);
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [specificDays, setSpecificDays] = useState(0);
    const [kilometers, setKilometers] = useState(0);
    const [receipts, setReceipts] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [receiptAmount, setReceiptAmount] = useState('');
    const [receiptSent, setReceiptSent] = useState(false); 
    
    const { limits } = useLimitsContext();
    

  const calculateDays = () => {
    if (startDate && endDate) {
      const oneDay = 24 * 60 * 60 * 1000;
      const diffDays = Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
      const adjustedSpecificDays = Math.max(0, specificDays);
      return diffDays - adjustedSpecificDays; 
    }
    return 0;
  };

  const handleReceiptSent = () => {
    setReceiptSent(true);
  };

  const calculateDaysReimbursement = () => {
    const daysReimbursementAmount = calculateDays() * limits.reimbursementRate;
    return daysReimbursementAmount;
  };

  const calculateCarReimbursement = () => {
    const carReimbursement = limits.carRate * kilometers;
    return carReimbursement;
  };
  
  const handleAddReceipt = () => {
    if (selectedOption && receiptAmount) {
      const newReceipt = {
        option: selectedOption,
        amount: parseFloat(receiptAmount),
      };
      setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);
      setSelectedOption('');
      setReceiptAmount('');
    }
  };

  const calculateTotalRefund = () => {
    return receipts.reduce((total, receipt) => total + receipt.amount, 0);
  };


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <NameStep name={name} setName={setName} />;
      case 1:
        return (
          <DateStep
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            specificDays={specificDays}
            setSpecificDays={setSpecificDays}
          />
        );
      case 2:
        return <CarStep kilometers={kilometers} setKilometers={setKilometers} />;
        
        case 3:
        return (
          <Refund
            receipts={receipts}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            receiptAmount={receiptAmount}
            setReceiptAmount={setReceiptAmount}
            handleAddReceipt={handleAddReceipt}
            calculateTotalRefund={calculateTotalRefund}
            handleNext={handleNext}
          />
        );  
        
        case 4: 
        return (
          <SummaryStep
            calculateReimbursement={calculateDaysReimbursement}
            calculateCarReimbursement={calculateCarReimbursement}
            receipts={receipts}
            calculateTotalRefund={calculateTotalRefund}
            name={name}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStep()}

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {activeStep === 0 && (
          <>\
            <Button
                variant="contained"
                color="secondary"
                component={Link}
                to={ROUTES.ROOT}
                className="button"
                style={{ width: '48%' }}
                >
                  Go back to HomePage
                </Button>
     
               <Button
               onClick={handleNext}
               variant="contained"
               color="primary"
               style={{ width: '48%' }}
              >
                      Next
               </Button>
        </>
         )}
      </div>

        {activeStep === 1 && (
          <div>
            <div style={{ marginTop: '20px' }}>
              {calculateDays() > 0 && (
                <div>
                  Number of days: {calculateDays()}
                  <br />
                  Reimbursement amount: ${calculateDaysReimbursement()}
                  <div>
                  <br />
                  <Button onClick={handleNext} variant="contained" color="primary">
                    Apply for travel reimbursement and add extra receipts
                  </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <div style={{ marginTop: '20px' }}>
              {kilometers > 0 && (
                <div>
                  Car reimbursement: ${calculateCarReimbursement()}
                </div>
              )}
               <br />
              <Button onClick={handleNext} variant="contained" color="primary">
                Confirm and add extra receipts
              </Button>
            </div>
          </div>
        )}

        {activeStep === 3 && (
            
          <div>
            <Button onClick={handleNext} variant="contained" color="primary">
              Apply for travel reimbursement and go to summary
            </Button>
          </div>
        )}

        {activeStep === 4 && (
          <div>
            <Button onClick={handleReceiptSent} variant="contained" color="primary">
              Submit and send receipt
            </Button>
          </div>
        )}
           {receiptSent && (
          <div style={{ marginTop: '30px', color: 'green', fontWeight: 'bold', fontSize: '1.9em' }}>
          Your receipt has been sent.
        </div>
        )}

        {(activeStep > 0 && !receiptSent) && (
          <div>
             <br />
            <Button onClick={handleBack} variant="contained" color="secondary">
              Back
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default User;