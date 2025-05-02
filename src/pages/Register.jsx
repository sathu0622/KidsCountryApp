import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { themes } from "../components/themes";

export default function Register() {
  const { setToken, theme } = useAuth();
  const currentTheme = themes[theme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      setError("");
      const res = await axios.post("http://localhost:5000/api/users/register", {
        email,
        password,
      });
      if (res.data.token) {
        setToken(res.data.token);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: currentTheme.bg }}
    >
      <div 
        className="p-8 rounded-xl shadow-md w-full max-w-md"
        style={{ 
          backgroundColor: currentTheme.cardBg,
          border: `1px solid ${currentTheme.primary}20`
        }}
      >
        <h2 
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: currentTheme.primary }}
        >
          Register
        </h2>
        {error && (
          <div 
            className="mb-4 p-2 text-center rounded"
            style={{ 
              backgroundColor: `${currentTheme.accent}20`,
              color: currentTheme.accent
            }}
          >
            {error}
          </div>
        )}
        <input
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{
            borderColor: currentTheme.primary,
            '--tw-ring-color': currentTheme.primary
          }}
        />
        <input
          className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{
            borderColor: currentTheme.primary,
            '--tw-ring-color': currentTheme.primary
          }}
        />
        <button
          className="w-full text-white font-semibold py-2 rounded-md transition-colors"
          onClick={handleRegister}
          style={{ 
            backgroundColor: currentTheme.primary,
            '&:hover': {
              backgroundColor: currentTheme.buttonHover
            }
          }}
        >
          Register
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="hover:underline"
            style={{ color: currentTheme.primary }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}