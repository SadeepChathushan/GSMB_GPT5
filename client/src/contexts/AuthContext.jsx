import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const Ctx = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem("user");
    return cached ? JSON.parse(cached) : null;
  });

  async function login(email, password) {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return <Ctx.Provider value={{ user, setUser, login, logout }}>{children}</Ctx.Provider>;
}
export function useAuth() { return useContext(Ctx); }
