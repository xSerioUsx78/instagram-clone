import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/store";
import routes from "../../routes";
import Spin from "../features/animation/Spin";
import {
  fetchUserSuggestionsService,
  followUserService,
} from "../../services/user";
import { UserSuggestionsInterface } from "../../interfaces/auth";

const Sidebar = () => {
  const auth = useAppSelector((state) => state.auth);

  const [suggestions, setSuggestions] = useState<UserSuggestionsInterface[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      try {
        const res = await fetchUserSuggestionsService(auth.token);
        const data = res.data as UserSuggestionsInterface[];
        setSuggestions(data);
      } catch (e: any) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchUserSuggestions();
  }, [auth.token]);

  const handleFollowUser = async (username: string) => {
    try {
      await followUserService(auth.token, username);
      setSuggestions((prevValues) =>
        prevValues.filter((obj) => obj.username !== username)
      );
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div className="px-3 fixed h-screen w-full max-w-xs top-28">
      <div className="flex items-center justify-between mb-6">
        <Link
          to={routes.userProfile(auth.user?.username!)}
          className="flex items-center"
        >
          <img
            className="w-16 h-16 rounded-full object-cover border"
            src={auth.user?.profile?.image}
            alt={auth.user?.username}
          />
          <span className="ml-4 text-sm font-medium">
            {auth.user?.username}
          </span>
        </Link>
        <div>
          <button
            className="text-blue-500 focus:text-blue-400 
          text-xs font-medium cursor-pointer"
          >
            Switch
          </button>
        </div>
      </div>
      {suggestions.length > 0 && (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-gray-400">
              Suggestions For You
            </h2>
            <Link to="/" className="font-medium text-xs">
              See All
            </Link>
          </div>
          {loading ? (
            <Spin textColor="text-blue-500" className="!mx-auto" />
          ) : (
            <div className="mb-6">
              {suggestions.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between mb-4"
                >
                  <Link
                    to={routes.userProfile(user.username)}
                    className="flex items-center"
                  >
                    <img
                      className="w-8 h-8 rounded-full object-cover"
                      src={user.profile.image}
                      alt={user.username}
                    />
                    <span className="ml-4 text-sm font-medium">
                      {user.username}
                    </span>
                  </Link>
                  <div>
                    <button
                      onClick={() => handleFollowUser(user.username)}
                      className="text-blue-500 focus:text-blue-400 
            text-xs font-medium cursor-pointer"
                    >
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div>
        <span className="text-gray-400 font-medium text-xs">
          &copy; 2021 INSTAGRAM CLONE FROM MORTEZA MN
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
