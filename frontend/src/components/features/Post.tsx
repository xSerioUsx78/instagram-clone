import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ChatIcon } from "@heroicons/react/solid";

interface PostIntf {
  specialPart?: boolean;
  index?: number;
}

const Post: React.FC<PostIntf> = ({ specialPart=false, index }) => {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-7">
      <div
        className={`relative group w-full ${
          specialPart && "row-span-2 col-span-2"
        }`}
      >
        <img
          className="object-cover w-full h-full"
          src={require("../../assets/post2.jpg")}
          alt="something"
        />
        <Link
          to=""
          className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
            <HeartIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
          <div className="text-transparent group-hover:text-white font-medium flex items-center">
            <ChatIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
        </Link>
      </div>
      <div className="relative group w-full h-auto md:h-72">
        <img
          className="object-cover w-full h-full"
          src={require("../../assets/post2.jpg")}
          alt="something"
        />
        <Link
          to=""
          className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
            <HeartIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
          <div className="text-transparent group-hover:text-white font-medium flex items-center">
            <ChatIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
        </Link>
      </div>
      <div className="relative group w-full h-auto md:h-72">
        <img
          className="object-cover w-full h-full"
          src={require("../../assets/post2.jpg")}
          alt="something"
        />
        <Link
          to=""
          className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
            <HeartIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
          <div className="text-transparent group-hover:text-white font-medium flex items-center">
            <ChatIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
        </Link>
      </div>
      <div className="relative group w-full h-auto md:h-72">
        <img
          className="object-cover w-full h-full"
          src={require("../../assets/post2.jpg")}
          alt="something"
        />
        <Link
          to=""
          className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
            <HeartIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
          <div className="text-transparent group-hover:text-white font-medium flex items-center">
            <ChatIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
        </Link>
      </div>
      <div className="relative group w-full h-auto md:h-72">
        <img
          className="object-cover w-full h-full"
          src={require("../../assets/post2.jpg")}
          alt="something"
        />
        <Link
          to=""
          className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
            <HeartIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
          <div className="text-transparent group-hover:text-white font-medium flex items-center">
            <ChatIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
        </Link>
      </div>
      <div className="relative group w-full h-auto md:h-72">
        <img
          className="object-cover w-full h-full"
          src={require("../../assets/post2.jpg")}
          alt="something"
        />
        <Link
          to=""
          className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
        >
          <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
            <HeartIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
          <div className="text-transparent group-hover:text-white font-medium flex items-center">
            <ChatIcon width={23} height={23} className="mr-1" />
            <span>121</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Post;
