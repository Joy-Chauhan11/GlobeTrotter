import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

const root = createRoot(document.getElementById('root'));

if (!clerkKey) {
  // Render app without Clerk but show a clear warning. This avoids runtime
  // failures when the publishable key is not set in Vite env.
  console.warn('VITE_CLERK_PUBLISHABLE_KEY is not set. Clerk routes will be disabled.');
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  root.render(
    <StrictMode>
      <ClerkProvider publishableKey={clerkKey}>
        <App />
      </ClerkProvider>
    </StrictMode>
  );
}
