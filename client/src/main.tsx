import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Analytics } from '@vercel/analytics/react';
import "../public/styles/styles.css";

createRoot(document.getElementById('root')!).render(
    <>
        <App />
        <Analytics />
    </>
);
