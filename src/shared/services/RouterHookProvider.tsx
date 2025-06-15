// RouterHooksProvider.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogoutHandler } from "../apiClient/apiClient";
import { logout } from "../../Auth/store/authSlice";
import { AppDispatch } from "../../Auth/store";

const RouterHooksProvider = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setLogoutHandler(() => {
      dispatch(logout());
      navigate("/login", { state: { message: "Session expired. Please login again." }});
    });
  }, [dispatch, navigate]);

  return null;
};

export default RouterHooksProvider;
