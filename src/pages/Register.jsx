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
      const res = await axios.post("https://country-app-backend.vercel.app/api/users/register", {
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Whoops! That didn't work. Let's try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div 
        className="p-6 rounded-2xl w-full max-w-sm relative overflow-hidden"
        style={{ 
          backgroundColor: `${currentTheme.cardBg}dd`,
          border: `3px solid ${currentTheme.primary}`,
          boxShadow: `0 6px 15px ${currentTheme.primary}40`
        }}
      >
        {/* Decorative elements */}
        <div 
          className="absolute -top-8 -left-8 w-16 h-16 rounded-full"
          style={{ backgroundColor: currentTheme.accent, opacity: 0.4 }}
        ></div>
        <div 
          className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full"
          style={{ backgroundColor: currentTheme.primary, opacity: 0.4 }}
        ></div>
        
        <h2 
          className="text-2xl font-bold mb-6 text-center"
          style={{ 
            color: currentTheme.primary,
            textShadow: "2px 2px 0px rgba(0,0,0,0.1)"
          }}
        >
          Join the Adventure! 🚀
        </h2>
        
        {error && (
          <div 
            className="mb-4 p-2 text-center rounded-lg flex items-center justify-center"
            style={{ 
              backgroundColor: `${currentTheme.accent}30`,
              color: currentTheme.accent,
              border: `2px dotted ${currentTheme.accent}`
            }}
          >
            <span className="mr-1 text-xl">🤔</span>
            <span className="text-md">{error}</span>
          </div>
        )}
        
        <div className="mb-4">
          <label 
            className="block mb-2 text-lg"
            style={{ color: currentTheme.primary }}
          >
            Your Magic Email ✨
          </label>
          <input
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 text-lg"
            placeholder="yourname@magic.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderColor: currentTheme.primary,
              '--tw-ring-color': currentTheme.primary,
              backgroundColor: `${currentTheme.cardBg}90`
            }}
          />
        </div>
        
        <div className="mb-6">
          <label 
            className="block mb-2 text-lg"
            style={{ color: currentTheme.primary }}
          >
            Super Secret Code 🔐
          </label>
          <input
            className="w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 text-lg"
            type="password"
            placeholder="Make it strong!"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              borderColor: currentTheme.primary,
              '--tw-ring-color': currentTheme.primary,
              backgroundColor: `${currentTheme.cardBg}90`
            }}
          />
          <div 
            className="mt-1 text-xs"
            style={{ color: currentTheme.primary }}
          >
            (Make it as strong as a superhero!)
          </div>
        </div>
        
        <button
          className="w-full text-white font-bold py-3 rounded-xl transition-all text-xl hover:scale-[1.02] active:scale-95 shadow-md"
          onClick={handleRegister}
          style={{ 
            backgroundColor: currentTheme.primary,
            backgroundImage: `linear-gradient(to bottom right, ${currentTheme.primary}, ${currentTheme.accent})`
          }}
        >
          Create Account! 🎨
        </button>
        
        <p 
          className="mt-6 text-center text-md"
          style={{ color: currentTheme.primary }}
        >
          Already part of the club?{" "}
          <Link 
            to="/login" 
            className="font-bold hover:underline"
            style={{ color: currentTheme.accent }}
          >
            Sign In Here!
          </Link>
        </p>
        
        <div className="flex justify-center mt-4 space-x-3">
          {["🦄", "🐙", "🦖", "🐳"].map((emoji, index) => (
            <div 
              key={index}
              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-200"
              style={{ 
                backgroundColor: index % 2 ? currentTheme.primary : currentTheme.accent
              }}
            >
              <span className="text-xl">{emoji}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}