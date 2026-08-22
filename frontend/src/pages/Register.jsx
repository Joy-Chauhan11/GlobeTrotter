import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Plane,
  UserRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmation: "",
    terms: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirmation) {
      setError("Complete all fields to create your account.");
      return;
    }
    if (form.password !== form.confirmation) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.terms) {
      setError("Please accept the terms to continue.");
      return;
    }
    // Redirect to Clerk sign-up page
    navigate("/clerk/sign-up");
  }

  return (
    <main className="min-h-screen flex items-stretch bg-gradient-to-br from-white to-purple-50">
      <section className="w-1/2 hidden md:flex flex-col justify-center items-start p-12 bg-white">
        <a
          className="flex items-center gap-2 text-2xl font-semibold text-purple-700"
          href="/login"
        >
          <span className="brand-mark inline-block p-1 bg-purple-100 rounded-full">
            <Plane size={20} />
          </span>
          <span>GlobeTrotter</span>
        </a>
        <div className="mt-10 max-w-md">
          <p className="text-sm text-gray-500">Make room for wonder</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
            Every journey{" "}
            <span className="text-purple-600">starts with a plan.</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Create your free account and turn the places on your list into
            memories in the making.
          </p>
        </div>
      </section>

      <section className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="brand-mark inline-block p-2 bg-purple-100 rounded-full">
              <Plane size={18} />
            </span>
            <h2 className="text-xl font-semibold">Create your account</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Full name
              </label>
              <div className="flex items-center border rounded-md p-2">
                <UserRound className="text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  className="ml-3 flex-1 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Email address
              </label>
              <div className="flex items-center border rounded-md p-2">
                <Mail className="text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="ml-3 flex-1 outline-none"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex items-center border rounded-md p-2">
                <LockKeyhole className="text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="ml-3 flex-1 outline-none"
                />
                <button
                  className="ml-2 text-gray-500"
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="confirmation"
              >
                Confirm password
              </label>
              <div className="flex items-center border rounded-md p-2">
                <LockKeyhole className="text-gray-400" />
                <input
                  id="confirmation"
                  name="confirmation"
                  type={showConfirmation ? "text" : "password"}
                  value={form.confirmation}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  autoComplete="new-password"
                  className="ml-3 flex-1 outline-none"
                />
                <button
                  className="ml-2 text-gray-500"
                  type="button"
                  onClick={() => setShowConfirmation((v) => !v)}
                  aria-label="Toggle confirmation"
                >
                  {showConfirmation ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={form.terms}
                onChange={handleChange}
              />
              <span>
                I agree to the{" "}
                <a className="text-purple-600" href="/terms">
                  terms and conditions
                </a>
                .
              </span>
            </label>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              className="w-full bg-purple-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
              type="submit"
            >
              Create account <ArrowRight size={16} />
            </button>

            <div className="text-center text-sm text-gray-500">or</div>

            <button
              type="button"
              onClick={() => navigate("/clerk/sign-up")}
              className="w-full border border-gray-200 py-2 rounded-md"
            >
              Continue with Clerk
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <a className="text-purple-600" href="/login">
              Log in
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Register;
