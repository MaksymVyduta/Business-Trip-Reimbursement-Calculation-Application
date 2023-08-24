import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'; 
import { ROUTES } from './routes/routes';
import Start from './Pages/Start';
import User from './Pages/User'; 
import Admin from './Pages/Admin'; 
import { LimitsProvider } from './context/LimitsContext';

function App() {
  return (
    <LimitsProvider>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.START} element={<Start />} />
        <Route path={ROUTES.USER} element={<User />} />
        <Route path={ROUTES.ADMIN} element={<Admin />} />
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.START} />} />
      </Routes>
    </BrowserRouter>
    </LimitsProvider>
  );
}

export default App;