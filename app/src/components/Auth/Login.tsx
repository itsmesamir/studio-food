import React, { useState } from "react";
import axios from "axios";

interface LoginProps {
  setToken: (token: string) => void;
  setRole: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken, setRole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setRole(data.role);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
