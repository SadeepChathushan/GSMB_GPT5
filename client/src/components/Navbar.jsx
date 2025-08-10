import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="text-primary font-bold">GSMB MLVS</Link>
        <nav className="flex items-center gap-4">
          {!user && <Link to="/login" className="text-primary">Login</Link>}
          {user && (
            <>
              {user.role === "POLICE" && <Link to="/police">Police</Link>}
              {user.role === "GSMB" && <Link to="/gsmb">GSMB</Link>}
              {user.role === "OWNER" && <Link to="/owner">Owner</Link>}
              <button onClick={logout} className="btn btn-danger">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
