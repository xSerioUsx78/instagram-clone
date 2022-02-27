import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { PhotographIcon } from "@heroicons/react/outline";
import { useAppDispatch } from "../redux/store";
import { hideAddPostModal } from "../redux/slice/addPost";

const AddPost: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="h-full w-full fixed inset-0 z-50 bg-zinc-900 bg-opacity-90 flex items-center justify-center">
      <XIcon
        onClick={() => dispatch(hideAddPostModal())}
        className="absolute right-4 top-4"
        width={35}
        height={35}
        cursor="pointer"
        color="white"
      />
      <div className="bg-white rounded-xl w-[500px] h-[550px]">
        <div className="text-center px-4 py-2 border-b">
          <span className="font-medium">Create new post</span>
        </div>
        <div className="h-[92.5%] flex flex-col items-center justify-center">
          <div className="mb-2">
            <PhotographIcon width={70} height={70} />
          </div>
          <div className="mb-6">
            <span className="text-xl text-gray-600 font-thin">
              Upload photos and videos here
            </span>
          </div>
          <div>
            <label
              htmlFor="file"
              className="block relative bg-blue-500 rounded font-medium text-white px-2 py-1 text-sm cursor-pointer active:bg-blue-400 select-none"
            >
              Select from computer
              <input
                type="file"
                id="file"
                name="file"
                className="hidden absolute inset-0"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
