import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useIsDesktop from "../shared/utils/isDesktop.util";

const RequireMobileScreen = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useIsDesktop();
  const navigate = useNavigate();

  useEffect(() => {
    if (isDesktop) navigate("/notebooks");
  }, [isDesktop]);

  return !isDesktop ? <>{children}</> : null;
};

export default RequireMobileScreen;