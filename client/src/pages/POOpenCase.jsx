import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Gavel, Truck, Calendar, ClipboardList, BadgeDollarSign } from "lucide-react";
import { useMemo, useState } from "react";

export default function POOpenCase() {
  const { id } = useParams();
  const nav = useNavigate();
  const { state } = useLocation();
  const report = state?.report || null;

  // form state
  const [lorryNumber, setLorryNumber] = useState(report?.lorryNumber || "");
  const [violation, setViolation] = useState("");
  const [amount, setAmount] = useState("");
  const [suspend, setSuspend] = useState(true);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const valid = useMemo(
    () => lorryNumber.trim() && violation && Number(amount) > 0 && dueDate,
    [lorryNumber, violation, amount, dueDate]
  );

  async function submitFrontend(e) {
    e.preventDefault();
    if (!valid) return;
    setSubmitting(true);

    // purely frontend: pretend success
    await new Promise(r => setTimeout(r, 600));
    alert(`Fine issued (demo). Case #${id}\nLorry: ${lorryNumber}\nAmount: LKR ${amount}`);
    nav("/police");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => nav(-1)}
              className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <div className="font-semibold text-blue-600">Police Portal</div>
            <div className="text-sm text-gray-500">Case #{id}</div>
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-3 mb-6">
          <Gavel className="w-7 h-7 text-blue-600" />
          Issue Fine
        </h1>

        {/* Context */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Truck className="w-5 h-5 text-gray-500" />
              <span className="font-medium">Lorry:</span>
              <span className="font-mono">{lorryNumber || "-"}</span>
            </div>
            <div className="text-gray-700">
              <span className="font-medium">Report Status:</span>{" "}
              <span>{report?.status || "Open"}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={submitFrontend} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lorry Number</label>
              <div className="relative">
                <Truck className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  value={lorryNumber}
                  onChange={(e) => setLorryNumber(e.target.value.toUpperCase())}
                  placeholder="LL-2345"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Violation</label>
              <div className="relative">
                <ClipboardList className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <select
                  value={violation}
                  onChange={(e) => setViolation(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select violation</option>
                  <option value="NO_VALID_PERMIT">No valid permit</option>
                  <option value="ROUTE_VIOLATION">Route violation</option>
                  <option value="OVERLOAD">Overload</option>
                  <option value="DOCUMENTS_MISSING">Missing documents</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fine Amount (LKR)</label>
              <div className="relative">
                <BadgeDollarSign className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g., 15000"
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Due Date</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="suspend"
              type="checkbox"
              checked={suspend}
              onChange={(e) => setSuspend(e.target.checked)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="suspend" className="text-sm text-gray-700">
              Temporarily suspend license until the fine is paid
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Extra details for the case (optional)"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={!valid || submitting}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg"
            >
              {submitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Issuing Fine...
                </>
              ) : (
                <>
                  <Gavel className="w-5 h-5" />
                  Issue Fine
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => nav("/police")}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
