import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../utils/auth";

function Login() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${BASE}/api/token/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        saveTokens(data);
        setMsg("Login successful!");
        setTimeout(()=>nav("/"), 800);
      } else {
        setMsg(data.detail || "Invalid credentials");
      }
    } catch(err) {
      console.error(err);
      setMsg("Login failed");
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center p-3">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "28rem" }}>
        <h2 className="h3 fw-bold mb-3">Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="username" onChange={handleChange} value={form.username} placeholder="Username" required className="form-control mb-3"/>
          <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" required className="form-control mb-3"/>
          <button className="btn btn-primary w-100">Login</button>
        </form>
        {msg && <div className="alert alert-info py-2 mt-3 small mb-0">{msg}</div>}
        <div className="mt-3 small">
          Don't have an account?{" "}
          <a href="/signup" className="link-primary">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
