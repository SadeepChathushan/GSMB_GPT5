import { Shield, LogIn, Globe } from "lucide-react";

/**
 * Reusable Navbar (sticky, dark, rounded language chips, gradient Login)
 *
 * Props:
 * - appName: string               -> e.g., t("appName")
 * - loginLabel: string            -> e.g., t("nav.login")
 * - onLogin: () => void
 * - lang: "en" | "si" | "ta"      -> current language (for active chip)
 * - onSetLang: (code) => void     -> handler to change language
 */
export default function Navbar({
  appName = "mmPro",
  loginLabel = "Login",
  onLogin = () => (window.location.href = "/login"),
  lang = "en",
  onSetLang = () => {},
}) {
  const chipBase =
    "px-3 h-9 inline-flex items-center rounded-md text-sm font-semibold border transition-colors";
  const active = "bg-white text-slate-900 border-white shadow";
  const inactive =
    "bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:text-white";

  return (
    <header className="sticky top-0 z-40 bg-slate-950/98 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Left: logo + name */}
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-lg text-white">{appName}</span>
          </div>

          {/* Right: language chips + login */}
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-white/90" />
            <button
              className={`${chipBase} ${lang === "en" ? active : inactive}`}
              onClick={() => onSetLang("en")}
              aria-pressed={lang === "en"}
              type="button"
            >
              EN
            </button>
            <button
              className={`${chipBase} ${lang === "si" ? active : inactive}`}
              onClick={() => onSetLang("si")}
              aria-pressed={lang === "si"}
              type="button"
            >
              සිං
            </button>
            <button
              className={`${chipBase} ${lang === "ta" ? active : inactive}`}
              onClick={() => onSetLang("ta")}
              aria-pressed={lang === "ta"}
              type="button"
            >
              தமிழ்
            </button>

            <button
              onClick={onLogin}
              className="ml-2 inline-flex items-center gap-2 h-9 px-4 rounded-lg font-medium text-white
                         bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700
                         shadow-md hover:shadow-lg transition-all"
              type="button"
            >
              <LogIn className="w-5 h-5" />
              {loginLabel}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
