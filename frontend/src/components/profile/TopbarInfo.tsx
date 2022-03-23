import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CogIcon } from "@heroicons/react/outline";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useAppSelector } from "../../redux/store";
import { userProfileTopBarInfo } from "../../interfaces/auth";
import {
  fetchUserInfoService,
  followUserService,
  unFollowUserService,
} from "../../services/user";

interface PropsIntf {
  username: string;
}

const TopbarInfo: React.FC<PropsIntf> = ({ username }) => {
  const { width } = useWindowDimensions();

  const auth = useAppSelector((state) => state.auth);

  const [userInfo, setUserInfo] = useState<userProfileTopBarInfo>({
    posts_count: 0,
    followings_count: 0,
    followers_count: 0,
    followed_by_user: false,
    user: null,
  });

  useEffect(() => {
    const handleFetchUserInfo = async () => {
      try {
        const res = await fetchUserInfoService(auth.token, username);
        const data = res.data as userProfileTopBarInfo;
        console.log(data);
        setUserInfo({
          posts_count: data.posts_count,
          followings_count: data.followings_count,
          followers_count: data.followers_count,
          followed_by_user: data.followed_by_user,
          user: data.user,
        });
      } catch (e) {
        console.log(e);
      }
    };
    handleFetchUserInfo();
  }, [auth.token, username]);

  const handleFollowUser = async () => {
    try {
      await followUserService(auth.token, username);
      setUserInfo({
        ...userInfo,
        followed_by_user: true,
        followers_count: ++userInfo.followers_count,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleUnFollowUser = async () => {
    try {
      await unFollowUserService(auth.token, username);
      setUserInfo({
        ...userInfo,
        followed_by_user: false,
        followers_count: --userInfo.followers_count,
      });
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="mb-6 md:mb-10 md:px-12 px-4">
        <div className="flex items-center md:items-stretch">
          <div className="relative mr-6 md:mr-24">
            <label
              title="Add a profile photo"
              htmlFor="image"
              className="cursor-pointer"
            >
              <img
                className="w-20 h-20 md:w-40 md:h-40 rounded-full border object-cover"
                src={userInfo.user?.profile?.image}
                alt={userInfo.user?.username}
              />
            </label>
            <input
              className="absolute top-0 bottom-0 left-0 right-0 hidden w-full h-full"
              type="file"
              accept="image/*"
              name="image"
              id="image"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-4 md:mb-6">
              <h2 className="text-3xl text-gray-600 font-light mr-5">
                {userInfo.user?.username}
              </h2>
              {width > 767 && userInfo.user?.username === auth.user?.username && (
                <Link
                  to="/"
                  className="border font-medium py-1 px-2 rounded text-sm mr-3"
                >
                  Edit Profile
                </Link>
              )}
              {userInfo.user?.username === auth.user?.username && (
                <CogIcon width={27} height={27} cursor="pointer" />
              )}
              {userInfo.user?.username !== auth.user?.username &&
                (userInfo.followed_by_user ? (
                  <button
                    onClick={handleUnFollowUser}
                    className={`border font-medium py-1 px-2 rounded text-sm mr-3 ${
                      width < 767 ? "block text-center" : ""
                    }`}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className={`border font-medium py-1 px-2 rounded text-sm mr-3 ${
                      width < 767 ? "block text-center" : ""
                    }`}
                  >
                    Follow
                  </button>
                ))}
            </div>
            {width < 767 && userInfo.user?.username === auth.user?.username && (
              <Link
                to="/"
                className="border font-medium py-1 px-2 rounded text-sm mr-3 block text-center"
              >
                Edit Profile
              </Link>
            )}
            {width > 767 && (
              <div className="text-gray-700">
                <span className="mr-10">
                  <b>{userInfo.posts_count}</b> posts
                </span>
                <span className="mr-10">
                  <Link to="">
                    <b>{userInfo.followers_count}</b> followers
                  </Link>
                </span>
                <span>
                  <Link to="">
                    <b>{userInfo.followings_count}</b> following
                  </Link>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {width < 767 && (
        <ul className="flex items-center border-t justify-center text-sm">
          <li className="mr-16">
            <Link to="" className="py-3 text-center block">
              <div>
                <span>
                  <b>{userInfo.posts_count}</b>
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-400">posts</span>
              </div>
            </Link>
          </li>
          <li className="mr-16">
            <Link to="" className="py-3 text-center block">
              <div>
                <span>
                  <b>{userInfo.followers_count}</b>
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-400">followers</span>
              </div>
            </Link>
          </li>
          <li>
            <Link to="" className="py-3 text-center block">
              <div>
                <span>
                  <b>{userInfo.followings_count}</b>
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-400">following</span>
              </div>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default TopbarInfo;
