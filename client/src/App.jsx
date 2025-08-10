import { Routes, Route, Navigate } from "react-router-dom";
import PublicHome from "./pages/PublicHome.jsx";
import Login from "./pages/Login.jsx";
import PoliceDashboard from "./pages/PoliceDashboard.jsx";
import GsmbDashboard from "./pages/GsmbDashboard.jsx";
import OwnerDashboard from "./pages/OwnerDashboard.jsx";
import NotFound from "./pages/NotFound.jsx";
import { AuthProvider, useAuth } from "./contexts/AuthContext.jsx";

function Protected({ roles, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/login" element={<Login />} />

        <Route path="/police" element={<Protected roles={["POLICE","ADMIN"]}><PoliceDashboard /></Protected>} />
        <Route path="/gsmb" element={<Protected roles={["GSMB","ADMIN"]}><GsmbDashboard /></Protected>} />
        <Route path="/owner" element={<Protected roles={["OWNER","ADMIN"]}><OwnerDashboard /></Protected>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
