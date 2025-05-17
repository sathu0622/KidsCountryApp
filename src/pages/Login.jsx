import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { themes } from "../components/themes";

export default function Login() {
  const { setToken, theme } = useAuth();
  const currentTheme = themes[theme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setError("");
      const res = await axios.post("https://country-app-backend.vercel.app/api/users/login", {
        email,
        password,
      });
      if (res.data.token) {
        setToken(res.data.token, res.data.expiresIn || 3600);
        navigate("/home");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Oops! Something went wrong. Please try again!");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
    >
      <div 
        className="p-8 rounded-2xl shadow-lg w-full max-w-md relative overflow-hidden"
        style={{ 
          backgroundColor: `${currentTheme.cardBg}cc`,
          border: `4px solid ${currentTheme.primary}`,
          backdropFilter: "blur(5px)"
        }}
      >
        {/* Decorative elements */}
        <div 
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full"
          style={{ backgroundColor: currentTheme.accent, opacity: 0.3 }}
        ></div>
        <div 
          className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full"
          style={{ backgroundColor: currentTheme.primary, opacity: 0.3 }}
        ></div>
        
        <h2 
          className="text-3xl font-bold mb-6 text-center"
          style={{ 
            color: currentTheme.primary,
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            // fontFamily: "'Comic Sans MS', cursive"
          }}
        >
          Welcome Back! 👋
        </h2>
        
        {error && (
          <div 
            className="mb-4 p-3 text-center rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: `${currentTheme.accent}20`,
              color: currentTheme.accent,
              border: `2px dashed ${currentTheme.accent}`
            }}
          >
            <span className="mr-2">⚠️</span>
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label 
            className="block mb-2 font-medium"
            style={{ color: currentTheme.primary }}
          >
            Your Email
          </label>
          <input
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderColor: currentTheme.primary,
              '--tw-ring-color': currentTheme.primary,
              backgroundColor: `${currentTheme.cardBg}80`
            }}
          />
        </div>
        
        <div className="mb-6">
          <label 
            className="block mb-2 font-medium"
            style={{ color: currentTheme.primary }}
          >
            Secret Password
          </label>
          <input
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-4 text-lg"
            type="password"
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderColor: currentTheme.primary,
              '--tw-ring-color': currentTheme.primary,
              backgroundColor: `${currentTheme.cardBg}80`
            }}
          />
        </div>
        
        <button
          className="w-full text-white font-bold py-3 rounded-xl transition-all text-xl hover:scale-105 active:scale-95 shadow-md"
          onClick={handleLogin}
          style={{ 
            backgroundColor: currentTheme.primary,
            // fontFamily: "'Comic Sans MS', cursive"
          }}
        >
          Let's Play! 🎉
        </button>
        
        <p 
          className="mt-6 text-center text-lg"
          style={{ color: currentTheme.primary }}
        >
          New friend?{" "}
          <Link 
            to="/register" 
            className="font-bold hover:underline"
            style={{ color: currentTheme.accent }}
          >
            Join the fun!
          </Link>
        </p>
        
        <div className="flex justify-center mt-4">
          <div 
            className="mx-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <span className="text-white text-xl">🐶</span>
          </div>
          <div 
            className="mx-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: currentTheme.accent }}
          >
            <span className="text-white text-xl">🐱</span>
          </div>
          <div 
            className="mx-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
            style={{ backgroundColor: currentTheme.primary }}
          >
            <span className="text-white text-xl">🐻</span>
          </div>
        </div>
      </div>
    </div>
  );
}