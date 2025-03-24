import { Navigate } from "react-router";
import { useLogoutMutation } from "../../hooks";

const LogoutPage: React.FC = () => {
  useLogoutMutation();

  return <Navigate to="/" replace />
}

export default LogoutPage;
