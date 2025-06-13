import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;

function OAuthSuccess() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      localStorage.setItem("token", token);

      axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/dashboard");
      }).catch(() => {
        navigate("/login");
      }).finally(() => setLoading(false));
    } else {
      navigate("/login");
    }
  }, []);

  return <p>{loading ? "Logging you in..." : "Redirecting..."}</p>;
};

export default OAuthSuccess;
