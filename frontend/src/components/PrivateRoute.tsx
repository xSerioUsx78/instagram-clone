import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import AuthLoading from './AuthLoading';


const PrivateRoute = ({ children }: {children: JSX.Element}) => {

  const auth = useAppSelector(state => state.auth);
  const location = useLocation();

  return (
    auth.isLoading
    ?
    <AuthLoading />
    :
    !auth.isAuthenticated
    ?
    <Navigate to={`/accounts/login?next=${location.pathname}`} />
    :
    children
  )
};

export default PrivateRoute;
