import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ClassesProvider } from './contexts/ClassesContext';
import AuthProvider from './contexts/AuthContext';
import initialClases from './data/initialClases';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClassesProvider initial={initialClases}>  
      <AuthProvider>
        <App />
      </AuthProvider>
    </ClassesProvider>
  </React.StrictMode>
);