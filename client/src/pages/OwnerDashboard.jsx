import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import api from "../api/axios";

export default function OwnerDashboard() {
  const [licenses, setLicenses] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    (async () => {
      const l = await api.get("/owner/licenses");
      setLicenses(l.data);
      const p = await api.get("/owner/payments");
      setPayments(p.data);
    })();
  }, []);

  async function pay(id) {
    await api.post("/payments/mock-pay", { paymentId: id });
    alert("Payment done (mock). License will auto-reinstate in 24h (or via manual reinstate).");
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-2xl font-bold text-primary mb-4">My Licenses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {licenses.map(l => (
            <div key={l._id} className="card p-4">
              <p className="font-mono text-lg">{l.lorryNumber}</p>
              <p className="text-sm text-gray-600">Status: <b>{l.status}</b></p>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-8 mb-2">Fines & Payments</h2>
        <div className="space-y-2">
          {payments.map(p => (
            <div key={p._id} className="card p-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{new Date(p.createdAt).toLocaleString()}</p>
                <p className="font-semibold">LKR {p.amount}</p>
                <p className="text-sm">Status: <b>{p.status}</b></p>
              </div>
              {p.status !== "PAID" && <button className="btn btn-success" onClick={()=>pay(p._id)}>Pay</button>}
            </div>
          ))}
          {payments.length === 0 && <p className="text-gray-600">No fines.</p>}
        </div>
      </div>
    </div>
  );
}
