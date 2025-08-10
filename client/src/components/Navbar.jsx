import { Shield, LogIn } from "lucide-react";

/**
 * Reusable Navbar
 * Props:
 * - appName: string
 * - loginLabel: string
 * - onLogin: () => void
 * - rightSlot: ReactNode (e.g., <LanguageSwitcher />)
 */
export default function Navbar({ appName, loginLabel, onLogin, rightSlot }) {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: logo + name */}
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-400" />
          <span className="font-bold text-lg">{appName}</span>
        </div>

        {/* Right: language switcher + login */}
        <div className="flex items-center gap-3">
          {rightSlot}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            onClick={onLogin}
          >
            <LogIn className="w-5 h-5" />
            <span className="font-medium">{loginLabel}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
