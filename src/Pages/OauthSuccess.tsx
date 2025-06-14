import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppDispatch } from "../Auth/store";
import { useDispatch } from "react-redux";
import { login as loginAction } from "../Auth/store/authSlice";


const API_URL = import.meta.env.VITE_API_URL;

function OAuthSuccess() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {
      // localStorage.setItem("token", token);

      axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        const user = res.data;
        // localStorage.setItem("user", JSON.stringify(res.data));
        dispatch(loginAction({ token, user }));
        navigate("/notebooks");
      }).catch(() => {
        navigate("/login");
      }).finally(() => setLoading(false));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return <p>{loading ? "Logging you in..." : "Redirecting..."}</p>;
};

export default OAuthSuccess;
