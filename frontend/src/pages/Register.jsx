import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Plane, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.firstName || !form.email || !form.password) {
      setError("First name, email, and password are required.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      setLoading(true);
      await register(form.email, form.password, form.firstName, form.lastName);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
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
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#526159]">Make room for wonder</p>
          <h1 className="text-4xl font-serif text-[#1b2821] mt-4">
            Every journey <span className="text-[#1f5b45] font-semibold">starts with a plan.</span>
          </h1>
          <p className="mt-4 text-[#526159]">Create your free account and turn the places on your list into memories in the making.</p>
        </div>
      </section>

      {/* Right form */}
      <section className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md bg-white rounded-2xl border border-[#d8ddd6] shadow-[0_10px_24px_rgba(31,91,69,0.08)] p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-block p-2 bg-[#edf3ed] rounded-full text-[#1f5b45]"><Plane size={18} /></span>
            <h2 className="text-xl font-bold text-[#1b2821]">Create your account</h2>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-[#526159] mb-1" htmlFor="firstName">First name</label>
                <div className="flex items-center border border-[#d8ddd6] rounded-md p-2.5 focus-within:border-[#1f5b45]">
                  <User className="text-[#8b968e]" size={16} />
                  <input id="firstName" name="firstName" type="text" value={form.firstName} onChange={handleChange}
                    placeholder="Alex" className="ml-2 flex-1 outline-none text-[#1b2821] placeholder:text-[#9ca69f] bg-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-[#526159] mb-1" htmlFor="lastName">Last name</label>
                <div className="flex items-center border border-[#d8ddd6] rounded-md p-2.5 focus-within:border-[#1f5b45]">
                  <User className="text-[#8b968e]" size={16} />
                  <input id="lastName" name="lastName" type="text" value={form.lastName} onChange={handleChange}
                    placeholder="Morgan" className="ml-2 flex-1 outline-none text-[#1b2821] placeholder:text-[#9ca69f] bg-transparent text-sm" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#526159] mb-1" htmlFor="email">Email address</label>
              <div className="flex items-center border border-[#d8ddd6] rounded-md p-2.5 focus-within:border-[#1f5b45]">
                <Mail className="text-[#8b968e]" size={18} />
                <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
                  placeholder="you@example.com" autoComplete="email"
                  className="ml-3 flex-1 outline-none text-[#1b2821] placeholder:text-[#9ca69f] bg-transparent" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#526159] mb-1" htmlFor="password">Password</label>
              <div className="flex items-center border border-[#d8ddd6] rounded-md p-2.5 focus-within:border-[#1f5b45]">
                <LockKeyhole className="text-[#8b968e]" size={18} />
                <input id="password" name="password" type={showPassword ? "text" : "password"}
                  value={form.password} onChange={handleChange}
                  placeholder="At least 6 characters" autoComplete="new-password"
                  className="ml-3 flex-1 outline-none text-[#1b2821] placeholder:text-[#9ca69f] bg-transparent" />
                <button type="button" className="ml-2 text-[#8b968e] hover:text-[#526159]"
                  onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 font-medium">{error}</p>}

            <button
              className="w-full bg-[#1f5b45] text-white font-bold py-3 rounded-md flex items-center justify-center gap-2 hover:bg-[#164634] transition-colors mt-2 disabled:opacity-60"
              type="submit" disabled={loading}
            >
              {loading ? "Creating account..." : <><span>Create account</span><ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#526159]">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-[#1f5b45] hover:underline">Log in</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
