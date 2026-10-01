import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [msg, setMsg] = useState("");
  const nav = useNavigate();

  const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch(`${BASE}/api/register/`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if(res.ok) {
        setMsg("Account created. Redirecting to login...");
        setTimeout(()=>nav("/login"), 1200);
      } else {
        setMsg(data.username || data.password || JSON.stringify(data));
      }
    } catch(err) {
      console.error(err);
      setMsg("Signup failed");
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center p-3">
      <div className="card shadow-sm p-4 w-100" style={{ maxWidth: "28rem" }}>
        <h2 className="h3 fw-bold mb-3">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input name="username" onChange={handleChange} value={form.username} placeholder="Username" required className="form-control mb-3"/>
          <input name="email" type="email" onChange={handleChange} value={form.email} placeholder="Email" className="form-control mb-3"/>
          <input name="password" type="password" onChange={handleChange} value={form.password} placeholder="Password" required className="form-control mb-3"/>
          <input name="password2" type="password" onChange={handleChange} value={form.password2} placeholder="Confirm Password" required className="form-control mb-3"/>
          <button className="btn btn-primary w-100">Create Account</button>
        </form>
        {msg && <div className="alert alert-info py-2 mt-3 small mb-0">{msg}</div>}
      </div>
    </div>
  );
}

export default Signup;
