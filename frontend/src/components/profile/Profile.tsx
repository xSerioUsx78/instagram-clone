import { Outlet } from "react-router-dom"
import TabList from "./TabList"
import TopbarInfo from "./TopbarInfo"

const Profile = () => {
  return (
    <div>
      <TopbarInfo />
      <TabList />
      <Outlet />
    </div>
  )
}

export default Profile
