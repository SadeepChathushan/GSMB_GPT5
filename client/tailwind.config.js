/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF",
        secondary: "#059669",
        alert: "#DC2626",
        warning: "#D97706",
        neutral: "#64748B",
        backdrop: "#F8FAFC"
      }
    },
  },
  plugins: [],
}
