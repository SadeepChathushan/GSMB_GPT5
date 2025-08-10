import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();
    const user = await login(email, password);
    if (user.role === "POLICE") nav("/police");
    else if (user.role === "GSMB") nav("/gsmb");
    else if (user.role === "OWNER") nav("/owner");
    else nav("/");
  }

  return (
    <div>
      <Navbar />
      <section className="max-w-md mx-auto mt-10 p-6 card">
        <h1 className="text-2xl font-bold text-primary mb-4">Login</h1>
        <form onSubmit={submit} className="space-y-4">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="input" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="btn btn-primary w-full">Login</button>
        </form>
        <p className="text-sm text-gray-600 mt-4">Demo: <b>gsmb@gov.lk</b> / <b>Password@123</b> (after seed)</p>
      </section>
    </div>
  );
}
