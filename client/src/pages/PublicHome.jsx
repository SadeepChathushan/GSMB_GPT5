import { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios";
import StatusBadge from "../components/StatusBadge.jsx";

export default function PublicHome() {
  const [lorry, setLorry] = useState("");
  const [result, setResult] = useState(null);
  const [reportDone, setReportDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function lookup() {
    setLoading(true);
    const { data } = await api.get("/public/lookup", { params: { lorryNumber: lorry } });
    setResult(data);
    setLoading(false);
  }

  async function report() {
    const coords = await new Promise((resolve) =>
      navigator.geolocation.getCurrentPosition(
        p => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => resolve({ lat: null, lng: null })
      )
    );
    const form = new FormData();
    form.append("lorryNumber", lorry);
    form.append("lat", coords.lat || "");
    form.append("lng", coords.lng || "");
    const { data } = await api.post("/public/report", form);
    if (data.ok) setReportDone(true);
  }

  return (
    <div>
      <Navbar />
      <section className="max-w-xl mx-auto mt-10 p-6 card">
        <h1 className="text-3xl font-bold text-primary mb-4">Verify a Mining Transport</h1>
        <div className="flex gap-2">
          <input className="input" placeholder="Enter Lorry Number (e.g., LL-2345)" value={lorry}
                 onChange={e=>setLorry(e.target.value.toUpperCase())} />
          <button className="btn btn-primary" onClick={lookup} disabled={!lorry || loading}>Lookup</button>
        </div>

        {result && (
          <div className="mt-6 card p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Lorry</p>
                <p className="font-mono text-lg">{lorry}</p>
              </div>
              <StatusBadge status={result.status === "INVALID" ? "INVALID" : result.status} />
            </div>
            {result.owner && (
              <p className="text-sm text-gray-600 mt-2">Owner: <b>{result.owner.name}</b></p>
            )}

            {(result.status !== "ACTIVE") && (
              <button className="mt-4 btn btn-danger w-full" onClick={report}>
                Report Violation
              </button>
            )}
            {reportDone && <p className="text-green-700 mt-2">Thanks! Your report was sent.</p>}
          </div>
        )}
      </section>
    </div>
  );
}
