import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "../public/styles/styles.css";
import { Analytics } from '@vercel/analytics/react';

createRoot(document.getElementById('root')!).render(
    <>
        <App />
        <Analytics />
    </>
);
