import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { useUsername } from "./profile/Profile";

const UserProtect: React.FC = ({ children }) => {
  const { username } = useUsername();

  const auth = useAppSelector((state) => state.auth);
  if (auth.user?.username !== username) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default UserProtect;
