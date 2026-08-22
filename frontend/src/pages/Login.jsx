import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Plane,
} from "lucide-react";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

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
    setError("");
  }

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="GlobeTrotter introduction">
        <a className="brand" href="/" aria-label="GlobeTrotter home">
          <span className="brand-mark">
            <Plane size={20} aria-hidden="true" />
          </span>
          <span>GlobeTrotter</span>
        </a>
        <div className="intro-copy">
          <p className="eyebrow">Your next story starts here</p>
          <h1>
            Plan the trip
            <br />
            <em>you’ll remember.</em>
          </h1>
          <p className="intro-description">
            Bring every stop, stay, and spontaneous idea into one beautiful
            plan.
          </p>
        </div>
        <div className="route-line" aria-hidden="true">
          <span className="route-dot route-dot-start" />
          <span className="route-stroke" />
          <span className="route-dot route-dot-end" />
          <span className="route-label route-label-start">Lisbon</span>
          <span className="route-label route-label-end">Kyoto</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-form-wrap">
          <div className="mobile-brand brand">
            <span className="brand-mark">
              <Plane size={18} aria-hidden="true" />
            </span>
            <span>GlobeTrotter</span>
          </div>
          <div className="form-heading">
            <p className="eyebrow">Welcome back</p>
            <h2>Log in to your account</h2>
            <p>Pick up where your next adventure begins.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="email">Email address</label>
            <div className="input-wrap">
              <Mail size={18} aria-hidden="true" />
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="password-label-row">
              <label htmlFor="password">Password</label>
              <a href="/forgot-password">Forgot password?</a>
            </div>
            <div className="input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              <button
                className="icon-button"
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="submit-button" type="submit">
              Log in <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
          <p className="signup-prompt">
            New to GlobeTrotter? <a href="/register">Create an account</a>
          </p>
        </div>
        <p className="panel-footer">Plan less. Experience more.</p>
      </section>
    </main>
  );
}

export default Login;
