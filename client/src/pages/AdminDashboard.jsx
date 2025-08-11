// import { useEffect, useMemo, useState } from "react";
// import {
//   Users,
//   Shield,
//   Activity,
//   UserPlus,
//   LogOut,
//   CheckCircle2,
//   Ban,
//   Settings,
//   Download,
//   Mail,
//   Phone,
//   Building2,
//   Search,
//   Edit,
//   Trash2,
//   RefreshCw,
//   ChevronDown,
// } from "lucide-react";

// /* Demo data */
// const seedUsers = [
//   {
//     id: 1,
//     name: "Saman Perera",
//     email: "saman@example.com",
//     phone: "+94 77 123 4567",
//     role: "ADMIN",
//     org: "GSMB Central",
//     status: "ACTIVE",
//     lastLogin: "2025-08-08 09:14",
//   },
//   {
//     id: 2,
//     name: "Nimali Jayasuriya",
//     email: "nimali@example.com",
//     phone: "+94 77 890 1234",
//     role: "OFFICER",
//     org: "North Province",
//     status: "SUSPENDED",
//     lastLogin: "2025-08-07 17:40",
//   },
//   {
//     id: 3,
//     name: "Kavindu Silva",
//     email: "kavindu@example.com",
//     phone: "+94 75 555 3322",
//     role: "OWNER",
//     org: "Quarry Site A",
//     status: "ACTIVE",
//     lastLogin: "2025-08-09 10:05",
//   },
// ];

// export default function AdminDashboard() {
//   const [tab, setTab] = useState("overview");
//   const [users, setUsers] = useState(seedUsers);
//   const [stats, setStats] = useState({
//     totalUsers: 261,
//     activeUsers: 229,
//     suspendedUsers: 32,
//     roles: 3,
//   });

//   // Filters
//   const [q, setQ] = useState("");
//   const [fStatus, setFStatus] = useState("ALL");
//   const [fRole, setFRole] = useState("ALL");

//   // Quick add
//   const [qaOpen, setQaOpen] = useState(true);
//   const [qa, setQa] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     role: "OFFICER",
//     org: "",
//   });

//   useEffect(() => {
//     // hook up real API here if needed
//   }, []);

//   const filtered = useMemo(() => {
//     return users.filter((u) => {
//       const matches = `${u.name} ${u.email} ${u.phone} ${u.org}`
//         .toLowerCase()
//         .includes(q.toLowerCase());
//       const rs = fStatus === "ALL" || u.status === fStatus;
//       const rr = fRole === "ALL" || u.role === fRole;
//       return matches && rs && rr;
//     });
//   }, [users, q, fStatus, fRole]);

//   function addQuick() {
//     if (!qa.name || !qa.email) return alert("Name & email required");
//     const newUser = { id: Date.now(), status: "ACTIVE", lastLogin: "—", ...qa };
//     setUsers([newUser, ...users]);
//     setQa({ name: "", email: "", phone: "", role: "OFFICER", org: "" });
//   }

//   function toggleStatus(id) {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === id
//           ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" }
//           : u
//       )
//     );
//   }

//   function removeUser(id) {
//     if (!confirm("Delete this user?")) return;
//     setUsers((prev) => prev.filter((u) => u.id !== id));
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
//       {/* Navbar */}
//       <nav className="bg-white/90 backdrop-blur-xl border-b border-blue-200 sticky top-0 z-50 shadow">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 grid place-items-center">
//               <Shield className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-xl font-bold text-slate-900">
//                 Admin Console
//               </h1>
//               <p className="text-sm text-blue-600">System Administration</p>
//             </div>
//           </div>
//           <button className="flex items-center gap-2 text-slate-700 hover:text-slate-900">
//             <LogOut className="w-5 h-5" /> Logout
//           </button>
//         </div>
//       </nav>

//       {/* Tabs — big, tap-friendly */}
//       <section className="max-w-7xl mx-auto px-4 pt-4">
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
//           <TabBtn
//             icon={Activity}
//             active={tab === "overview"}
//             onClick={() => setTab("overview")}
//             label="Overview"
//           />
//           <TabBtn
//             icon={Users}
//             active={tab === "users"}
//             onClick={() => setTab("users")}
//             label={`Users (${users.length})`}
//           />
//           <TabBtn
//             icon={Shield}
//             active={tab === "roles"}
//             onClick={() => setTab("roles")}
//             label={`Roles (${stats.roles})`}
//           />
//           <TabBtn
//             icon={Download}
//             active={tab === "audit"}
//             onClick={() => setTab("audit")}
//             label="Audit"
//           />
//           <TabBtn
//             icon={Settings}
//             active={tab === "settings"}
//             onClick={() => setTab("settings")}
//             label="Settings"
//           />
//         </div>
//       </section>

//       {/* Overview */}
//       {tab === "overview" && (
//         <section className="max-w-7xl mx-auto p-4 sm:p-6">
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//             <BigCard
//               title="Total Users"
//               value={stats.totalUsers}
//               icon={Users}
//               gradient="from-blue-600 to-indigo-600"
//             />
//             <BigCard
//               title="Active Users"
//               value={stats.activeUsers}
//               icon={CheckCircle2}
//               gradient="from-emerald-500 to-green-600"
//             />
//             <BigCard
//               title="Suspended"
//               value={stats.suspendedUsers}
//               icon={Ban}
//               gradient="from-orange-500 to-red-500"
//             />
//             <BigCard
//               title="Roles"
//               value={stats.roles}
//               icon={Shield}
//               gradient="from-slate-700 to-slate-900"
//             />
//           </div>
//         </section>
//       )}

//       {/* Users */}
//       {tab === "users" && (
//         <section className="max-w-7xl mx-auto p-4 sm:p-6 space-y-4">
//           {/* Header + New User */}
//           <div className="flex items-center justify-between">
//             <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
//               <Users className="w-6 h-6 text-blue-600" /> User Management
//             </h2>
//             <button
//               onClick={() => setQaOpen(true)}
//               className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow hover:from-blue-700 hover:to-indigo-700"
//             >
//               <UserPlus className="w-5 h-5" /> New User
//             </button>
//           </div>

//           {/* Quick Add Bar */}
//           <div className="bg-white/80 backdrop-blur-xl border border-blue-200 rounded-2xl shadow">
//             <button
//               className="w-full flex items-center justify-between px-4 py-3 text-left"
//               onClick={() => setQaOpen(!qaOpen)}
//             >
//               <span className="text-slate-800 font-semibold">
//                 Quick add (name, email, role)
//               </span>
//               <ChevronDown
//                 className={`w-5 h-5 transition-transform ${
//                   qaOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             </button>
//             {qaOpen && (
//               <div className="p-4 grid grid-cols-1 md:grid-cols-5 gap-3">
//                 <Input
//                   icon={Users}
//                   placeholder="Full name"
//                   value={qa.name}
//                   onChange={(v) => setQa({ ...qa, name: v })}
//                 />
//                 <Input
//                   icon={Mail}
//                   placeholder="Email"
//                   value={qa.email}
//                   onChange={(v) => setQa({ ...qa, email: v })}
//                 />
//                 <Input
//                   icon={Phone}
//                   placeholder="Phone (optional)"
//                   value={qa.phone}
//                   onChange={(v) => setQa({ ...qa, phone: v })}
//                 />
//                 <Select
//                   value={qa.role}
//                   onChange={(v) => setQa({ ...qa, role: v })}
//                   options={["ADMIN", "OFFICER", "OWNER"]}
//                 />
//                 <div className="flex items-end">
//                   <button
//                     onClick={addQuick}
//                     className="w-full rounded-xl px-4 py-3 text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
//                   >
//                     Add
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Filters */}
//           <div className="bg-white/80 backdrop-blur-xl border border-blue-200 rounded-2xl shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-3">
//             <div className="relative">
//               <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 className="w-full pl-9 pr-3 py-3 rounded-xl border border-blue-200 bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 placeholder="Search name, email, phone, org"
//                 value={q}
//                 onChange={(e) => setQ(e.target.value)}
//               />
//             </div>
//             <Select
//               label="Status"
//               value={fStatus}
//               onChange={setFStatus}
//               options={["ALL", "ACTIVE", "SUSPENDED"]}
//             />
//             <Select
//               label="Role"
//               value={fRole}
//               onChange={setFRole}
//               options={["ALL", "ADMIN", "OFFICER", "OWNER"]}
//             />
//             <div className="flex items-end gap-2">
//               <button
//                 className="btn-ghost"
//                 onClick={() => {
//                   setQ("");
//                   setFStatus("ALL");
//                   setFRole("ALL");
//                 }}
//               >
//                 <RefreshCw className="w-4 h-4" />
//               </button>
//               <button className="btn-ghost">
//                 <Download className="w-4 h-4" />
//               </button>
//             </div>
//           </div>

//           {/* User Cards (colorful, touch-friendly) */}
//           <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
//             {filtered.map((u) => (
//               <UserCard
//                 key={u.id}
//                 user={u}
//                 onToggle={() => toggleStatus(u.id)}
//                 onEdit={() => alert("Open edit modal for " + u.name)}
//                 onDelete={() => removeUser(u.id)}
//               />
//             ))}
//           </div>

//           {/* FAB for mobile */}
//           <button
//             onClick={() => setQaOpen(true)}
//             className="md:hidden fixed bottom-5 right-5 w-14 h-14 rounded-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 grid place-items-center shadow-2xl"
//             aria-label="Add user"
//           >
//             <UserPlus className="w-6 h-6" />
//           </button>
//         </section>
//       )}

//       {/* Local styles for utility class */}
//       <style jsx>{`
//         .btn-ghost {
//           @apply inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-200 text-slate-700 hover:bg-blue-50;
//         }
//       `}</style>
//     </div>
//   );
// }

// /* ---------- Pieces ---------- */
// function BigCard({ title, value, icon: Icon, gradient }) {
//   return (
//     <div
//       className={`bg-gradient-to-r ${gradient} rounded-2xl px-6 py-7 text-white shadow-md`}
//     >
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-white/95 text-base sm:text-lg font-medium tracking-wide">
//             {title}
//           </p>
//           <p className="text-4xl sm:text-5xl font-extrabold leading-tight mt-1">
//             {value}
//           </p>
//         </div>
//         <Icon className="w-12 h-12 text-white/90" />
//       </div>
//     </div>
//   );
// }

// function TabBtn({ icon: Icon, label, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`flex items-center justify-center gap-3 px-4 py-4 rounded-2xl border text-base sm:text-lg font-semibold transition-all ${
//         active
//           ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg"
//           : "bg-white text-slate-800 border-blue-200 hover:bg-blue-50"
//       }`}
//       aria-pressed={active}
//     >
//       <Icon className={`w-5 h-5 ${active ? "text-white" : "text-blue-600"}`} />
//       <span>{label}</span>
//     </button>
//   );
// }

// function StatusPill({ status }) {
//   const map = {
//     ACTIVE: {
//       text: "Active",
//       cls: "bg-emerald-100 text-emerald-700 border-emerald-200",
//       Icon: CheckCircle2,
//     },
//     SUSPENDED: {
//       text: "Suspended",
//       cls: "bg-orange-100 text-orange-700 border-orange-200",
//       Icon: Ban,
//     },
//   };
//   const C = map[status] || {
//     text: status,
//     cls: "bg-slate-100 text-slate-700 border-slate-200",
//     Icon: CheckCircle2,
//   };
//   const I = C.Icon;
//   return (
//     <span
//       className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${C.cls}`}
//     >
//       <I className="w-3 h-3" /> {C.text}
//     </span>
//   );
// }

// function RoleChip({ role }) {
//   const map = {
//     ADMIN: "bg-blue-100 text-blue-700 border-blue-200",
//     OFFICER: "bg-indigo-100 text-indigo-700 border-indigo-200",
//     OWNER: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
//   };
//   return (
//     <span
//       className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full border ${
//         map[role] || "bg-slate-100 text-slate-700 border-slate-200"
//       }`}
//     >
//       <Shield className="w-3 h-3" /> {role}
//     </span>
//   );
// }

// function UserCard({ user, onToggle, onEdit, onDelete }) {
//   const headerGrad =
//     {
//       ADMIN: "from-blue-600 to-indigo-600",
//       OFFICER: "from-cyan-500 to-blue-600",
//       OWNER: "from-fuchsia-500 to-pink-500",
//     }[user.role] || "from-slate-600 to-slate-800";

//   return (
//     <div className="rounded-2xl overflow-hidden border border-blue-200 bg-white shadow-sm hover:shadow-md transition-shadow">
//       {/* Colorful header */}
//       <div
//         className={`bg-gradient-to-r ${headerGrad} text-white px-5 py-4 flex items-center justify-between`}
//       >
//         <div className="font-semibold text-lg">{user.name}</div>
//         <div className="flex gap-2">
//           <button
//             className="bg-white/15 hover:bg-white/25 rounded-lg p-2"
//             onClick={onEdit}
//             aria-label="Edit"
//           >
//             <Edit className="w-4 h-4" />
//           </button>
//           <button
//             className="bg-white/15 hover:bg-white/25 rounded-lg p-2"
//             onClick={onToggle}
//             aria-label="Toggle status"
//           >
//             {user.status === "ACTIVE" ? (
//               <Ban className="w-4 h-4" />
//             ) : (
//               <CheckCircle2 className="w-4 h-4" />
//             )}
//           </button>
//           <button
//             className="bg-white/15 hover:bg-white/25 rounded-lg p-2"
//             onClick={onDelete}
//             aria-label="Delete"
//           >
//             <Trash2 className="w-4 h-4" />
//           </button>
//         </div>
//       </div>

//       {/* Body */}
//       <div className="p-5 space-y-2">
//         <a
//           className="text-blue-700 break-all block"
//           href={`mailto:${user.email}`}
//         >
//           {user.email}
//         </a>
//         <div className="text-slate-700 flex items-center gap-2">
//           <Phone className="w-4 h-4 text-slate-400" />
//           {user.phone}
//         </div>
//         <div className="text-slate-700 flex items-center gap-2">
//           <Building2 className="w-4 h-4 text-slate-400" />
//           {user.org}
//         </div>
//         <div className="flex items-center gap-2 pt-2">
//           <RoleChip role={user.role} />
//           <StatusPill status={user.status} />
//         </div>
//         <div className="text-xs text-slate-500 pt-1">
//           Last login: {user.lastLogin}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Label({ children }) {
//   return (
//     <label className="block text-xs font-semibold text-slate-600 mb-1">
//       {children}
//     </label>
//   );
// }

// function Input({
//   icon: Icon,
//   label,
//   value,
//   onChange,
//   placeholder,
//   type = "text",
// }) {
//   return (
//     <div>
//       {label && <Label>{label}</Label>}
//       <div className="relative">
//         {Icon && (
//           <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//         )}
//         <input
//           type={type}
//           className="w-full bg-blue-50/50 border border-blue-200 rounded-xl pl-9 pr-3 py-3 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange?.(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// }

// function Select({ label, value, onChange, options }) {
//   return (
//     <div>
//       {label && <Label>{label}</Label>}
//       <select
//         className="w-full bg-blue-50/50 border border-blue-200 rounded-xl px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         value={value}
//         onChange={(e) => onChange?.(e.target.value)}
//       >
//         {options.map((o) => (
//           <option key={o} value={o}>
//             {o}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  Users,
  Shield,
  Activity,
  UserPlus,
  LogOut,
  CheckCircle2,
  Ban,
  Settings,
  Download,
  Mail,
  Phone,
  Building2,
  Search,
  Edit,
  Trash2,
  RefreshCw,
  ChevronDown,
  TrendingUp,
  Clock,
  AlertTriangle,
  Star,
  BarChart3,
  UserCheck,
  Database,
  Lock,
  Zap,
  Globe,
} from "lucide-react";

/* Demo data */
const seedUsers = [
  {
    id: 1,
    name: "Saman Perera",
    email: "saman@example.com",
    phone: "+94 77 123 4567",
    role: "ADMIN",
    org: "GSMB Central",
    status: "ACTIVE",
    lastLogin: "2025-08-08 09:14",
    avatar: "SP",
  },
  {
    id: 2,
    name: "Nimali Jayasuriya",
    email: "nimali@example.com",
    phone: "+94 77 890 1234",
    role: "OFFICER",
    org: "North Province",
    status: "SUSPENDED",
    lastLogin: "2025-08-07 17:40",
    avatar: "NJ",
  },
  {
    id: 3,
    name: "Kavindu Silva",
    email: "kavindu@example.com",
    phone: "+94 75 555 3322",
    role: "OWNER",
    org: "Quarry Site A",
    status: "ACTIVE",
    lastLogin: "2025-08-09 10:05",
    avatar: "KS",
  },
];

export default function AdminDashboard() {
  const [tab, setTab] = useState("overview");
  const [users, setUsers] = useState(seedUsers);
  const [stats, setStats] = useState({
    totalUsers: 261,
    activeUsers: 229,
    suspendedUsers: 32,
    roles: 3,
    newThisMonth: 18,
    avgSession: "24m",
  });

  // Filters
  const [q, setQ] = useState("");
  const [fStatus, setFStatus] = useState("ALL");
  const [fRole, setFRole] = useState("ALL");

  // Quick add
  const [qaOpen, setQaOpen] = useState(false);
  const [qa, setQa] = useState({
    name: "",
    email: "",
    phone: "",
    role: "OFFICER",
    org: "",
  });

  useEffect(() => {
    // hook up real API here if needed
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matches = `${u.name} ${u.email} ${u.phone} ${u.org}`
        .toLowerCase()
        .includes(q.toLowerCase());
      const rs = fStatus === "ALL" || u.status === fStatus;
      const rr = fRole === "ALL" || u.role === fRole;
      return matches && rs && rr;
    });
  }, [users, q, fStatus, fRole]);

  function addQuick() {
    if (!qa.name || !qa.email) return alert("Name & email required");
    const newUser = {
      id: Date.now(),
      status: "ACTIVE",
      lastLogin: "—",
      avatar: qa.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      ...qa,
    };
    setUsers([newUser, ...users]);
    setQa({ name: "", email: "", phone: "", role: "OFFICER", org: "" });
    setQaOpen(false);
  }

  function toggleStatus(id) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE" }
          : u
      )
    );
  }

  function removeUser(id) {
    if (!confirm("Delete this user?")) return;
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-sky-50 to-emerald-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <nav className="relative bg-white/70 backdrop-blur-2xl border-b border-white/20 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 grid place-items-center shadow-lg transform hover:scale-105 transition-transform">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Admin Console
              </h1>
              <p className="text-sm text-purple-600 font-medium">
                System Administration
              </p>
            </div>
          </div>
          <button className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Enhanced Tabs */}
      <section className="relative max-w-7xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <TabBtn
            icon={Activity}
            active={tab === "overview"}
            onClick={() => setTab("overview")}
            label="Overview"
            gradient="from-emerald-500 to-teal-500"
          />
          <TabBtn
            icon={Users}
            active={tab === "users"}
            onClick={() => setTab("users")}
            label={`Users (${users.length})`}
            gradient="from-blue-500 to-indigo-500"
          />
          <TabBtn
            icon={Shield}
            active={tab === "roles"}
            onClick={() => setTab("roles")}
            label={`Roles (${stats.roles})`}
            gradient="from-purple-500 to-pink-500"
          />
          <TabBtn
            icon={BarChart3}
            active={tab === "audit"}
            onClick={() => setTab("audit")}
            label="Analytics"
            gradient="from-orange-500 to-red-500"
          />
          <TabBtn
            icon={Settings}
            active={tab === "settings"}
            onClick={() => setTab("settings")}
            label="Settings"
            gradient="from-slate-500 to-gray-600"
          />
        </div>
      </section>

      {/* Overview */}
      {tab === "overview" && (
        <section className="relative max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <BigCard
              title="Total Users"
              value={stats.totalUsers}
              icon={Users}
              gradient="from-blue-600 via-blue-500 to-indigo-600"
              bgPattern="bg-blue-100/50"
              trend="+12%"
            />
            <BigCard
              title="Active Users"
              value={stats.activeUsers}
              icon={UserCheck}
              gradient="from-emerald-500 via-green-500 to-teal-600"
              bgPattern="bg-emerald-100/50"
              trend="+8%"
            />
            <BigCard
              title="Suspended"
              value={stats.suspendedUsers}
              icon={AlertTriangle}
              gradient="from-orange-500 via-red-500 to-pink-500"
              bgPattern="bg-red-100/50"
              trend="-3%"
            />
            <BigCard
              title="New This Month"
              value={stats.newThisMonth}
              icon={TrendingUp}
              gradient="from-purple-500 via-violet-500 to-indigo-500"
              bgPattern="bg-purple-100/50"
              trend="+24%"
            />
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard
              title="System Health"
              value="99.9%"
              icon={Zap}
              color="emerald"
              description="Uptime last 30 days"
            />
            <InfoCard
              title="Avg Session"
              value={stats.avgSession}
              icon={Clock}
              color="blue"
              description="User session duration"
            />
            <InfoCard
              title="Data Usage"
              value="847 GB"
              icon={Database}
              color="purple"
              description="Storage consumed"
            />
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ActionButton
                icon={UserPlus}
                label="Add User"
                color="blue"
                onClick={() => setTab("users")}
              />
              <ActionButton
                icon={Shield}
                label="Manage Roles"
                color="purple"
                onClick={() => setTab("roles")}
              />
              <ActionButton
                icon={Download}
                label="Export Data"
                color="emerald"
                onClick={() => alert("Export started")}
              />
              <ActionButton
                icon={Lock}
                label="Security"
                color="red"
                onClick={() => setTab("settings")}
              />
            </div>
          </div>
        </section>
      )}

      {/* Enhanced Users Tab */}
      {tab === "users" && (
        <section className="relative max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 grid place-items-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              User Management
            </h2>
            <button
              onClick={() => setQaOpen(true)}
              className="inline-flex items-center gap-3 rounded-2xl px-6 py-3 text-white bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 font-semibold"
            >
              <UserPlus className="w-5 h-5" /> New User
            </button>
          </div>

          {/* Enhanced Quick Add */}
          {qaOpen && (
            <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">Add New User</h3>
                  <button
                    onClick={() => setQaOpen(false)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-5 gap-4">
                <Input
                  icon={Users}
                  placeholder="Full name"
                  value={qa.name}
                  onChange={(v) => setQa({ ...qa, name: v })}
                />
                <Input
                  icon={Mail}
                  placeholder="Email"
                  value={qa.email}
                  onChange={(v) => setQa({ ...qa, email: v })}
                />
                <Input
                  icon={Phone}
                  placeholder="Phone (optional)"
                  value={qa.phone}
                  onChange={(v) => setQa({ ...qa, phone: v })}
                />
                <Select
                  value={qa.role}
                  onChange={(v) => setQa({ ...qa, role: v })}
                  options={["ADMIN", "OFFICER", "OWNER"]}
                />
                <div className="flex items-end gap-2">
                  <button
                    onClick={addQuick}
                    className="flex-1 rounded-xl px-4 py-3 text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
                  >
                    Add User
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Filters */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-white/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/80 transition-all text-slate-800 placeholder-slate-500"
                  placeholder="Search users..."
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>
              <Select
                label="Status"
                value={fStatus}
                onChange={setFStatus}
                options={["ALL", "ACTIVE", "SUSPENDED"]}
              />
              <Select
                label="Role"
                value={fRole}
                onChange={setFRole}
                options={["ALL", "ADMIN", "OFFICER", "OWNER"]}
              />
              <div className="flex items-end gap-2">
                <FilterButton
                  icon={RefreshCw}
                  onClick={() => {
                    setQ("");
                    setFStatus("ALL");
                    setFRole("ALL");
                  }}
                  color="slate"
                />
                <FilterButton
                  icon={Download}
                  onClick={() => alert("Export started")}
                  color="emerald"
                />
              </div>
            </div>
          </div>

          {/* Enhanced User Cards */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                onToggle={() => toggleStatus(u.id)}
                onEdit={() => alert("Open edit modal for " + u.name)}
                onDelete={() => removeUser(u.id)}
              />
            ))}
          </div>

          {/* Enhanced FAB */}
          <button
            onClick={() => setQaOpen(true)}
            className="md:hidden fixed bottom-6 right-6 w-16 h-16 rounded-2xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 grid place-items-center shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            aria-label="Add user"
          >
            <UserPlus className="w-8 h-8" />
          </button>
        </section>
      )}

      {/* Placeholder tabs */}
      {(tab === "roles" || tab === "audit" || tab === "settings") && (
        <section className="relative max-w-7xl mx-auto p-4 sm:p-6">
          <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-3xl shadow-xl p-12 text-center">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 grid place-items-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Section
            </h3>
            <p className="text-slate-600 max-w-md mx-auto">
              This section is under development. Enhanced {tab} management
              features coming soon!
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

/* ---------- Enhanced Components ---------- */

function BigCard({ title, value, icon: Icon, gradient, bgPattern, trend }) {
  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} rounded-3xl p-6 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
    >
      <div className={`absolute inset-0 ${bgPattern} opacity-20`}></div>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
            <Icon className="w-8 h-8 text-white" />
          </div>
          {trend && (
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-semibold backdrop-blur-sm">
              {trend}
            </span>
          )}
        </div>
        <h3 className="text-white/90 text-base font-medium mb-2">{title}</h3>
        <p className="text-4xl font-black leading-tight">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, value, icon: Icon, color, description }) {
  const colorMap = {
    emerald: "from-emerald-500 to-green-500",
    blue: "from-blue-500 to-cyan-500",
    purple: "from-purple-500 to-violet-500",
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div
        className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${colorMap[color]} grid place-items-center mb-4`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-3xl font-black text-slate-900 mb-2">{value}</p>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

function ActionButton({ icon: Icon, label, color, onClick }) {
  const colorMap = {
    blue: "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    purple:
      "from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600",
    emerald:
      "from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600",
    red: "from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600",
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-3 p-6 rounded-2xl bg-gradient-to-r ${colorMap[color]} text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
    >
      <Icon className="w-8 h-8" />
      <span className="font-semibold">{label}</span>
    </button>
  );
}

function TabBtn({ icon: Icon, label, active, onClick, gradient }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border text-base font-bold transition-all duration-300 transform hover:scale-105 ${
        active
          ? `bg-gradient-to-r ${gradient} text-white border-transparent shadow-xl`
          : "bg-white/60 backdrop-blur-xl text-slate-800 border-white/30 hover:bg-white/80 shadow-lg hover:shadow-xl"
      }`}
      aria-pressed={active}
    >
      <Icon className={`w-5 h-5 ${active ? "text-white" : "text-slate-600"}`} />
      <span>{label}</span>
    </button>
  );
}

function FilterButton({ icon: Icon, onClick, color }) {
  const colorMap = {
    slate: "from-slate-500 to-gray-600 hover:from-slate-600 hover:to-gray-700",
    emerald:
      "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${colorMap[color]} text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}

function UserCard({ user, onToggle, onEdit, onDelete }) {
  const roleGradients = {
    ADMIN: "from-red-500 via-pink-500 to-rose-500",
    OFFICER: "from-blue-500 via-cyan-500 to-teal-500",
    OWNER: "from-purple-500 via-violet-500 to-indigo-500",
  };

  const avatarColors = {
    ADMIN: "from-red-400 to-pink-400",
    OFFICER: "from-blue-400 to-cyan-400",
    OWNER: "from-purple-400 to-violet-400",
  };

  return (
    <div className="group bg-white/70 backdrop-blur-xl border border-white/30 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      {/* Enhanced Header */}
      <div
        className={`bg-gradient-to-r ${
          roleGradients[user.role]
        } text-white px-6 py-5 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-50"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${
                avatarColors[user.role]
              } grid place-items-center text-white font-bold text-lg shadow-lg`}
            >
              {user.avatar}
            </div>
            <div>
              <h3 className="text-xl font-bold">{user.name}</h3>
              <RoleChip role={user.role} />
            </div>
          </div>
          <div className="flex gap-2">
            <ActionBtn icon={Edit} onClick={onEdit} />
            <ActionBtn
              icon={user.status === "ACTIVE" ? Ban : CheckCircle2}
              onClick={onToggle}
            />
            <ActionBtn icon={Trash2} onClick={onDelete} />
          </div>
        </div>
      </div>

      {/* Enhanced Body */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl">
          <Mail className="w-5 h-5 text-blue-500" />
          <a
            href={`mailto:${user.email}`}
            className="text-blue-700 font-medium hover:text-blue-900 transition-colors"
          >
            {user.email}
          </a>
        </div>

        <div className="flex items-center gap-3 p-3 bg-slate-50/50 rounded-xl">
          <Phone className="w-5 h-5 text-slate-500" />
          <span className="text-slate-700 font-medium">{user.phone}</span>
        </div>

        <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-xl">
          <Building2 className="w-5 h-5 text-emerald-500" />
          <span className="text-slate-700 font-medium">{user.org}</span>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200">
          <StatusPill status={user.status} />
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            {user.lastLogin}
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionBtn({ icon: Icon, onClick }) {
  return (
    <button
      className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl grid place-items-center transition-all duration-200 backdrop-blur-sm"
      onClick={onClick}
    >
      <Icon className="w-5 h-5 text-white" />
    </button>
  );
}

function StatusPill({ status }) {
  const config = {
    ACTIVE: {
      text: "Active",
      class: "bg-emerald-100 text-emerald-700 border-emerald-300",
      Icon: CheckCircle2,
    },
    SUSPENDED: {
      text: "Suspended",
      class: "bg-red-100 text-red-700 border-red-300",
      Icon: Ban,
    },
  };

  const { text, class: className, Icon } = config[status] || config.ACTIVE;

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full border font-semibold ${className}`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </span>
  );
}

function RoleChip({ role }) {
  const config = {
    ADMIN: "bg-white/20 text-white border-white/30",
    OFFICER: "bg-white/20 text-white border-white/30",
    OWNER: "bg-white/20 text-white border-white/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border backdrop-blur-sm font-semibold ${config[role]}`}
    >
      <Shield className="w-3 h-3" />
      {role}
    </span>
  );
}

function Input({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        )}
        <input
          type={type}
          className="w-full bg-white/50 border border-white/30 rounded-xl pl-12 pr-4 py-4 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/80 transition-all backdrop-blur-sm"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </div>
  );
}

function Select({ label, value, onChange, options }) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <select
        className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/80 transition-all backdrop-blur-sm"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-sm font-bold text-slate-700 mb-2">
      {children}
    </label>
  );
}
