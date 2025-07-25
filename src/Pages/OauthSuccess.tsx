import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { login as loginAction } from "../store/authSlice";


const API_URL = import.meta.env.VITE_API_URL;

function OAuthSuccess() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (token) {

      axios.get(`${API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => {
        const user = res.data;
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


