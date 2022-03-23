import { Outlet, useParams, useOutletContext } from "react-router-dom";
import TabList from "./TabList";
import TopbarInfo from "./TopbarInfo";

type ContextType = { username: string };

const Profile = () => {
  const { username } = useParams();

  return (
    <div>
      <TopbarInfo username={username as string} />
      <TabList username={username as string} />
      <Outlet context={{ username }} />
    </div>
  );
};

export default Profile;

export const useUsername = () => {
  return useOutletContext<ContextType>();
};
