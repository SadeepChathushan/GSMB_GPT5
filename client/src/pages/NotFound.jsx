import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary">404</h1>
      <p className="text-gray-600">Page not found.</p>
      <Link to="/" className="btn btn-primary mt-4">Go Home</Link>
    </div>
  );
}
