import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import { HeartIcon } from "@heroicons/react/solid";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import TextareaAutosize from "react-textarea-autosize";
import routes from "../../routes";
import MorePosts from "../features/Post";
import { fetchPostDetailService } from "../../services/post";
import { useAppSelector } from "../../redux/store";

const Post: React.FC = () => {
  const { id } = useParams() as any;

  const auth = useAppSelector((state) => state.auth);

  const [data, setData] = useState<any>({}); // any for now
  const [loading, setLoading] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetchPostDetailService(auth.token, id);
        console.log(res.data);
        setData(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    document.addEventListener("click", () => {
      setShowPicker(false);
    });
    return () => document.removeEventListener("click", () => {});
  }, [auth.token, id]);

  const handleShowPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiSelect = (emoji: any) => {
    setComment(comment + emoji.native);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div>
      <div className="flex mx-14 border text-sm mb-10">
        <div className="w-7/12">
          <img
            className={`w-full h-full object-cover`}
            src={require("../../assets/post2.jpg")}
            alt="harchihala"
          />
        </div>
        <div className="w-5/12 bg-white rounded-md py-3">
          <div>
            <div className="flex items-center justify-between pb-3 px-4 border-b">
              <div className="flex items-center w-11/12">
                <Link to={routes.userProfile("imortezaw_")} className="w-2/12">
                  <img
                    className="w-9 h-9 rounded-full border"
                    src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                    alt="pro"
                  />
                </Link>
                <Link
                  to={routes.userProfile("imortezaw_")}
                  className="font-medium ml-1 hover:underline w-2/12"
                >
                  imortezaw_
                </Link>
              </div>
              <DotsHorizontalIcon
                width={18}
                height={18}
                cursor="pointer"
                className="w-1/12"
              />
            </div>
            <div className="border-b mb-3">
              <div className="px-4 py-5 overflow-y-auto h-80 box-content">
                <div className="flex mb-4">
                  <div className="w-2/12">
                    <img
                      className="w-9 h-9 rounded-full border"
                      src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                      alt="pro"
                    />
                  </div>
                  <div className="w-10/12">
                    <div className="mb-3">
                      <span className="font-medium mr-1">
                        <Link to="imortezaw_" className="hover:underline">
                          imortezaw_
                        </Link>
                      </span>
                      <span>
                        Description das das dsa dasda as sada
                        <Link
                          to={routes.tags("hashtag")}
                          className="ml-1 text-blue-800 focus:opacity-50"
                        >
                          #Hashtag
                        </Link>
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium text-xs">
                        37w
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mb-5">
                  <div className="w-11/12">
                    <div className="flex">
                      <div className="mr-1.5 w-2/12">
                        <img
                          className="w-9 h-9 rounded-full border"
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          alt="pro"
                        />
                      </div>
                      <div className="w-10/12">
                        <div className="mb-4">
                          <span className="font-medium mr-1">
                            <Link to="imortezaw_" className="hover:underline">
                              imortezaw_
                            </Link>
                          </span>
                          <span>
                            Comment text here dasdsa dasd sada sada dsa asds
                          </span>
                        </div>
                        <div className="flex text-xs text-gray-400">
                          <Link
                            className="font-medium mr-3"
                            to="somewhere else"
                          >
                            <span>37w</span>
                          </Link>
                          <span className="font-bold mr-3 cursor-pointer">
                            1 Like
                          </span>
                          <span className="font-bold cursor-pointer">
                            Reply
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <HeartIcon
                    width={15}
                    height={15}
                    cursor="pointer"
                    className="text-red-600 mt-1 ml-2 w-1/12"
                  />
                </div>
                <div className="flex justify-between mb-5">
                  <div className="w-11/12">
                    <div className="flex">
                      <div className="mr-1.5 w-2/12">
                        <img
                          className="w-9 h-9 rounded-full border"
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          alt="pro"
                        />
                      </div>
                      <div className="w-10/12">
                        <div className="mb-4">
                          <span className="font-medium mr-1">
                            <Link to="imortezaw_" className="hover:underline">
                              imortezaw_
                            </Link>
                          </span>
                          <span>
                            Comment text here dasdsa dasd sada sada dsa asdsddd
                            dd
                          </span>
                        </div>
                        <div className="flex text-xs text-gray-400">
                          <Link
                            className="font-medium mr-3"
                            to="somewhere else"
                          >
                            <span>37w</span>
                          </Link>
                          <span className="font-bold mr-3 cursor-pointer">
                            1 Like
                          </span>
                          <span className="font-bold cursor-pointer">
                            Reply
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <HeartIcon
                    width={15}
                    height={15}
                    cursor="pointer"
                    className="text-red-600 mt-1 ml-2 w-1/12"
                  />
                </div>
                <div className="flex justify-between mb-5">
                  <div className="w-11/12">
                    <div className="flex">
                      <div className="mr-1.5 w-2/12">
                        <img
                          className="w-9 h-9 rounded-full border"
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          alt="pro"
                        />
                      </div>
                      <div className="w-10/12">
                        <div className="mb-4">
                          <span className="font-medium mr-1">
                            <Link to="imortezaw_" className="hover:underline">
                              imortezaw_
                            </Link>
                          </span>
                          <span>
                            Comment text here dasdsa dasd sada sada dsa asdsddd
                            dd
                          </span>
                        </div>
                        <div className="flex text-xs text-gray-400">
                          <Link
                            className="font-medium mr-3"
                            to="somewhere else"
                          >
                            <span>37w</span>
                          </Link>
                          <span className="font-bold mr-3 cursor-pointer">
                            1 Like
                          </span>
                          <span className="font-bold cursor-pointer">
                            Reply
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <HeartIcon
                    width={15}
                    height={15}
                    cursor="pointer"
                    className="text-red-600 mt-1 ml-2 w-1/12"
                  />
                </div>
                <div className="flex justify-between">
                  <div className="w-11/12">
                    <div className="flex">
                      <div className="mr-1.5 w-2/12">
                        <img
                          className="w-9 h-9 rounded-full border"
                          src="https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
                          alt="pro"
                        />
                      </div>
                      <div className="w-10/12">
                        <div className="mb-4">
                          <span className="font-medium mr-1">
                            <Link to="imortezaw_" className="hover:underline">
                              imortezaw_
                            </Link>
                          </span>
                          <span>
                            Comment text here dasdsa dasd sada sada dsa asdsddd
                            dd
                          </span>
                        </div>
                        <div className="flex text-xs text-gray-400">
                          <Link
                            className="font-medium mr-3"
                            to="somewhere else"
                          >
                            <span>37w</span>
                          </Link>
                          <span className="font-bold mr-3 cursor-pointer">
                            1 Like
                          </span>
                          <span className="font-bold cursor-pointer">
                            Reply
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <HeartIcon
                    width={15}
                    height={15}
                    cursor="pointer"
                    className="text-red-600 mt-1 ml-2 w-1/12"
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 px-4 text-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <HeartIcon
                    className="mr-3 text-red-600"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                  <ChatIcon
                    className="mr-4 hover:text-gray-500"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                  <PaperAirplaneIcon
                    className="transform rotate-45 hover:text-gray-500"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                </div>
                <div>
                  <BookmarkIcon
                    className="hover:text-gray-500"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                </div>
              </div>
              <div className="mb-0.5">
                <span className="font-medium">
                  <Link to={routes.likedBy(1)}>10 likes</Link>
                </span>
              </div>
              <div>
                <Link
                  to={routes.postDetail(1)}
                  className="text-gray-400 focus:text-opacity-70 uppercase"
                >
                  <small>2 week ago</small>
                </Link>
              </div>
            </div>
            <hr />
            <div className="px-4 flex items-center justify-between mt-3 text-gray-700">
              <div className="flex items-center w-11/12">
                <div
                  className="relative"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <EmojiHappyIcon
                    width={30}
                    height={30}
                    cursor="pointer"
                    className="hover:text-gray-500 mr-3"
                    onClick={handleShowPicker}
                  />
                  {showPicker && (
                    <Picker
                      color="#3B82F6"
                      style={{
                        position: "absolute",
                        bottom: 45,
                        left: 0,
                        zIndex: 2,
                        boxShadow: "rgba(99, 99, 99, 0.2) 0 2px 8px 0",
                      }}
                      set="apple"
                      showPreview={false}
                      onSelect={handleEmojiSelect}
                    />
                  )}
                </div>
                <TextareaAutosize
                  maxRows={4}
                  placeholder="Add a comment"
                  className="w-full outline-none resize-none"
                  style={{ height: 20 }}
                  value={comment}
                  onChange={handleCommentText}
                />
              </div>
              <div>
                <button className="text-blue-500 focus:text-blue-400 font-medium">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="mt-10">
        <div className="mb-4">
          <h2 className="font-medium text-gray-400 text-sm">
            More posts from{" "}
            <Link
              className="text-gray-700"
              to={routes.userProfile("imortezaw_")}
            >
              imortezaw_
            </Link>
          </h2>
        </div>
        <MorePosts />
      </div>
    </div>
  );
};

export default Post;
