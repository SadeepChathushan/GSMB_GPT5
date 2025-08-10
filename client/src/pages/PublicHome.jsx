import { useState, useContext, createContext, useEffect } from "react";
import { Search, Truck, MapPin, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import Navbar from "../components/Navbar.jsx";

/* ---------------------- Multilingual Setup ---------------------- */

const messages = {
  en: {
    appName: "mmPro",
    nav: { login: "Login" },
    hero: {
      title: "Verify Mining Transport",
      subtitle: "Ensure mining vehicles are properly licensed and authorized for operations",
    },
    search: {
      title: "Enter Lorry Details",
      hint: "Input the lorry number to verify its authorization status",
      placeholder: "Enter Lorry Number (e.g., LL-2345)",
      btn_lookup: "Lookup",
      checking: "Checking...",
    },
    result: {
      lorryNumber: "Lorry Number",
      owner_label: "Registered Owner",
      active_msg: "This vehicle is properly authorized for mining operations",
      invalid_msg: "This lorry number is not registered in our system",
      suspended_msg: "This vehicle's authorization has been suspended",
      expired_msg: "This vehicle's authorization has expired",
      report_btn: "Report Violation",
      report_submitting: "Submitting Report...",
      report_success_title: "Report Submitted Successfully!",
      report_success_desc:
        "Thank you for helping maintain mining transport compliance. Your report has been forwarded to the relevant authorities.",
    },
    status: { ACTIVE: "ACTIVE", INVALID: "INVALID", SUSPENDED: "SUSPENDED", EXPIRED: "EXPIRED" },
    cards: {
      c1_title: "Secure Verification",
      c1_desc: "Real-time validation against official mining transport database",
      c2_title: "Location Tracking",
      c2_desc: "GPS coordinates captured for violation reports",
      c3_title: "Instant Reporting",
      c3_desc: "Quick violation reporting to relevant authorities",
    },
    switcher: { label: "Language" },
  },
  si: {
    appName: "mmPro",
    nav: { login: "පිවිසෙන්න" },
    hero: {
      title: "පතල් කැණීම් ප්‍රවාහනය තහවුරු කරන්න",
      subtitle: "පතල් කැණීම් වාහන නිසි ලෙස බලපත්‍රලත් සහ මෙහෙයුම් සඳහා අවසරලත් ඒවාදැයි තහවුරු කරන්න",
    },
    search: {
      title: "ලොරි විස්තර ඇතුළත් කරන්න",
      hint: "අවසර තත්ත්වය පරීක්ෂා කිරීමට ලොරි අංකය ඇතුළත් කරන්න",
      placeholder: "ලොරි අංකය (උදා: LL-2345)",
      btn_lookup: "සොයන්න",
      checking: "පරීක්ෂා කරමින්...",
    },
    result: {
      lorryNumber: "ලොරි අංකය",
      owner_label: "ලියාපදිංචි හිමිකරු",
      active_msg: "මෙම වාහනයට පතල් කැණීම් මෙහෙයුම් සඳහා නිසි අවසර ඇත",
      invalid_msg: "මෙම ලොරි අංකය පද්ධතියේ ලියාපදිංචි කර නොමැත",
      suspended_msg: "මෙම වාහනයේ අවසරය අත්හිටුවා ඇත",
      expired_msg: "මෙම වාහනයේ අවසරය කල් ඉකුත් වී ඇත",
      report_btn: "උල්ලංඝනය වාර්තා කරන්න",
      report_submitting: "වාර්තාව යොමු කරමින්...",
      report_success_title: "වාර්තාව සාර්ථකව යොමු විය!",
      report_success_desc:
        "පතල් කැණීම් ප්‍රවාහන අනුකූලතාව පවත්වා ගැනීමට උදව් කිරීම ගැන ඔබට ස්තුතියි. ඔබේ වාර්තාව අදාළ බලධාරීන් වෙත යොමු කර ඇත.",
    },
    status: { ACTIVE: "සක්‍රීයයි", INVALID: "වලංගු නොවේ", SUSPENDED: "අත්හිටුවා ඇත", EXPIRED: "කල් ඉකුත්" },
    cards: {
      c1_title: "ආරක්ෂිත සත්‍යාපනය",
      c1_desc: "නිල පතල් කැණීම් ප්‍රවාහන දත්ත සමුදායට එරෙහිව තත්‍ය කාලීන සත්‍යාපනය",
      c2_title: "ස්ථාන ලුහුබැඳීම",
      c2_desc: "උල්ලංඝන වාර්තා සඳහා GPS ඛණ්ඩාංක ලබා ගනී",
      c3_title: "ක්ෂණික වාර්තා කිරීම",
      c3_desc: "අදාළ බලධාරීන්ට ඉක්මන් උල්ලංඝන වාර්තා කිරීම",
    },
    switcher: { label: "භාෂාව" },
  },
  ta: {
    appName: "mmPro",
    nav: { login: "உள்நுழைக" },
    hero: {
      title: "சுரங்கப் போக்குவரத்தை சரிபார்க்கவும்",
      subtitle:
        "சுரங்க வாகனங்கள் உரிய உரிமம் மற்றும் செயல்பாடுகளுக்கான அங்கீகாரம் பெற்றுள்ளனவா என்பதை உறுதிப்படுத்தவும்",
    },
    search: {
      title: "லாரி விவரங்களை உள்ளிடவும்",
      hint: "லாரியின் அங்கீகார நிலையைச் சரிபார்க்க அதன் எண்ணை உள்ளிடவும்",
      placeholder: "லாரி எண் (உதா., LL-2345)",
      btn_lookup: "தேடுக",
      checking: "சரிபார்க்கிறது...",
    },
    result: {
      lorryNumber: "லாரி எண்",
      owner_label: "பதிவுசெய்யப்பட்ட உரிமையாளர்",
      active_msg: "இந்த வாகனத்திற்கு சுரங்க நடவடிக்கைகளுக்கு சரியான அனுமதி உள்ளது",
      invalid_msg: "இந்த லாரி எண் எங்கள் அமைப்பில் பதிவு செய்யப்படவில்லை",
      suspended_msg: "இந்த வாகனத்தின் அங்கீகாரம் இடைநிறுத்தப்பட்டுள்ளது",
      expired_msg: "இந்த வாகனத்தின் அங்கீகாரம் காலாவதியாகிவிட்டது",
      report_btn: "மீறலைப் புகாரளிக்கவும்",
      report_submitting: "புகார் சமர்ப்பிக்கப்படுகிறது...",
      report_success_title: "புகார் வெற்றிகரமாக சமர்ப்பிக்கப்பட்டது!",
      report_success_desc:
        "சுரங்கப் போக்குவரத்து இணக்கத்தை பராமரிக்க உதவியதற்கு நன்றி. உங்கள் புகார் சம்பந்தப்பட்ட அதிகாரிகளுக்கு அனுப்பப்பட்டுள்ளது.",
    },
    status: { ACTIVE: "செயலில்", INVALID: "செல்லாதது", SUSPENDED: "இடைநிறுத்தப்பட்டது", EXPIRED: "காலாவதியானது" },
    cards: {
      c1_title: "பாதுகாப்பான சரிபார்ப்பு",
      c1_desc: "அதிகாரப்பூர்வ சுரங்க போக்குவரத்து தரவுத்தளத்திற்கு எதிராக நிகழ்நேர சரிபார்ப்பு",
      c2_title: "இருப்பிட கண்காணிப்பு",
      c2_desc: "மீறல் புகார்களுக்கு GPS ஆயத்தொலைவுகள் கைப்பற்றப்படும்",
      c3_title: "உடனடிப் புகாரளித்தல்",
      c3_desc: "சம்பந்தப்பட்ட அதிகாரிகளுக்கு விரைவான மீறல் புகாரளித்தல்",
    },
    switcher: { label: "மொழி" },
  },
};

const LanguageContext = createContext(null);
const useLanguage = () => useContext(LanguageContext);

function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("mmpro_lang") || "en");

  useEffect(() => {
    localStorage.setItem("mmpro_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = "ltr";
  }, [lang]);

  const t = (key) => {
    const parts = key.split(".");
    let cur = messages[lang];
    for (const p of parts) {
      cur = cur?.[p];
      if (cur == null) break;
    }
    if (cur == null) {
      let curEn = messages.en;
      for (const p of parts) {
        curEn = curEn?.[p];
        if (curEn == null) break;
      }
      return curEn ?? key;
    }
    return cur;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

const StatusBadge = ({ status }) => {
  const { t } = useLanguage();
  const cfg = {
    ACTIVE: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle, label: t("status.ACTIVE") },
    INVALID: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle, label: t("status.INVALID") },
    SUSPENDED: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle, label: t("status.SUSPENDED") },
    EXPIRED: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: XCircle, label: t("status.EXPIRED") },
  };
  const config = cfg[status] || cfg.INVALID;
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
      <Icon className="w-4 h-4" />
      {config.label}
    </span>
  );
};

/* ---------------------- Mock API ---------------------- */
const api = {
  get: async (_url, options) => {
    await new Promise((r) => setTimeout(r, 800));
    const lorryNumber = options.params.lorryNumber;
    const mockData = {
      "LL-1234": { status: "ACTIVE", owner: { name: "Lanka Mining Corp" } },
      "LL-5678": { status: "SUSPENDED", owner: { name: "Mountain Excavators Ltd" } },
      "LL-9999": { status: "EXPIRED", owner: { name: "Deep Earth Mining" } },
    };
    return { data: mockData[lorryNumber] || { status: "INVALID" } };
  },
  post: async (_url, _data) => {
    await new Promise((r) => setTimeout(r, 600));
    return { data: { ok: true } };
  },
};

/* ---------------------- Page ---------------------- */

function Content() {
  const { t, lang, setLang } = useLanguage();
  const [lorry, setLorry] = useState("");
  const [result, setResult] = useState(null);
  const [reportDone, setReportDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);

  async function lookup() {
    if (!lorry.trim()) return;
    setLoading(true);
    setResult(null);
    setReportDone(false);
    try {
      const { data } = await api.get("/public/lookup", { params: { lorryNumber: lorry } });
      setResult(data);
    } catch (e) {
      console.error("Lookup failed:", e);
    }
    setLoading(false);
  }

  async function report() {
    setReportLoading(true);
    const coords = await new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(
        (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => resolve({ lat: null, lng: null })
      )
    );

    const form = new FormData();
    form.append("lorryNumber", lorry);
    form.append("lat", coords.lat || "");
    form.append("lng", coords.lng || "");

    try {
      const { data } = await api.post("/public/report", form);
      if (data.ok) setReportDone(true);
    } catch (e) {
      console.error("Report failed:", e);
    }
    setReportLoading(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && lorry && !loading) lookup();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar
        appName={t("appName")}
        loginLabel={t("nav.login")}
        onLogin={() => (window.location.href = "/login")}
        lang={lang}
        onSetLang={setLang}
      />

      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Truck className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("hero.title")}</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">{t("hero.subtitle")}</p>
        </div>
      </div>

      {/* Main */}
      <section className="max-w-2xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Search */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{t("search.title")}</h2>
              <p className="text-gray-600">{t("search.hint")}</p>
            </div>

            <div className="relative">
              <div className="relative flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-mono placeholder-gray-400"
                    placeholder={t("search.placeholder")}
                    value={lorry}
                    onChange={(e) => setLorry(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
                    aria-label={t("search.title")}
                  />
                </div>
                <button
                  className={`px-8 py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center ${
                    !lorry || loading
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  }`}
                  onClick={lookup}
                  disabled={!lorry || loading}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {t("search.checking")}
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      {t("search.btn_lookup")}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
              <div className={`p-6 rounded-xl border-2 ${result.status === "ACTIVE" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${result.status === "ACTIVE" ? "bg-green-100" : "bg-red-100"}`}>
                      <Truck className={`w-6 h-6 ${result.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">{t("result.lorryNumber")}</p>
                      <p className="font-mono text-2xl font-bold text-gray-800">{lorry}</p>
                    </div>
                  </div>
                  <StatusBadge status={result.status === "INVALID" ? "INVALID" : result.status} />
                </div>

                {/* Owner */}
                {result.owner && (
                  <div className="mb-4 p-4 bg-white/60 rounded-lg border border-white/40">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">{t("result.owner_label")}</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800 mt-1">{result.owner.name}</p>
                  </div>
                )}

                {/* Status Msg */}
                <div className="mb-4">
                  {result.status === "ACTIVE" ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">{t("result.active_msg")}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-medium">
                        {result.status === "INVALID" && t("result.invalid_msg")}
                        {result.status === "SUSPENDED" && t("result.suspended_msg")}
                        {result.status === "EXPIRED" && t("result.expired_msg")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Report */}
                {result.status !== "ACTIVE" && !reportDone && (
                  <button
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                      reportLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    }`}
                    onClick={report}
                    disabled={reportLoading}
                  >
                    {reportLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        {t("result.report_submitting")}
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5" />
                        {t("result.report_btn")}
                      </>
                    )}
                  </button>
                )}

                {/* Success */}
                {reportDone && (
                  <div className="p-4 bg-green-100 border border-green-200 rounded-xl animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">{t("result.report_success_title")}</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">{t("result.report_success_desc")}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">{t("cards.c1_title")}</h3>
            <p className="text-sm text-gray-600">{t("cards.c1_desc")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">{t("cards.c2_title")}</h3>
            <p className="text-sm text-gray-600">{t("cards.c2_desc")}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">{t("cards.c3_title")}</h3>
            <p className="text-sm text-gray-600">{t("cards.c3_desc")}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------------------- Export ---------------------- */

export default function PublicHome() {
  return (
    <LanguageProvider>
      <Content />
    </LanguageProvider>
  );
}
