import { useState } from "react";
import { Search, Truck, MapPin, Shield, AlertTriangle, CheckCircle, XCircle, LogIn } from "lucide-react";

// Navbar with system name "mmPro" + Login button
const Navbar = () => (
  <nav className="bg-slate-900 text-white p-4 shadow-lg">
    <div className="max-w-6xl mx-auto flex items-center justify-between">
      {/* Left: logo + name */}
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-blue-400" />
        <span className="font-bold text-lg">mmPro</span>
      </div>

      {/* Right: Login button */}
      <button
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        onClick={() => {
          // redirect; swap to react-router navigate if you prefer
          window.location.href = "/login";
        }}
      >
        <LogIn className="w-5 h-5" />
        <span className="font-medium">Login</span>
      </button>
    </div>
  </nav>
);

const StatusBadge = ({ status }) => {
  const configs = {
    ACTIVE: { color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle },
    INVALID: { color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
    SUSPENDED: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", icon: AlertTriangle },
    EXPIRED: { color: "bg-orange-100 text-orange-800 border-orange-200", icon: XCircle },
  };

  const config = configs[status] || configs.INVALID;
  const Icon = config.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border ${config.color}`}>
      <Icon className="w-4 h-4" />
      {status}
    </span>
  );
};

// Mock API for demonstration
const api = {
  get: async (_url, options) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const lorryNumber = options.params.lorryNumber;

    // Mock responses based on lorry number
    const mockData = {
      "LL-1234": { status: "ACTIVE", owner: { name: "Lanka Mining Corp" } },
      "LL-5678": { status: "SUSPENDED", owner: { name: "Mountain Excavators Ltd" } },
      "LL-9999": { status: "EXPIRED", owner: { name: "Deep Earth Mining" } },
    };

    return {
      data: mockData[lorryNumber] || { status: "INVALID" },
    };
  },
  post: async (_url, _data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: { ok: true } };
  },
};

export default function PublicHome() {
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
    } catch (error) {
      console.error("Lookup failed:", error);
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
    } catch (error) {
      console.error("Report failed:", error);
    }

    setReportLoading(false);
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && lorry && !loading) {
      lookup();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
              <Truck className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Verify Mining Transport</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Ensure mining vehicles are properly licensed and authorized for operations
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="max-w-2xl mx-auto px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Search Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter Lorry Details</h2>
              <p className="text-gray-600">Input the lorry number to verify its authorization status</p>
            </div>

            <div className="relative">
              <div className="relative flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg font-mono placeholder-gray-400"
                    placeholder="Enter Lorry Number (e.g., LL-2345)"
                    value={lorry}
                    onChange={(e) => setLorry(e.target.value.toUpperCase())}
                    onKeyDown={handleKeyDown}
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
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      Lookup
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
              <div
                className={`p-6 rounded-xl border-2 ${
                  result.status === "ACTIVE" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full ${result.status === "ACTIVE" ? "bg-green-100" : "bg-red-100"}`}>
                      <Truck className={`w-6 h-6 ${result.status === "ACTIVE" ? "text-green-600" : "text-red-600"}`} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-medium">Lorry Number</p>
                      <p className="font-mono text-2xl font-bold text-gray-800">{lorry}</p>
                    </div>
                  </div>
                  <StatusBadge status={result.status === "INVALID" ? "INVALID" : result.status} />
                </div>

                {/* Owner Info */}
                {result.owner && (
                  <div className="mb-4 p-4 bg-white/60 rounded-lg border border-white/40">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-600">Registered Owner</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800 mt-1">{result.owner.name}</p>
                  </div>
                )}

                {/* Status Message */}
                <div className="mb-4">
                  {result.status === "ACTIVE" ? (
                    <div className="flex items-center gap-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">This vehicle is properly authorized for mining operations</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-medium">
                        {result.status === "INVALID" && "This lorry number is not registered in our system"}
                        {result.status === "SUSPENDED" && "This vehicle's authorization has been suspended"}
                        {result.status === "EXPIRED" && "This vehicle's authorization has expired"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Report Button */}
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
                        Submitting Report...
                      </>
                    ) : (
                      <>
                        <MapPin className="w-5 h-5" />
                        Report Violation
                      </>
                    )}
                  </button>
                )}

                {/* Success Message */}
                {reportDone && (
                  <div className="p-4 bg-green-100 border border-green-200 rounded-xl animate-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Report Submitted Successfully!</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      Thank you for helping maintain mining transport compliance. Your report has been forwarded to the
                      relevant authorities.
                    </p>
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
            <h3 className="font-semibold text-gray-800 mb-2">Secure Verification</h3>
            <p className="text-sm text-gray-600">Real-time validation against official mining transport database</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <MapPin className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Location Tracking</h3>
            <p className="text-sm text-gray-600">GPS coordinates captured for violation reports</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800 mb-2">Instant Reporting</h3>
            <p className="text-sm text-gray-600">Quick violation reporting to relevant authorities</p>
          </div>
        </div>
      </section>
    </div>
  );
}
