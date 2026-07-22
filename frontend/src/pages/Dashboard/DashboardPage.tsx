import { useAuth } from "../../lib/Auth/AuthContext";

function Dashboard() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="p-6">
      <h1>{isAuthenticated ? `Hello ${user?.name}` : "Not logged in"}</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;