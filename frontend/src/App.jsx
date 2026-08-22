import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { SignIn } from '@clerk/clerk-react';
import { SignUp } from '@clerk/clerk-react';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clerk/sign-in" element={<SignIn routing="path" path="/clerk/sign-in" />} />
        <Route path="/clerk/sign-up" element={<SignUp routing="path" path="/clerk/sign-up" />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
