import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function RequireAuth({ children }) {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";

  return clerkKey ? <ClerkAuth>{children}</ClerkAuth> : <NoClerkAuth />;
}

function NoClerkAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return null;
}

function ClerkAuth({ children }) {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate("/login");
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) return null;

  return children;
}
