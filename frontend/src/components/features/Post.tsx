import React from "react";
import { Link } from "react-router-dom";
import { HeartIcon, ChatIcon, DuplicateIcon } from "@heroicons/react/solid";

interface PostIntf {
  specialPart?: boolean;
  multiFile?: boolean;
  image?: string;
  link?: string;
  likes_count?: number;
  comments_count?: number;
}

const Post: React.FC<PostIntf> = ({
  specialPart = false,
  multiFile = false,
  image,
  link,
  likes_count,
  comments_count,
}) => {
  return (
    <div
      className={`relative group w-full ${
        specialPart ? "row-span-2 col-span-2" : "h-auto md:h-72"
      }`}
    >
      <img
        className="object-cover w-full h-full"
        src={image || require("../../assets/post2.jpg")}
        alt="something"
      />
      {multiFile && (
        <div className="absolute right-2 top-2">
          <DuplicateIcon width={23} height={23} color="white" />
        </div>
      )}
      <Link
        to={link || ""}
        className="group-hover:bg-gray-900 group-hover:bg-opacity-30 absolute inset-0 flex flex-col md:flex-row items-center justify-center"
      >
        <div className="text-transparent group-hover:text-white font-medium flex items-center mr-8">
          <HeartIcon width={23} height={23} className="mr-1" />
          <span>{likes_count || 0}</span>
        </div>
        <div className="text-transparent group-hover:text-white font-medium flex items-center">
          <ChatIcon width={23} height={23} className="mr-1" />
          <span>{comments_count || 0}</span>
        </div>
      </Link>
    </div>
  );
};

export default Post;
