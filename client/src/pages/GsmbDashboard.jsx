import { useEffect, useState } from "react";
import {
  Users,
  Truck,
  Shield,
  Plus,
  User,
  Calendar,
  Phone,
  Mail,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Pause,
  Play,
} from "lucide-react";

// Mock API functions for demo
const mockApi = {
  get: async (endpoint) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    if (endpoint === "/gsmb/licenses") {
      return {
        data: [
          {
            _id: "1",
            lorryNumber: "LL-2345",
            owner: { name: "John Doe", email: "john@example.com" },
            status: "ACTIVE",
            siteName: "Quarry Site A",
            expiresAt: "2025-12-31",
          },
          {
            _id: "2",
            lorryNumber: "LL-5678",
            owner: { name: "Jane Smith", email: "jane@example.com" },
            status: "SUSPENDED",
            siteName: "Mining Site B",
            expiresAt: "2025-11-15",
          },
        ],
      };
    }
    if (endpoint === "/gsmb/owners") {
      return {
        data: [
          { _id: "1", name: "John Doe", email: "john@example.com", phone: "+94771234567" },
          { _id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+94779876543" },
        ],
      };
    }
  },
  post: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { success: true };
  },
};

export default function GsmbDashboard() {
  const [licenses, setLicenses] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const [oEmail, setOEmail] = useState("");
  const [oName, setOName] = useState("");
  const [oPhone, setOPhone] = useState("");
  const [oPass, setOPass] = useState("Temp@12345");

  const [ownerEmail, setOwnerEmail] = useState("");
  const [lorry, setLorry] = useState("");
  const [site, setSite] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [licensesRes, ownersRes] = await Promise.all([
          mockApi.get("/gsmb/licenses"),
          mockApi.get("/gsmb/owners"),
        ]);
        setLicenses(licensesRes.data);
        setOwners(ownersRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function createOwner() {
    try {
      await mockApi.post("/gsmb/owners", {
        email: oEmail,
        name: oName,
        phone: oPhone,
        password: oPass,
      });
      const ow = await mockApi.get("/gsmb/owners");
      setOwners(ow.data);
      setOEmail("");
      setOName("");
      setOPhone("");
      setOPass("Temp@12345");
      showNotification("Owner registered successfully!");
    } catch {
      showNotification("Failed to register owner");
    }
  }

  async function createLicense() {
    try {
      await mockApi.post("/gsmb/licenses/new", {
        ownerEmail,
        lorryNumber: lorry,
        siteName: site,
        expiresAt,
      });
      const { data } = await mockApi.get("/gsmb/licenses");
      setLicenses(data);
      setOwnerEmail("");
      setLorry("");
      setSite("");
      setExpiresAt("");
      showNotification("License created successfully!");
    } catch {
      showNotification("Failed to create license");
    }
  }

  async function suspend(licenseId) {
    try {
      await mockApi.post("/gsmb/licenses/suspend", { licenseId, reason: "Temporary suspension" });
      const { data } = await mockApi.get("/gsmb/licenses");
      setLicenses(data);
      showNotification("License suspended");
    } catch {
      showNotification("Failed to suspend license");
    }
  }

  async function reinstate(licenseId) {
    try {
      await mockApi.post("/gsmb/licenses/reinstate", { licenseId });
      const { data } = await mockApi.get("/gsmb/licenses");
      setLicenses(data);
      showNotification("License reinstated");
    } catch {
      showNotification("Failed to reinstate license");
    }
  }

  function showNotification(message) {
    alert(message); // swap for toast in real app
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "from-emerald-500 to-green-600";
      case "SUSPENDED":
        return "from-orange-500 to-red-500";
      case "EXPIRED":
        return "from-gray-500 to-gray-600";
      default:
        return "from-blue-500 to-indigo-600";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "ACTIVE":
        return <CheckCircle2 className="w-4 h-4" />;
      case "SUSPENDED":
        return <Pause className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-700 text-lg font-medium">Loading GSMB Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Clean Navbar (branding only) */}
      <nav className="bg-white/90 backdrop-blur-xl border-b border-blue-200 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">GSMB Portal</h1>
                <p className="text-sm text-blue-600">Mining License Management</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Role-style Tab Buttons under Navbar */}
      <section className="max-w-7xl mx-auto px-6 pt-6">
        <div className="bg-white/80 backdrop-blur-xl border border-blue-200 rounded-2xl shadow-md p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Overview */}
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`group flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-all duration-300 ${
                activeTab === "overview"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg"
                  : "bg-white text-slate-800 border-blue-200 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className={`w-5 h-5 ${activeTab === "overview" ? "text-white" : "text-blue-600"}`} />
                <span className="font-semibold">Overview</span>
              </div>
              <span
                className={`text-sm rounded-full px-2 py-0.5 ${
                  activeTab === "overview"
                    ? "bg-white/20 text-white"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {owners.length} owners
              </span>
            </button>

            {/* Licenses */}
            <button
              type="button"
              onClick={() => setActiveTab("licenses")}
              className={`group flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-all duration-300 ${
                activeTab === "licenses"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg"
                  : "bg-white text-slate-800 border-blue-200 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Truck className={`w-5 h-5 ${activeTab === "licenses" ? "text-white" : "text-blue-600"}`} />
                <span className="font-semibold">Licenses</span>
              </div>
              <span
                className={`text-sm rounded-full px-2 py-0.5 ${
                  activeTab === "licenses"
                    ? "bg-white/20 text-white"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {licenses.length} total
              </span>
            </button>

            {/* Owners */}
            <button
              type="button"
              onClick={() => setActiveTab("owners")}
              className={`group flex items-center justify-between w-full px-5 py-4 rounded-xl border transition-all duration-300 ${
                activeTab === "owners"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg"
                  : "bg-white text-slate-800 border-blue-200 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <User className={`w-5 h-5 ${activeTab === "owners" ? "text-white" : "text-blue-600"}`} />
                <span className="font-semibold">Owners</span>
              </div>
              <span
                className={`text-sm rounded-full px-2 py-0.5 ${
                  activeTab === "owners"
                    ? "bg-white/20 text-white"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {licenses.filter((l) => l.status === "SUSPENDED").length} suspended
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Stats Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium">Active Licenses</p>
                  <p className="text-3xl font-bold">{licenses.filter((l) => l.status === "ACTIVE").length}</p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-emerald-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Suspended</p>
                  <p className="text-3xl font-bold">{licenses.filter((l) => l.status === "SUSPENDED").length}</p>
                </div>
                <Pause className="w-12 h-12 text-orange-200" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Owners</p>
                  <p className="text-3xl font-bold">{owners.length}</p>
                </div>
                <Users className="w-12 h-12 text-blue-200" />
              </div>
            </div>
          </div>
        )}

        {/* Forms */}
        {(activeTab === "overview" || activeTab === "owners") && (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Register Owner Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-200 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Register Mining Owner</h2>
              </div>

              <div className="space-y-4">
                <LabeledInput icon={Mail} placeholder="Owner Email" value={oEmail} onChange={setOEmail} />
                <LabeledInput icon={User} placeholder="Owner Name" value={oName} onChange={setOName} />
                <LabeledInput icon={Phone} placeholder="Phone Number" value={oPhone} onChange={setOPhone} />
                <LabeledInput
                  icon={Shield}
                  placeholder="Temporary Password"
                  value={oPass}
                  onChange={setOPass}
                  type="password"
                />

                <PrimaryButton onClick={createOwner} icon={Plus} label="Create Owner" />
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Registered Owners</span>
                </h3>
                <div className="space-y-3 max-h-48 overflow-auto custom-scrollbar">
                  {owners.map((o) => (
                    <div
                      key={o._id}
                      className="bg-blue-50/50 rounded-xl p-4 border border-blue-100 hover:bg-blue-100/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-slate-800 font-medium">{o.name}</p>
                          <p className="text-blue-600 text-sm">{o.email}</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Create License Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-blue-200 shadow-2xl">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Truck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Create License</h2>
              </div>

              <div className="space-y-4">
                <LabeledInput icon={Mail} placeholder="Owner Email" value={ownerEmail} onChange={setOwnerEmail} />
                <LabeledInput
                  icon={Truck}
                  placeholder="Lorry Number (e.g., LL-2345)"
                  value={lorry}
                  onChange={(v) => setLorry(v.toUpperCase())}
                />
                <LabeledInput icon={Building2} placeholder="Site Name" value={site} onChange={setSite} />
                <LabeledInput
                  icon={Calendar}
                  placeholder="Expires At"
                  value={expiresAt}
                  onChange={setExpiresAt}
                  type="date"
                />

                <PrimaryButton onClick={createLicense} icon={Plus} label="Create License" />
              </div>
            </div>
          </div>
        )}

        {/* Licenses Grid */}
        {(activeTab === "overview" || activeTab === "licenses") && (
          <div className="space-y-6">
            <SectionTitle icon={Truck} title="Mining Licenses" />

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {licenses.map((l) => (
                <div
                  key={l._id}
                  className="group bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200 shadow-xl hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                >
                  {/* Status Badge */}
                  <div
                    className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full bg-gradient-to-r ${getStatusColor(
                      l.status
                    )} text-white text-xs font-semibold mb-4`}
                  >
                    {getStatusIcon(l.status)}
                    <span>{l.status}</span>
                  </div>

                  {/* License Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-slate-600" />
                      <p className="text-2xl font-bold text-slate-800 font-mono">{l.lorryNumber}</p>
                    </div>

                    <div className="space-y-2">
                      <Field icon={User} text={l.owner?.name} />
                      <Field icon={Mail} text={l.owner?.email} />
                      <Field icon={Building2} text={l.siteName} />
                      <Field icon={Calendar} text={`Expires: ${l.expiresAt}`} />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg"
                      onClick={() => suspend(l._id)}
                    >
                      <Pause className="w-4 h-4" />
                      <span>Suspend</span>
                    </button>
                    <button
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg"
                      onClick={() => reinstate(l._id)}
                    >
                      <Play className="w-4 h-4" />
                      <span>Reinstate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Owners Only View */}
        {activeTab === "owners" && (
          <div className="space-y-6">
            <SectionTitle icon={Users} title="All Owners" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {owners.map((owner) => (
                <div
                  key={owner._id}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-blue-200 shadow-xl hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{owner.name}</h3>
                      <p className="text-blue-600 text-sm">Mining Owner</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Field icon={Mail} text={owner.email} />
                    <Field icon={Phone} text={owner.phone} />
                  </div>

                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <p className="text-xs text-blue-600">
                      Licenses: {licenses.filter((l) => l.owner?.email === owner.email).length}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(59, 130, 246, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
}

/* ---------- Small UI helpers ---------- */
function SectionTitle({ icon: Icon, title }) {
  return (
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-700 rounded-lg flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-3xl font-bold text-slate-800">{title}</h2>
    </div>
  );
}

function Field({ icon: Icon, text }) {
  return (
    <div className="flex items-center space-x-2 text-slate-600">
      <Icon className="w-4 h-4" />
      <span className="text-sm">{text}</span>
    </div>
  );
}

function LabeledInput({ icon: Icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400 group-focus-within:text-blue-600 transition-colors" />
      <input
        type={type}
        className="w-full bg-blue-50/50 border border-blue-200 rounded-xl pl-12 pr-4 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function PrimaryButton({ onClick, icon: Icon, label }) {
  return (
    <button
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2"
      onClick={onClick}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </button>
  );
}
