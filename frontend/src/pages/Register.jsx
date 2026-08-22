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
import "./Login.css";

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
    setError("");
  }

  return (
    <main className="login-page register-page">
      <section className="login-intro" aria-label="GlobeTrotter introduction">
        <a className="brand" href="/login" aria-label="GlobeTrotter home">
          <span className="brand-mark">
            <Plane size={20} aria-hidden="true" />
          </span>
          <span>GlobeTrotter</span>
        </a>
        <div className="intro-copy">
          <p className="eyebrow">Make room for wonder</p>
          <h1>
            Every journey
            <br />
            <em>starts with a plan.</em>
          </h1>
          <p className="intro-description">
            Create your free account and turn the places on your list into
            memories in the making.
          </p>
        </div>
        <div className="route-line" aria-hidden="true">
          <span className="route-dot route-dot-start" />
          <span className="route-stroke" />
          <span className="route-dot route-dot-end" />
          <span className="route-label route-label-start">Dream</span>
          <span className="route-label route-label-end">Discover</span>
        </div>
      </section>

      <section className="login-panel">
        <div className="login-form-wrap">
          <a
            className="mobile-brand brand"
            href="/login"
            aria-label="GlobeTrotter home"
          >
            <span className="brand-mark">
              <Plane size={18} aria-hidden="true" />
            </span>
            <span>GlobeTrotter</span>
          </a>
          <div className="form-heading">
            <p className="eyebrow">Start exploring</p>
            <h2>Create your account</h2>
            <p>Save your plans and keep every adventure in reach.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="name">Full name</label>
            <div className="input-wrap">
              <UserRound size={18} aria-hidden="true" />
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                autoComplete="name"
              />
            </div>
            <label className="register-field-label" htmlFor="email">
              Email address
            </label>
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
            <label className="register-field-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                autoComplete="new-password"
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
            <label className="register-field-label" htmlFor="confirmation">
              Confirm password
            </label>
            <div className="input-wrap">
              <LockKeyhole size={18} aria-hidden="true" />
              <input
                id="confirmation"
                name="confirmation"
                type={showConfirmation ? "text" : "password"}
                value={form.confirmation}
                onChange={handleChange}
                placeholder="Repeat your password"
                autoComplete="new-password"
              />
              <button
                className="icon-button"
                type="button"
                onClick={() => setShowConfirmation((visible) => !visible)}
                aria-label={
                  showConfirmation
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
              >
                {showConfirmation ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <label className="terms-label" htmlFor="terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={form.terms}
                onChange={handleChange}
              />
              <span>
                I agree to the <a href="/terms">terms and conditions</a>.
              </span>
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="submit-button" type="submit">
              Create account <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
          <p className="signup-prompt">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
        <p className="panel-footer">Plan less. Experience more.</p>
      </section>
    </main>
  );
}

export default Register;
