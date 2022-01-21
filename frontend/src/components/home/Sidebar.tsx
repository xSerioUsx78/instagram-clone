import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="px-3 fixed h-screen w-full max-w-xs top-28">
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center">
          <img
            className="w-16 h-16 rounded-full object-cover border"
            src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
            alt="You"
          />
          <span className="ml-4 text-sm font-medium">Admin</span>
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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-medium text-gray-400">
          Suggestions For You
        </h2>
        <Link to="/" className="font-medium text-xs">
          See All
        </Link>
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              alt="You"
            />
            <span className="ml-4 text-sm font-medium">Admin</span>
          </Link>
          <div>
            <button
              className="text-blue-500 focus:text-blue-400 
            text-xs font-medium cursor-pointer"
            >
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              alt="You"
            />
            <span className="ml-4 text-sm font-medium">Admin</span>
          </Link>
          <div>
            <button
              className="text-blue-500 focus:text-blue-400 
            text-xs font-medium cursor-pointer"
            >
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              alt="You"
            />
            <span className="ml-4 text-sm font-medium">Admin</span>
          </Link>
          <div>
            <button
              className="text-blue-500 focus:text-blue-400 
            text-xs font-medium cursor-pointer"
            >
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              alt="You"
            />
            <span className="ml-4 text-sm font-medium">Admin</span>
          </Link>
          <div>
            <button
              className="text-blue-500 focus:text-blue-400 
            text-xs font-medium cursor-pointer"
            >
              Follow
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <Link to="/" className="flex items-center">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
              alt="You"
            />
            <span className="ml-4 text-sm font-medium">Admin</span>
          </Link>
          <div>
            <button
              className="text-blue-500 focus:text-blue-400 
            text-xs font-medium cursor-pointer"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
      <div>
        <span className="text-gray-400 font-medium text-xs">
          &copy; 2021 INSTAGRAM CLONE FROM MORTEZA MN
        </span>
      </div>
    </div>
  );
};

export default Sidebar;
