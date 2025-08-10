import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios";

export default function GsmbDashboard() {
  const [licenses, setLicenses] = useState([]);
  const [owners, setOwners] = useState([]);

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
      const { data } = await api.get("/gsmb/licenses");
      setLicenses(data);
      const ow = await api.get("/gsmb/owners");
      setOwners(ow.data);
    })();
  }, []);

  async function createOwner() {
    await api.post("/gsmb/owners", { email: oEmail, name: oName, phone: oPhone, password: oPass });
    const ow = await api.get("/gsmb/owners");
    setOwners(ow.data);
    alert("Owner registered");
  }

  async function createLicense() {
    await api.post("/gsmb/licenses/new", { ownerEmail, lorryNumber: lorry, siteName: site, expiresAt });
    const { data } = await api.get("/gsmb/licenses");
    setLicenses(data);
    alert("License created");
  }

  async function suspend(licenseId) {
    await api.post("/gsmb/licenses/suspend", { licenseId, reason: "Temporary suspension" });
    const { data } = await api.get("/gsmb/licenses");
    setLicenses(data);
  }

  async function reinstate(licenseId) {
    await api.post("/gsmb/licenses/reinstate", { licenseId });
    const { data } = await api.get("/gsmb/licenses");
    setLicenses(data);
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        <h1 className="text-2xl font-bold text-primary">GSMB Admin</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <h2 className="font-semibold mb-2">Register Mining Owner</h2>
            <div className="space-y-2">
              <input className="input" placeholder="Owner Email" value={oEmail} onChange={e=>setOEmail(e.target.value)} />
              <input className="input" placeholder="Owner Name" value={oName} onChange={e=>setOName(e.target.value)} />
              <input className="input" placeholder="Phone" value={oPhone} onChange={e=>setOPhone(e.target.value)} />
              <input type="password" className="input" placeholder="Temp Password" value={oPass} onChange={e=>setOPass(e.target.value)} />
              <button className="btn btn-primary w-full" onClick={createOwner}>Create Owner</button>
            </div>

            <h3 className="font-semibold mt-4">Owners</h3>
            <ul className="text-sm mt-2 space-y-1 max-h-40 overflow-auto">
              {owners.map(o => <li key={o._id} className="flex justify-between"><span>{o.name} — {o.email}</span></li>)}
            </ul>
          </div>

          <div className="card p-4">
            <h2 className="font-semibold mb-2">Create License</h2>
            <div className="space-y-2">
              <input className="input" placeholder="Owner Email (existing or new)" value={ownerEmail} onChange={e=>setOwnerEmail(e.target.value)} />
              <input className="input" placeholder="Lorry Number (e.g., LL-2345)" value={lorry} onChange={e=>setLorry(e.target.value.toUpperCase())} />
              <input className="input" placeholder="Site Name" value={site} onChange={e=>setSite(e.target.value)} />
              <input className="input" type="date" value={expiresAt} onChange={e=>setExpiresAt(e.target.value)} />
              <button className="btn btn-primary w-full" onClick={createLicense}>Create License</button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">All Licenses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {licenses.map(l => (
              <div key={l._id} className="card p-4">
                <p className="font-mono text-lg">{l.lorryNumber}</p>
                <p className="text-sm text-gray-600">{l.owner?.name} — {l.owner?.email}</p>
                <p className="text-sm">Status: <b>{l.status}</b></p>
                <div className="mt-2 flex gap-2">
                  <button className="btn btn-danger" onClick={() => suspend(l._id)}>Suspend</button>
                  <button className="btn btn-success" onClick={() => reinstate(l._id)}>Reinstate</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
