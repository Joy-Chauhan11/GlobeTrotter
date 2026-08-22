import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Plane,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }
    // Instruct user to use Clerk for now
    navigate("/clerk/sign-in");
  }

  return (
    <main className="min-h-screen flex items-stretch bg-gradient-to-br from-white to-purple-50">
      <section className="w-1/2 hidden md:flex flex-col justify-center items-start p-12 bg-white">
        <a
          className="flex items-center gap-2 text-2xl font-semibold text-purple-700"
          href="/"
        >
          <span className="brand-mark inline-block p-1 bg-purple-100 rounded-full">
            <Plane size={20} />
          </span>
          <span>GlobeTrotter</span>
        </a>
        <div className="mt-10 max-w-md">
          <p className="text-sm text-gray-500">Your next story starts here</p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-4">
            Plan the trip{" "}
            <span className="text-purple-600">you’ll remember.</span>
          </h1>
          <p className="mt-4 text-gray-600">
            Bring every stop, stay, and spontaneous idea into one beautiful
            plan.
          </p>
        </div>
      </section>

      <section className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="brand-mark inline-block p-2 bg-purple-100 rounded-full">
              <Plane size={18} />
            </span>
            <h2 className="text-xl font-semibold">Welcome back</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
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
              <div className="flex justify-between items-center">
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <a className="text-sm text-purple-600" href="/forgot-password">
                  Forgot?
                </a>
              </div>
              <div className="flex items-center border rounded-md p-2">
                <LockKeyhole className="text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="ml-3 flex-1 outline-none"
                />
                <button
                  type="button"
                  className="ml-2 text-gray-500"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              className="w-full bg-purple-600 text-white py-2 rounded-md flex items-center justify-center gap-2"
              type="submit"
            >
              Log in <ArrowRight size={16} />
            </button>

            <div className="text-center text-sm text-gray-500">or</div>

            <button
              type="button"
              onClick={() => navigate("/clerk/sign-in")}
              className="w-full border border-gray-200 py-2 rounded-md"
            >
              Continue with Clerk
            </button>
          </form>

          <p className="mt-6 text-center text-sm">
            New to GlobeTrotter?{" "}
            <a className="text-purple-600" href="/register">
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}

export default Login;
