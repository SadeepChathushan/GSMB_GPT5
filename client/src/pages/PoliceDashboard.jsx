import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios";

export default function PoliceDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/police/reports");
      setReports(data);
      setLoading(false);
    })();
  }, []);

  async function openCase(reportId) {
    await api.post("/police/cases/open", { reportId });
    alert("Case opened");
  }

  async function lookup() {
    const { data } = await api.get("/police/lookup", { params: { lorryNumber: search } });
    setDetail(data);
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-primary mb-4">Police</h1>

        <div className="card p-4 mb-6">
          <h2 className="font-semibold mb-2">Detailed Lorry Lookup</h2>
          <div className="flex gap-2">
            <input className="input" placeholder="LL-2345" value={search} onChange={e=>setSearch(e.target.value.toUpperCase())} />
            <button className="btn btn-primary" onClick={lookup} disabled={!search}>Lookup</button>
          </div>
          {detail && (
            <div className="mt-4 text-sm">
              <p><b>Status:</b> {detail.status}</p>
              <p><b>Lorry:</b> {detail.lorryNumber}</p>
              {detail.owner && <p><b>Owner:</b> {detail.owner.name} ({detail.owner.email}) {detail.owner.phone ? " / "+detail.owner.phone : ""}</p>}
              {detail.siteName && <p><b>Site:</b> {detail.siteName}</p>}
              {detail.expiresAt && <p><b>Expires:</b> {new Date(detail.expiresAt).toLocaleDateString()}</p>}
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-2">Incoming Reports</h2>
        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map(r => (
              <div key={r._id} className="card p-4">
                <p className="font-mono text-lg">{r.lorryNumber}</p>
                <p className="text-sm text-gray-600">Status: {r.status}</p>
                {r.photoUrl && <img src={r.photoUrl} alt="" className="mt-2 rounded" />}
                <button className="btn btn-primary mt-3" onClick={() => openCase(r._id)}>Open Case</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
