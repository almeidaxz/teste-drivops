import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './Routes';
import './index.css';
import { SaleFormProvider } from './contexts/SaleFormContext';
import { AllSalesProvider } from './contexts/AllSalesContext';
import { AllSalesmenProvider } from './contexts/AllSalesmenContext';
import { AllCarsProvider } from './contexts/AllCarsContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AllSalesmenProvider>
      <AllCarsProvider>
        <AllSalesProvider>
          <SaleFormProvider>
            <MainRoutes />
          </SaleFormProvider>
        </AllSalesProvider>s
      </AllCarsProvider>
    </AllSalesmenProvider>
  </BrowserRouter>
)
