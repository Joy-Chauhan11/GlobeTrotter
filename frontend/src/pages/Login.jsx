import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Plane } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Enter your email and password to continue.");
      return;
    }
    try {
      setLoading(true);
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-stretch bg-gradient-to-br from-[#f5f3ed] to-[#e6e2d3]">
      {/* Left hero */}
      <section className="w-1/2 hidden md:flex flex-col justify-center items-start p-12 bg-white">
        <Link to="/" className="flex items-center gap-2 text-2xl font-semibold text-[#1f5b45]">
          <span className="inline-block p-1 bg-[#edf3ed] rounded-full"><Plane size={20} /></span>
          <span>GlobeTrotter</span>
        </Link>
        <div className="mt-10 max-w-md">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#526159]">Your next story starts here</p>
          <h1 className="text-4xl font-serif text-[#1b2821] mt-4">
            Plan the trip <span className="text-[#1f5b45] font-semibold">you'll remember.</span>
          </h1>
          <p className="mt-4 text-[#526159]">Bring every stop, stay, and spontaneous idea into one beautiful plan.</p>
        </div>
      </section>

      {/* Right form */}
      <section className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#d8ddd6] shadow-[0_10px_24px_rgba(31,91,69,0.08)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block p-2 bg-[#edf3ed] rounded-full text-[#1f5b45]"><Plane size={18} /></span>
            <h2 className="text-xl font-bold text-[#1b2821]">Welcome back</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#526159] mb-1" htmlFor="email">Email address</label>
              <div className="flex items-center border border-[#d8ddd6] rounded-md p-2.5 focus-within:border-[#1f5b45]">
                <Mail className="text-[#8b968e]" size={18} />
                <input
                  id="email" name="email" type="email"
                  value={form.email} onChange={handleChange}
                  placeholder="you@example.com" autoComplete="email"
                  className="ml-3 flex-1 outline-none text-[#1b2821] placeholder:text-[#9ca69f] bg-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-sm font-bold text-[#526159]" htmlFor="password">Password</label>
              </div>
              <div className="flex items-center border border-[#d8ddd6] rounded-md p-2.5 focus-within:border-[#1f5b45]">
                <LockKeyhole className="text-[#8b968e]" size={18} />
                <input
                  id="password" name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password} onChange={handleChange}
                  placeholder="Enter your password" autoComplete="current-password"
                  className="ml-3 flex-1 outline-none text-[#1b2821] placeholder:text-[#9ca69f] bg-transparent"
                />
                <button type="button" className="ml-2 text-[#8b968e] hover:text-[#526159]"
                  onClick={() => setShowPassword(v => !v)} aria-label="Toggle password">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <button
              className="w-full bg-[#1f5b45] text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#164634] transition-colors mt-2 disabled:opacity-60"
              type="submit" disabled={loading}
            >
              {loading ? "Signing in..." : <><span>Log in</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#526159]">
            New to GlobeTrotter?{" "}
            <Link to="/register" className="font-bold text-[#1f5b45] hover:underline">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
