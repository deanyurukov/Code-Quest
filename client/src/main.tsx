import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { Analytics } from '@vercel/analytics/react';
import "./styles/app.css";
import { SpeedInsights } from '@vercel/speed-insights/react';

createRoot(document.getElementById('root')!).render(
    <>
        <App />
        <Analytics />
        <SpeedInsights />
    </>
);