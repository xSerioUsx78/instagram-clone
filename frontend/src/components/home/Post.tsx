import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  DotsHorizontalIcon,
  HeartIcon,
  ChatIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/solid";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import TextareaAutosize from "react-textarea-autosize";
import { PostIntf, PostFieldIntf } from "../../interfaces/home/posts";
import routes from "../../routes";
import { useAppSelector } from "../../redux/store";
import {
  addLikeService,
  addPostToSaved,
  deleteLikeService,
  deletePostFromSaved,
  postCommentService,
} from "../../services/post";
import {
  limitText,
  getPostDescription,
  getCommentText,
} from "../../utils/utility";

SwiperCore.use([Navigation, Pagination]);

interface PropsIntf {
  posts: PostIntf;
  setPosts: React.Dispatch<React.SetStateAction<PostIntf>>;
}

interface CommentIntf {
  [id: number]: string;
}

interface ShowPickerIntf {
  [id: number]: boolean;
}

const Post: React.FC<PropsIntf> = ({ posts, setPosts }) => {
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);
  const [comment, setComment] = useState<CommentIntf>({});
  const [showPicker, setShowPicker] = useState<ShowPickerIntf>({});

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowPicker(() => ({}));
    });
    return () => document.removeEventListener("click", () => {});
  }, []);

  const handleHeartIcon = (post: PostFieldIntf, i: number) => {
    const userLike = post.likes.filter(
      (like) => like.user.id === auth.user!.id
    );
    return userLike.length > 0 ? (
      <HeartIconSolid
        className="mr-3 text-red-600 select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={() => handlePostRemoveLike(post.id, i)}
      />
    ) : (
      <HeartIcon
        className="mr-3 hover:text-gray-500 select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={() => handlePostAddLike(post.id, i)}
      />
    );
  };

  const handleLikeSection = (post: PostFieldIntf) => {
    const likes = post.likes.filter((like) => like.user.id !== auth.user!.id);
    if (likes.length > 0) {
      const latestUserLiked = likes[0];
      return (
        <div className="font-medium flex items-center">
          <Link to={routes.likedBy(post.id)}>
            <img
              className="w-5 h-5 rounded-full mr-2"
              src={latestUserLiked.user.profile.image}
              alt={latestUserLiked.user.username}
            />
          </Link>
          <div>
            <span>
              <span className="text-gray-600 font-normal">Liked by</span>
              <Link
                className="mx-1 hover:underline"
                to={routes.userProfile(latestUserLiked.user.username)}
              >
                {latestUserLiked.user.username}
              </Link>
              {post.likes_count - 1 > 0 && (
                <>
                  <span className="text-gray-600 font-normal">and</span>
                  <Link className="ml-1" to={routes.likedBy(post.id)}>
                    {post.likes_count - 1} others
                  </Link>
                </>
              )}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <span className="font-medium">
          <Link to={routes.likedBy(post.id)}>{post.likes_count} likes</Link>
        </span>
      );
    }
  };

  const handleCommentSection = (post: PostFieldIntf) => {
    const comments = post.comments.slice(0, 3);
    return comments.map((comment) => (
      <div key={comment.id} className="mb-0.5">
        <span className="mr-1">
          <Link
            to={routes.userProfile(comment.user.username)}
            className="hover:underline font-medium"
          >
            {comment.user.username}
          </Link>
        </span>
        <span>{getCommentText(limitText(comment.text, 150))}</span>
      </div>
    ));
  };

  const handleEmojiSelect = (emoji: any, postID: number) => {
    // I access the prevValues to get the latest values of the comments
    setComment((prevValues: CommentIntf) => ({
      ...prevValues,
      [postID]: prevValues[postID]
        ? prevValues[postID] + emoji.native
        : emoji.native,
    }));
  };

  const handleShowEmojiPicker = (postID: number) => {
    // I access the prevValues to get the latest value of the showPicker
    setShowPicker((prevValues: ShowPickerIntf) => ({
      ...prevValues,
      [postID]: prevValues[postID] ? false : true,
    }));
    // Because it is maybe undefined, i checked if it was undefined or false, set it to true
  };

  const handlePostAddLike = async (id: number, i: number) => {
    if (
      posts.data[i].likes.filter((like) => like.user.id === auth.user!.id)
        .length !== 1
    ) {
      try {
        const res = await addLikeService(auth.token, id);
        const newLike = res.data.like;
        const postsShallow = { ...posts };
        postsShallow.data[i].likes_count++;
        postsShallow.data[i].likes.push(newLike);
        setPosts(postsShallow);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePostRemoveLike = (id: number, i: number) => {
    try {
      deleteLikeService(auth.token, id);
      const postsShallow = { ...posts };
      postsShallow.data[i].likes_count--;
      postsShallow.data[i].likes = postsShallow.data[i].likes.filter(
        (like) => like.user.id !== auth.user!.id
      );
      setPosts(postsShallow);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentText = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    postID: number
  ) => {
    setComment({ ...comment, [postID]: e.target.value });
  };

  const handlePostSavedSection = (post: PostFieldIntf, i: number) => {
    const saved = post.saved;
    return saved.length > 0 ? (
      <BookmarkIconSolid
        className="select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={() => handleRemovePostFromSaved(post.id, i)}
      />
    ) : (
      <BookmarkIcon
        className="hover:text-gray-500 select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={() => handleAddPostToSaved(post.id, i)}
      />
    );
  };

  const handleAddPostToSaved = async (id: number, i: number) => {
    if (posts.data[i].saved.length !== 1) {
      try {
        const res = await addPostToSaved(auth.token, id);
        const newSaved = res.data.saved;
        const postsShallow = { ...posts };
        postsShallow.data[i].saved.push(newSaved);
        setPosts(postsShallow);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRemovePostFromSaved = (id: number, i: number) => {
    try {
      deletePostFromSaved(auth.token, id);
      const postsShallow = { ...posts };
      postsShallow.data[i].saved = [];
      setPosts(postsShallow);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePostComment = async (postID: number, i: number) => {
    try {
      const res = await postCommentService(auth.token, postID, comment[postID]);
      const newComment = res.data.comment;
      console.log(newComment);
      const postsShollow = { ...posts };
      postsShollow.data[i].comments.unshift(newComment);
      postsShollow.data[i].comments_count++;
      setPosts(postsShollow);
      setComment({ ...comment, [postID]: "" });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {posts.data.length > 0 &&
        posts.data.map((post, i) => (
          <div
            key={post.id}
            className="mb-6 border bg-white rounded py-3 w-full h-full text-sm"
          >
            <div className="flex items-center justify-between px-4 mb-4">
              <div className="flex items-center">
                <div className="mr-4">
                  {post.user.storys.length > 0 ? (
                    <img
                      className="w-8 h-8 object-cover rounded-full ring-2 ring-red-500 ring-offset-2 cursor-pointer"
                      src={post.user.profile.image}
                      alt={post.user.username}
                    />
                  ) : (
                    <Link to={routes.postDetail(post.id)}>
                      <img
                        className="w-8 h-8 object-cover rounded-full"
                        src={post.user.profile.image}
                        alt={post.user.username}
                      />
                    </Link>
                  )}
                </div>
                <div>
                  <h2>
                    <Link
                      to={`/${post.user.username}`}
                      className="font-medium hover:underline"
                    >
                      {post.user.username}
                    </Link>
                  </h2>
                  {post.location && (
                    <span className="text-gray-600 text-xs">
                      {post.location}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <DotsHorizontalIcon
                  className="cursor-pointer"
                  width={18}
                  height={18}
                />
              </div>
            </div>
            <div className="h-full w-full mb-4 post">
              <Swiper
                onDoubleClick={() => handlePostAddLike(post.id, i)}
                loop={false}
                navigation={true}
                pagination={true}
                className="mySwiper"
              >
                {post.files.map((file) => (
                  <SwiperSlide key={file.id} className="relative pb-full">
                    <img
                      className="w-full h-full object-cover absolute left-0 top-0"
                      src={file.file}
                      alt={post.user.username}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="mb-4 px-4 text-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  {handleHeartIcon(post, i)}
                  <ChatIcon
                    className="mr-4 hover:text-gray-500"
                    width={30}
                    height={30}
                    cursor="pointer"
                    onClick={() => navigate(routes.postDetail(post.id))}
                  />
                  <PaperAirplaneIcon
                    className="transform rotate-45 hover:text-gray-500"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                </div>
                <div>{handlePostSavedSection(post, i)}</div>
              </div>
              <div className="mb-2">{handleLikeSection(post)}</div>
              <div className="mb-0.5">
                <span className="font-medium mr-1">
                  <Link
                    to={routes.userProfile(post.user.username)}
                    className="hover:underline"
                  >
                    {post.user.username}
                  </Link>
                </span>
                <span>{getPostDescription(post.description)}</span>
              </div>
              <div className="mb-0.5">
                <Link
                  to={routes.postDetail(post.id)}
                  className="text-gray-400 focus:text-opacity-70 block"
                >
                  View all {post.comments_count} comments
                </Link>
              </div>
              {handleCommentSection(post)}
              <div>
                <Link
                  to={routes.postDetail(post.id)}
                  className="text-gray-400 focus:text-opacity-70"
                >
                  <small>{post.created_time} ago</small>
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
                    onClick={() => handleShowEmojiPicker(post.id)}
                    width={30}
                    height={30}
                    cursor="pointer"
                    className="hover:text-gray-500 mr-3"
                  />
                  {showPicker[post.id] && (
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
                      onSelect={(emoji) => handleEmojiSelect(emoji, post.id)}
                      showPreview={false}
                    />
                  )}
                </div>
                <TextareaAutosize
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleCommentText(e, post.id)
                  }
                  maxRows={4}
                  placeholder="Add a comment"
                  className="w-full outline-none resize-none"
                  style={{ height: 20 }}
                  value={comment[post.id]}
                />
              </div>
              <div>
                {comment[post.id] ? (
                  <button
                    onClick={() => handlePostComment(post.id, i)}
                    className="text-blue-500 focus:text-blue-400 font-medium"
                  >
                    Post
                  </button>
                ) : (
                  <button
                    disabled
                    className="text-blue-200 cursor-default font-medium"
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Post;
