import { useEffect, useState } from "react";
import { Search, Eye, FileText, Truck, User, Calendar, MapPin, AlertCircle } from "lucide-react";

// Mock Navbar component
function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">Police Portal</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Officer Dashboard</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Mock API
const api = {
  get: async (url, config) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    if (url === "/police/reports") {
      return {
        data: [
          {
            _id: "1",
            lorryNumber: "LL-2345",
            status: "Pending Investigation",
            photoUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=250&fit=crop"
          },
          {
            _id: "2", 
            lorryNumber: "TR-9876",
            status: "Under Review",
            photoUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=250&fit=crop"
          },
          {
            _id: "3",
            lorryNumber: "HV-5432",
            status: "Critical",
            photoUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=250&fit=crop"
          }
        ]
      };
    } else if (url === "/police/lookup") {
      return {
        data: {
          status: "Active",
          lorryNumber: config.params.lorryNumber,
          owner: {
            name: "John Doe",
            email: "john.doe@email.com",
            phone: "+1234567890"
          },
          siteName: "Construction Site Alpha",
          expiresAt: "2024-12-31T23:59:59Z"
        }
      };
    }
  },
  post: async (url, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

export default function PoliceDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [caseLoading, setCaseLoading] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/police/reports");
      setReports(data);
      setLoading(false);
    })();
  }, []);

  async function openCase(reportId) {
    setCaseLoading(reportId);
    await api.post("/police/cases/open", { reportId });
    setCaseLoading(null);
    alert("Case opened successfully");
  }

  async function lookup() {
    if (!search) return;
    setLookupLoading(true);
    try {
      const { data } = await api.get("/police/lookup", { params: { lorryNumber: search } });
      setDetail(data);
    } catch (error) {
      alert("Lookup failed. Please try again.");
    }
    setLookupLoading(false);
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "Under Review":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Pending Investigation":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <AlertCircle className="h-8 w-8 text-blue-600" />
            Police Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Monitor reports and manage vehicle lookups</p>
        </div>

        {/* Lookup Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Vehicle Lookup</h2>
          </div>
          
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <input 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors font-mono text-lg"
                placeholder="Enter lorry number (e.g., LL-2345)"
                value={search}
                onChange={e => setSearch(e.target.value.toUpperCase())}
                onKeyPress={e => e.key === 'Enter' && lookup()}
              />
            </div>
            <button 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              onClick={lookup}
              disabled={!search || lookupLoading}
            >
              {lookupLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Search className="h-5 w-5" />
              )}
              {lookupLoading ? "Searching..." : "Lookup"}
            </button>
          </div>

          {detail && (
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(detail.status)}`}>
                      {detail.status}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700">
                    <Truck className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Lorry:</span>
                    <span className="font-mono">{detail.lorryNumber}</span>
                  </div>

                  {detail.owner && (
                    <div className="flex items-start gap-2 text-gray-700">
                      <User className="h-4 w-4 text-gray-500 mt-0.5" />
                      <div>
                        <span className="font-medium">Owner:</span>
                        <div className="text-sm">
                          <div>{detail.owner.name}</div>
                          <div className="text-gray-600">{detail.owner.email}</div>
                          {detail.owner.phone && <div className="text-gray-600">{detail.owner.phone}</div>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {detail.siteName && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Site:</span>
                      <span>{detail.siteName}</span>
                    </div>
                  )}

                  {detail.expiresAt && (
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">Expires:</span>
                      <span>{new Date(detail.expiresAt).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reports Section */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <FileText className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Incoming Reports</h2>
            {!loading && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">{reports.length}</span>}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Loading reports...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.map(r => (
                <div key={r._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {r.photoUrl && (
                    <div className="aspect-video bg-gray-100">
                      <img 
                        src={r.photoUrl} 
                        alt="Report evidence" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-lg font-semibold text-gray-900">{r.lorryNumber}</span>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(r.status)}`}>
                        {r.status}
                      </div>
                    </div>

                    <button 
                      className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                      onClick={() => openCase(r._id)}
                      disabled={caseLoading === r._id}
                    >
                      {caseLoading === r._id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Opening...
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4" />
                          Open Case
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && reports.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No reports available</p>
              <p className="text-gray-400">New reports will appear here when submitted</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}