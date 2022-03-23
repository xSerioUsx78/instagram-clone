import { NavLink, useLocation } from "react-router-dom";
import {
  ViewGridIcon,
  BookmarkIcon,
  UserGroupIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import styles from "../../styles/profile/tabList.module.css";
import { useAppSelector } from "../../redux/store";

interface PropsIntf {
  username: string;
}

const TabList: React.FC<PropsIntf> = ({ username }) => {
  const location = useLocation();

  const auth = useAppSelector((state) => state.auth);

  return (
    <div>
      <ul className="flex items-center border-t justify-center text-xs">
        <li className="md:mr-16">
          <NavLink
            to=""
            className={`${
              !location.pathname.includes("saved") &&
              !location.pathname.includes("tagged") &&
              !location.pathname.includes("channel") &&
              styles.active
            } px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center`}
          >
            <ViewGridIcon className="md:mr-1 w-7 h-7 md:w-4 md:h-4" />
            <span className="font-medium hidden md:inline">POSTS</span>
          </NavLink>
        </li>
        {auth.user?.username === username ? (
          <li className="md:mr-16">
            <NavLink
              to="saved"
              className={(navData) =>
                navData.isActive
                  ? `${styles.active} px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center`
                  : "px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center"
              }
            >
              <BookmarkIcon className="md:mr-1 w-7 h-7 md:w-4 md:h-4" />
              <span className="font-medium hidden md:inline">SAVED</span>
            </NavLink>
          </li>
        ) : (
          <li className="md:mr-16">
            <NavLink
              to="channel"
              className={(navData) =>
                navData.isActive
                  ? `${styles.active} px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center`
                  : "px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center"
              }
            >
              <VideoCameraIcon className="md:mr-1 w-7 h-7 md:w-4 md:h-4" />
              <span className="font-medium hidden md:inline">VIDEOS</span>
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="tagged"
            className={(navData) =>
              navData.isActive
                ? `${styles.active} px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center`
                : "px-12 py-2 md:px-0 md:border-t md:border-transparent md:-mt-0.5 md:py-5 text-gray-500 flex items-center"
            }
          >
            <UserGroupIcon className="md:mr-1 w-7 h-7 md:w-4 md:h-4" />
            <span className="font-medium hidden md:inline">TAGGED</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TabList;
