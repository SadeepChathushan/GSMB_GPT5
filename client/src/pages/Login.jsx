import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import {
  Mail, Lock, Shield, Smartphone, Eye, EyeOff, Languages
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Language state + dropdown
  const [language, setLanguage] = useState("en"); // en | si | ta
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const langMenuRef = useRef(null);

  // ---- Translations ----
  const translations = {
    en: {
      signIn: "Sign In",
      chooseAuth: "Choose your authentication method",
      continueWithGoogle: "Continue with Google",
      mosipDigitalId: "MOSIP Digital ID",
      comingSoon: "Coming Soon",
      orContinue: "Or continue with email",
      emailAddress: "Email Address",
      enterEmail: "Enter your email",
      password: "Password",
      enterPassword: "Enter your password",
      signInSecurely: "Sign In Securely",
      securedBy: "Secured by government-grade encryption",
      needHelp: "Need help accessing your account?",
      contactSupport: "Contact Support",
      protectedBy: "Protected by Sri Lankan Government Digital Security Standards"
    },
    si: {
      signIn: "පුරනය වන්න",
      chooseAuth: "ඔබේ සත්‍යාපන ක්‍රමය තෝරන්න",
      continueWithGoogle: "Google සමඟ ඉදිරියට යන්න",
      mosipDigitalId: "MOSIP ඩිජිටල් හැඳුනුම්පත",
      comingSoon: "ළඟදීම",
      orContinue: "නැතහොත් ඊමේල් සමඟ ඉදිරියට යන්න",
      emailAddress: "ඊමේල් ලිපිනය",
      enterEmail: "ඔබේ ඊමේල් ඇතුළත් කරන්න",
      password: "මුරපදය",
      enterPassword: "ඔබේ මුරපදය ඇතුළත් කරන්න",
      signInSecurely: "ආරක්ෂිතව පුරනය වන්න",
      securedBy: "රජයේ මට්ටමේ සංකේතනය මගින් ආරක්ෂිතයි",
      needHelp: "ඔබේ ගිණුමට ප්‍රවේශ වීමට උදව් අවශ්‍යද?",
      contactSupport: "සහාය අමතන්න",
      protectedBy: "ශ්‍රී ලංකා රජයේ ඩිජිටල් ආරක්ෂක ප්‍රමිතියන් මගින් ආරක්ෂිතයි"
    },
    ta: {
      signIn: "உள்நுழைக",
      chooseAuth: "உங்கள் அங்கீகார முறையைத் தேர்ந்தெடுக்கவும்",
      continueWithGoogle: "Google உடன் தொடரவும்",
      mosipDigitalId: "MOSIP டிஜிட்டல் அடையாள அட்டை",
      comingSoon: "விரைவில்",
      orContinue: "அல்லது மின்னஞ்சலுடன் தொடரவும்",
      emailAddress: "மின்னஞ்சல் முகவரி",
      enterEmail: "உங்கள் மின்னஞ்சலை உள்ளிடவும்",
      password: "கடவுச்சொல்",
      enterPassword: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
      signInSecurely: "பாதுகாப்பாக உள்நுழைக",
      securedBy: "அரசாங்க தர குறியாக்கத்தால் பாதுகாக்கப்படுகிறது",
      needHelp: "உங்கள் கணக்கை அணுக உதவி தேவையா?",
      contactSupport: "ஆதரவைத் தொடர்புகொள்ளவும்",
      protectedBy: "இலங்கை அரசாங்கத்தின் டிஜிட்டல் பாதுகாப்பு தரநிலைகளால் பாதுகாக்கப்படுகிறது"
    }
  };
  const t = translations[language];

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "si", name: "සිංහල", flag: "🇱🇰" },
    { code: "ta", name: "தமிழ்",  flag: "🇱🇰" }
  ];

  // Language order for cycling
  const languageOrder = ["en", "si", "ta"];
  const cycleLanguage = () => {
    setLanguage(prev => {
      const i = languageOrder.indexOf(prev);
      return languageOrder[(i + 1) % languageOrder.length];
    });
  };

  // Persist + apply selected language
  useEffect(() => {
    const saved = localStorage.getItem("app_lang");
    if (saved && ["en", "si", "ta"].includes(saved)) setLanguage(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("app_lang", language);
    document.documentElement.lang = language;
  }, [language]);

  // Close language menu on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (!langMenuRef.current) return;
      if (!langMenuRef.current.contains(e.target)) setShowLanguageMenu(false);
    };
    if (showLanguageMenu) document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [showLanguageMenu]);

  const changeLanguage = (code) => {
    setLanguage(code);
    setShowLanguageMenu(false);
  };

  // Login flow
  async function submit(e) {
    e.preventDefault();
    const user = await login(email, password);
    if (user.role === "POLICE") nav("/police");
    else if (user.role === "GSMB") nav("/gsmb");
    else if (user.role === "OWNER") nav("/owner");
    else nav("/");
  }

  const handleGoogleLogin = () => console.log("Google login clicked");
  const handleMosipLogin  = () => console.log("MOSIP login clicked");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#eef5ff] via-white to-[#e6f0ff]">
      {/* Language Selector */}
      <div className="fixed z-50 top-5 right-5" ref={langMenuRef}>
        <div className="relative">
          <button
            onClick={(e) => {
              if (e.shiftKey) {
                setShowLanguageMenu(v => !v); // Shift+Click toggles dropdown
              } else {
                cycleLanguage();               // Click cycles language
                setShowLanguageMenu(false);
              }
            }}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 border border-gray-200 shadow-sm md:text-base bg-white/90 backdrop-blur rounded-xl hover:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            aria-haspopup="listbox"
            aria-expanded={showLanguageMenu}
            title="Click to switch language • Shift+Click to open menu"
          >
            <Languages className="w-5 h-5" />
            <span className="hidden sm:inline">
              {languages.find(l => l.code === language)?.name}
            </span>
            <span className="sm:hidden">
              {languages.find(l => l.code === language)?.flag}
            </span>
          </button>

          {showLanguageMenu && (
            <div
              role="listbox"
              className="absolute right-0 w-40 mt-2 overflow-hidden bg-white border border-gray-200 shadow-xl rounded-xl"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  role="option"
                  aria-selected={language === lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-3 py-2.5 text-left text-sm md:text-base hover:bg-gray-50 flex items-center gap-2 ${
                    language === lang.code ? "bg-blue-50 text-blue-700" : "text-gray-700"
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span className="font-medium">{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="flex items-center justify-center flex-1 px-3 py-8 sm:px-6">
        <div className="w-full max-w-xl overflow-hidden border border-gray-100 shadow-2xl bg-white/95 backdrop-blur rounded-2xl">
          {/* Header */}
          <div className="px-6 py-6 text-center md:px-10 md:py-8 bg-gradient-to-r from-blue-600 to-purple-600">
            <h2 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
              {t.signIn}
            </h2>
            <p className="mt-2 text-sm text-blue-100 md:text-base">
              {t.chooseAuth}
            </p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 md:px-10 md:py-8">
            {/* Alt logins */}
            <div className="space-y-3 md:space-y-4">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-3.5 transition-all duration-200 border border-gray-300 rounded-xl hover:bg-gray-50 hover:shadow-md active:bg-gray-100"
              >
                <div className="flex items-center justify-center w-5 h-5 bg-white border rounded shadow-sm">
                  <svg viewBox="0 0 24 24" className="w-4 h-4">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <span className="text-sm font-semibold text-gray-800 md:text-base">
                  {t.continueWithGoogle}
                </span>
              </button>

              <button
                type="button"
                onClick={handleMosipLogin}
                className="flex items-center justify-between w-full gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-3.5 transition-all duration-200 border border-orange-300 rounded-xl bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 hover:shadow-md"
              >
                <span className="inline-flex items-center gap-3">
                  <span className="flex items-center justify-center w-5 h-5 rounded bg-gradient-to-r from-orange-500 to-red-500">
                    <Smartphone className="w-3 h-3 text-white" />
                  </span>
                  <span className="text-sm font-semibold text-gray-800 md:text-base">
                    {t.mosipDigitalId}
                  </span>
                </span>
                <span className="px-2.5 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                  {t.comingSoon}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6 md:my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-sm text-gray-500 bg-white md:text-base">
                  {t.orContinue}
                </span>
              </div>
            </div>

            {/* Email / Password */}
            <form onSubmit={submit} className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 md:text-base">
                  {t.emailAddress}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="block w-full py-3.5 md:py-4 pl-11 pr-4 text-base md:text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white"
                    placeholder={t.enterEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-800 md:text-base">
                  {t.password}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full py-3.5 md:py-4 pl-11 pr-12 text-base md:text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 focus:bg-white"
                    placeholder={t.enterPassword}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-4"
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

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 md:py-4 px-4 rounded-xl text-base md:text-lg font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t.signInSecurely}
              </button>
            </form>

            {/* Security */}
            <div className="mt-6 text-center md:mt-8">
              <p className="flex items-center justify-center gap-2 text-xs text-gray-500 md:text-sm">
                <Shield className="w-4 h-4" />
                <span>{t.securedBy}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-5 text-center">
        <p className="mb-1 text-xs text-gray-600 md:text-sm">
          {t.needHelp}{" "}
          <button className="font-semibold text-blue-600 hover:text-blue-700">
            {t.contactSupport}
          </button>
        </p>
        <p className="text-[11px] md:text-xs leading-relaxed text-gray-500">
          {t.protectedBy}
        </p>
      </div>
    </div>
  );
}
