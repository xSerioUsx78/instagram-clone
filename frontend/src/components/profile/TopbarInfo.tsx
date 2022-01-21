import { Link } from "react-router-dom";
import { CogIcon } from "@heroicons/react/outline";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const TopbarInfo = () => {
  const { width } = useWindowDimensions();

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
                src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                alt="admin"
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
                imortezaw_
              </h2>
              {width > 767 && (
                <Link
                  to="/"
                  className="border font-medium py-1 px-2 rounded text-sm mr-3"
                >
                  Edit Profile
                </Link>
              )}
              <CogIcon width={27} height={27} cursor="pointer" />
            </div>
            {width < 767 && (
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
                  <b>5</b> posts
                </span>
                <span className="mr-10">
                  <Link to="">
                    <b>1,039</b> followers
                  </Link>
                </span>
                <span>
                  <Link to="">
                    <b>477</b> following
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
                  <b>5</b>
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
                  <b>1,039</b>
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
                  <b>477</b>
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
