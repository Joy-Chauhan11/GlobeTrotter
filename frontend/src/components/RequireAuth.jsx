import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function RequireAuth({ children }) {
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";
  const navigate = useNavigate();

  if (!clerkKey) {
    // No Clerk configured: treat as unauthenticated
    useEffect(() => {
      navigate("/login");
    }, [navigate]);
    return null;
  }

  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) navigate("/login");
  }, [isLoaded, isSignedIn, navigate]);

  if (!isLoaded || !isSignedIn) return null;

  return children;
}
