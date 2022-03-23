import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HomeIcon,
  HeartIcon,
  PlusCircleIcon,
  PaperAirplaneIcon,
  GlobeIcon,
  UserCircleIcon,
  BookmarkIcon,
  CogIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { showAddPostModal } from "../redux/slice/addPost";
import { logoutUser } from "../redux/slice/auth";
import routes from "../routes";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state.auth);

  const [showSearchResult, setShowSearchResult] = useState<boolean>(false);
  const [showAuthDropDown, setShowAuthDropDown] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowSearchResult(false);
      setShowAuthDropDown(false);
    });
    return () => document.removeEventListener("click", () => {});
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const handleSearchBarOnClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowSearchResult(true);
  };

  const handleAuthOnClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setShowAuthDropDown(true);
  };

  return (
    <div className="bg-white border-b py-2 px-4 fixed top-0 w-full z-50">
      <div className="max-w-screen-extmedium mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl logo-font font-bold">
            <Link to="/">Instagram</Link>
          </h1>
          <div className="w-56 relative z-50">
            <input
              placeholder="Search"
              onClick={handleSearchBarOnClick}
              className="appearance-none rounded-none relative block 
              w-full px-3 py-1 bg-gray-50 border border-gray-300 
              placeholder-gray-500 text-gray-900 rounded
              focus:outline-none focus:border-gray-400 focus:z-10 sm:text-sm"
            />
            {showSearchResult && (
              <div
                className="absolute left-1/2 transform -translate-x-2/4 bg-white
                shadow-md rounded-md overflow-y-auto h-96 w-96 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-md">Recent</span>
                  <button className="font-medium text-sm text-blue-500 focus:text-blue-400 cursor-pointer">
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </div>
          <ul className="flex items-center">
            <li>
              <Link to="/">
                <HomeIcon width={26} height={26} />
              </Link>
            </li>
            <li className="ml-4">
              <Link to={routes.directInbox}>
                <PaperAirplaneIcon
                  className="transform rotate-45"
                  width={26}
                  height={26}
                />
              </Link>
            </li>
            <li className="ml-4">
              <span className="select-none cursor-pointer">
                <PlusCircleIcon
                  onClick={() => dispatch(showAddPostModal())}
                  width={26}
                  height={26}
                />
              </span>
            </li>
            <li className="ml-4">
              <Link to={routes.explore}>
                <GlobeIcon width={26} height={26} />
              </Link>
            </li>
            <li className="ml-4">
              <Link to="/">
                <HeartIcon width={26} height={26} />
              </Link>
            </li>
            <li className="ml-4">
              <div
                className="relative z-50"
                onClick={() => setShowAuthDropDown(true)}
              >
                <img
                  onClick={handleAuthOnClick}
                  className="w-6 h-6 rounded-full cursor-pointer object-cover"
                  src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                  alt="default"
                />
                {showAuthDropDown && (
                  <div
                    className="absolute right-0 top-10 bg-white
                  shadow-md rounded-md w-56 text-sm"
                  >
                    <ul>
                      <li>
                        <Link
                          className="flex items-center px-4 hover:bg-gray-50 active:bg-gray-200 py-2 rounded-t-md"
                          to={routes.userProfile(auth.user?.username!)}
                        >
                          <UserCircleIcon width={20} height={20} />
                          <span className="ml-2">Profile</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center px-4 hover:bg-gray-50 active:bg-gray-200 py-2"
                          to={`${routes.userProfile(
                            auth.user?.username!
                          )}/saved`}
                        >
                          <BookmarkIcon width={20} height={20} />
                          <span className="ml-2">Saved</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center px-4 hover:bg-gray-50 active:bg-gray-200 py-2"
                          to=""
                        >
                          <CogIcon width={20} height={20} />
                          <span className="ml-2">Settings</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="flex items-center px-4 hover:bg-gray-50 active:bg-gray-200 py-2"
                          to=""
                        >
                          <SwitchHorizontalIcon width={20} height={20} />
                          <span className="ml-2">Switch Accounts</span>
                        </Link>
                      </li>
                      <hr />
                      <li>
                        <span
                          onClick={handleLogout}
                          className="flex items-center px-5 cursor-pointer
                        hover:bg-gray-50 0 active:bg-gray-200 py-2 rounded-b-md"
                        >
                          Log Out
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
