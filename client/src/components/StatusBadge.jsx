export default function StatusBadge({ status }) {
  const styles = {
    VALID: "bg-emerald-100 text-emerald-700",
    ACTIVE: "bg-emerald-100 text-emerald-700",
    INVALID: "bg-red-100 text-red-700",
    SUSPENDED: "bg-yellow-100 text-yellow-800",
    UNDER_INVESTIGATION: "bg-orange-100 text-orange-800",
    EXPIRED: "bg-gray-200 text-gray-700"
  };
  return <span className={"badge " + (styles[status] || "bg-gray-100 text-gray-700")}>{status}</span>;
}
