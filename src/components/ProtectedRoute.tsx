import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/verify", { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          setAuthenticated(true);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error("Not authenticated", err);
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return <>{authenticated ? children : null}</>;
}

export default ProtectedRoute;
