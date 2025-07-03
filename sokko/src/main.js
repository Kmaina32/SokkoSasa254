import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from 'shared/contexts/AuthContext.jsx'; // Corrected
import { CartProvider } from 'shared/contexts/CartContext.jsx'; // Corrected
import { Toaster } from 'shared/ui/sonner.jsx'; // Corrected
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <App />
        <Toaster />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);