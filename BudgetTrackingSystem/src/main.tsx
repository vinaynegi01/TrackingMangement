import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { MantineProvider } from '@mantine/core';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>
);
