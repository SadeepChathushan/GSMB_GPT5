import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { Mail, Lock, Shield, Globe, Smartphone, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // UI-only; logic unchanged

  // 🔒 KEEPING YOUR ORIGINAL LOGIN LOGIC
  async function submit(e) {
    e.preventDefault();
    const user = await login(email, password);
    if (user.role === "POLICE") nav("/police");
    else if (user.role === "GSMB") nav("/gsmb");
    else if (user.role === "OWNER") nav("/owner");
    else nav("/");
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked");
  };

  const handleMosipLogin = () => {
    console.log("MOSIP login clicked");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Your Navbar component */}
      <Navbar />

      {/* Main: centered card. No page scroll on desktop; card can scroll on mobile */}
      <div className="flex items-center justify-center flex-1 px-4">
        <div className="w-full max-w-md overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl">
          {/* Header */}
          <div className="px-8 py-6 text-center bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-2xl font-bold text-white">Sign In</h2>
            <p className="mt-1 text-sm text-blue-100">Choose your authentication method</p>
          </div>

          {/* Body */}
          <div className="p-8 overflow-y-auto max-h-[70vh] md:max-h-none md:overflow-visible">
            {/* Alternative Login Methods */}
            <div className="mb-6 space-y-3">
              {/* Google Login */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full gap-3 px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg hover:bg-gray-50 hover:shadow-md group"
              >
                <div className="flex items-center justify-center w-5 h-5 bg-white border rounded shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">
                  Continue with Google
                </span>
              </button>

              {/* MOSIP Login */}
              <button
                type="button"
                onClick={handleMosipLogin}
                className="flex items-center justify-center w-full gap-3 px-4 py-3 transition-all duration-200 border border-orange-300 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 hover:shadow-md group"
              >
                <div className="flex items-center justify-center w-5 h-5 rounded bg-gradient-to-r from-orange-500 to-red-500">
                  <Smartphone className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-gray-700 group-hover:text-gray-900">MOSIP Digital ID</span>
                <span className="px-2 py-1 text-xs text-orange-600 bg-orange-100 rounded-full">
                  Coming Soon
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 text-gray-500 bg-white">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form (your logic kept) */}
            <form onSubmit={submit} className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="block w-full py-3 pl-10 pr-3 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full py-3 pl-10 pr-10 transition-colors duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit (same submit handler) */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In Securely
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="p-4 mt-6 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <Globe className="w-3 h-3 text-blue-600" />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-blue-900">Demo Access</p>
                  <p className="text-xs text-blue-700">
                    Email: <span className="px-1 font-mono bg-blue-100 rounded">gsmb@gov.lk</span>
                  </p>
                  <p className="mt-1 text-xs text-blue-700">
                    Password: <span className="px-1 font-mono bg-blue-100 rounded">Password@123</span>
                  </p>
                  <p className="mt-2 text-xs italic text-blue-600">(Available after seed)</p>
                </div>
              </div>
            </div>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="flex items-center justify-center gap-1 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                Secured by government-grade encryption
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer (always visible, doesn’t push content to cause scroll on desktop) */}
      <div className="py-4 text-center">
        <p className="text-sm text-gray-600">
          Need help accessing your account?{" "}
          <button className="font-medium text-blue-600 hover:text-blue-700">Contact Support</button>
        </p>
        <p className="text-xs text-gray-500">
          Protected by Sri Lankan Government Digital Security Standards
        </p>
      </div>
    </div>
  );
}
