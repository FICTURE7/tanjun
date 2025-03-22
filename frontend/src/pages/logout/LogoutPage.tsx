import { Navigate } from "react-router";
import useLogoutMutation from "../../hooks/useLogoutMutation";

const LogoutPage: React.FC = () => {
  useLogoutMutation();

  return <Navigate to="/" replace />
}

export default LogoutPage;
