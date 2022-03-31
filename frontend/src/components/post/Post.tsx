import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import {
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  ChatIcon,
  BookmarkIcon as BookmarkIconOutline,
  EmojiHappyIcon,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
} from "@heroicons/react/solid";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import TextareaAutosize from "react-textarea-autosize";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import routes from "../../routes";
import PostWrapper from "../features/PostWrapper";
import MorePost from "../features/Post";
import { fetchPostDetailService } from "../../services/post";
import { useAppSelector } from "../../redux/store";
import {
  PostDetailIntf,
  CommentsFieldIntf,
  ReplyCommentsFieldIntf,
} from "../../interfaces/home/posts";
import { endpoint } from "../../utils/server";
import {
  addLikeService,
  addPostToSaved,
  deleteLikeService,
  deletePostFromSaved,
  postCommentService,
} from "../../services/post";
import {
  addLikeService as commentAddLikeService,
  deleteLikeService as commentDeleteLikeService,
  fetchCommentRepliesService,
} from "../../services/comment";
import Spin from "../features/animation/Spin";
import { getPostDescription, getCommentText } from "../../utils/utility";

SwiperCore.use([Navigation, Pagination]);

interface CommentInterface {
  text: string;
  reply_id: number | null;
}

interface CommentRepliesInterface {
  [id: number]: {
    isLoading: boolean;
    data: ReplyCommentsFieldIntf[];
    show: boolean;
  };
}

const Post: React.FC = () => {
  const { id } = useParams() as any;

  const auth = useAppSelector((state) => state.auth);

  const [data, setData] = useState<PostDetailIntf>({
    more_posts: [],
    obj: null,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [comment, setComment] = useState<CommentInterface>({
    text: "",
    reply_id: null,
  });
  const [commentReplies, setCommentReplies] = useState<CommentRepliesInterface>(
    {}
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    setComment({
      ...comment,
      text: comment.text + emoji.native,
    });
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment({
      ...comment,
      text: e.target.value,
    });
  };

  const handlePostAddLike = async () => {
    if (
      data.obj!.likes.filter((like) => like.user.id === auth.user!.id)
        .length !== 1
    ) {
      try {
        const res = await addLikeService(auth.token, data.obj!.id);
        const newLike = res.data.like;
        const dataShallow = { ...data };
        dataShallow.obj!.likes_count++;
        dataShallow.obj!.likes.push(newLike);
        setData(dataShallow);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handlePostRemoveLike = async () => {
    try {
      await deleteLikeService(auth.token, data.obj!.id);
      const dataShallow = { ...data };
      dataShallow.obj!.likes_count--;
      dataShallow.obj!.likes = dataShallow.obj!.likes.filter(
        (like) => like.user.id !== auth.user!.id
      );
      setData(dataShallow);
    } catch (e) {
      console.log(e);
    }
  };

  const handleHeartIcon = () => {
    const userLike = data.obj!.likes.filter(
      (like) => like.user.id === auth.user!.id
    );
    return userLike.length > 0 ? (
      <HeartIconSolid
        className="mr-3 text-red-600 select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={handlePostRemoveLike}
      />
    ) : (
      <HeartIconOutline
        className="mr-3 hover:text-gray-500 select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={handlePostAddLike}
      />
    );
  };

  const handleLikeSection = () => {
    const likes = data.obj!.likes.filter(
      (like) => like.user.id !== auth.user!.id
    );
    if (likes.length > 0) {
      const latestUserLiked = likes[0];
      return (
        <div className="font-medium flex items-center">
          <Link to={routes.likedBy(data.obj!.id)}>
            <img
              className="w-5 h-5 rounded-full mr-2"
              src={`${endpoint}${latestUserLiked.user.profile.image}`}
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
              {data.obj!.likes_count - 1 > 0 && (
                <>
                  <span className="text-gray-600 font-normal">and</span>
                  <Link className="ml-1" to={routes.likedBy(data.obj!.id)}>
                    {data.obj!.likes_count - 1}{" "}
                    {data.obj!.likes_count - 1 > 1 ? "others" : "other"}
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
          <Link to={routes.likedBy(data.obj!.id)}>
            {data.obj!.likes_count}{" "}
            {data.obj!.likes_count > 1 ? "likes" : "like"}
          </Link>
        </span>
      );
    }
  };

  const handlePostSavedSection = () => {
    const saved = data.obj!.saved;
    return saved.length > 0 ? (
      <BookmarkIconSolid
        className="select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={handleRemovePostFromSaved}
      />
    ) : (
      <BookmarkIconOutline
        className="hover:text-gray-500 select-none"
        width={30}
        height={30}
        cursor="pointer"
        onClick={handleAddPostToSaved}
      />
    );
  };

  const handleAddPostToSaved = async () => {
    if (data.obj!.saved.length !== 1) {
      try {
        const res = await addPostToSaved(auth.token, id);
        const newSaved = res.data.saved;
        const dataShallow = { ...data };
        dataShallow.obj!.saved.push(newSaved);
        setData(dataShallow);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleRemovePostFromSaved = () => {
    try {
      deletePostFromSaved(auth.token, id);
      const dataShallow = { ...data };
      dataShallow.obj!.saved = [];
      setData(dataShallow);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePostComment = async () => {
    try {
      const res = await postCommentService(
        auth.token,
        data.obj!.id,
        comment.text,
        comment.reply_id
      );
      const newComment = res.data.comment;
      const dataShollow = { ...data };
      dataShollow.obj!.comments_count++;
      if (comment.reply_id) {
        const cmIndex = dataShollow.obj!.comments.findIndex(
          (obj) => obj.id === comment.reply_id
        );
        dataShollow.obj!.comments[cmIndex].replies_count++;
        setCommentReplies((prevValues) => ({
          ...prevValues,
          [comment.reply_id!]: {
            isLoading: prevValues[comment.reply_id!]
              ? prevValues[comment.reply_id!].isLoading || false
              : false,
            show: prevValues[comment.reply_id!]
              ? prevValues[comment.reply_id!].show || false
              : false,
            data: prevValues[comment.reply_id!]
              ? prevValues[comment.reply_id!].data.concat([newComment])
              : [],
          },
        }));
      } else {
        dataShollow.obj!.comments.unshift(newComment);
      }
      setData(dataShollow);
      setComment({
        text: "",
        reply_id: null,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentAddLike = async (id: number, i: number) => {
    try {
      const res = await commentAddLikeService(auth.token, id);
      const newLike = res.data.like;
      const dataShallow = { ...data };
      dataShallow.obj!.comments[i].likes_count++;
      dataShallow.obj!.comments[i].likes.push(newLike);
      setData(dataShallow);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentDeleteLike = async (id: number, i: number) => {
    try {
      await commentDeleteLikeService(auth.token, id);
      const dataShallow = { ...data };
      dataShallow.obj!.comments[i].likes_count--;
      dataShallow.obj!.comments[i].likes = dataShallow.obj!.likes.filter(
        (like) => like.user.id !== auth.user!.id
      );
      setData(dataShallow);
    } catch (e) {
      console.log(e);
    }
  };

  const handleReplyAddLike = async (cmID: number, repID: number, i: number) => {
    try {
      const res = await commentAddLikeService(auth.token, repID);
      const newLike = res.data.like;
      const dataShallow = { ...commentReplies[cmID] };
      dataShallow.data[i].likes_count++;
      dataShallow.data[i].likes.push(newLike);
      setCommentReplies((prevValues) => ({
        ...prevValues,
        [id]: dataShallow,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleReplyDeleteLike = async (
    cmID: number,
    repID: number,
    i: number
  ) => {
    try {
      await commentDeleteLikeService(auth.token, repID);
      const dataShallow = { ...commentReplies[cmID] };
      dataShallow.data[i].likes_count--;
      dataShallow.data[i].likes = dataShallow.data[i].likes.filter(
        (like) => like.user.id !== auth.user!.id
      );
      setCommentReplies((prevValues) => ({
        ...prevValues,
        [cmID]: dataShallow,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleCommentHeartIcon = (cm: CommentsFieldIntf, cmi: number) => {
    const userLike = cm.likes.filter((like) => like.user.id === auth.user!.id);
    return userLike.length > 0 ? (
      <HeartIconSolid
        onClick={() => handleCommentDeleteLike(cm.id, cmi)}
        width={15}
        height={15}
        cursor="pointer"
        className="mt-1 ml-2 w-1/12 select-none text-red-600"
      />
    ) : (
      <HeartIconOutline
        onClick={() => handleCommentAddLike(cm.id, cmi)}
        width={15}
        height={15}
        cursor="pointer"
        className="mt-1 ml-2 w-1/12 select-none"
      />
    );
  };

  const handleReplyHeartIcon = (
    rep: ReplyCommentsFieldIntf,
    cmID: number,
    repi: number
  ) => {
    const userLike = rep.likes.filter((like) => like.user.id === auth.user!.id);
    return userLike.length > 0 ? (
      <HeartIconSolid
        onClick={() => handleReplyDeleteLike(cmID, rep.id, repi)}
        width={15}
        height={15}
        cursor="pointer"
        className="mt-1 ml-2 w-1/12 select-none text-red-600"
      />
    ) : (
      <HeartIconOutline
        onClick={() => handleReplyAddLike(cmID, rep.id, repi)}
        width={15}
        height={15}
        cursor="pointer"
        className="mt-1 ml-2 w-1/12 select-none"
      />
    );
  };

  const handleCommentLikeSection = (
    cm: CommentsFieldIntf | ReplyCommentsFieldIntf
  ) => {
    return (
      cm.likes_count > 0 && (
        <span className="font-bold mr-3 cursor-pointer">
          {cm.likes_count} {cm.likes_count > 1 ? "likes" : "like"}
        </span>
      )
    );
  };

  const handleCommentIconOnClick = () => {
    setComment({
      text: "",
      reply_id: null,
    });
    textAreaRef.current?.focus();
  };

  const handleReplyOnClick = (username: string, cmID: number) => {
    setComment({
      text: `@${username} `,
      reply_id: cmID,
    });
    textAreaRef.current?.focus();
  };

  const handleFetchCmReplies = useCallback(
    async (id: number) => {
      try {
        setCommentReplies((prevValues) => ({
          ...prevValues,
          [id]: {
            ...prevValues[id],
            isLoading: true,
            show: false,
          },
        }));
        const { data } = await fetchCommentRepliesService(auth.token, id);
        setCommentReplies((prevValues) => ({
          ...prevValues,
          [id]: {
            ...prevValues[id],
            data: data,
            show: true,
          },
        }));
        console.log(data);
      } catch (e: any) {
        return;
      } finally {
        setCommentReplies((prevValues) => ({
          ...prevValues,
          [id]: {
            ...prevValues[id],
            isLoading: false,
          },
        }));
      }
    },
    [auth.token]
  );

  const handleViewRepliesOnClick = (id: number, replies_count: number) => {
    const obj = commentReplies[id];
    if (obj && obj.isLoading) {
      return;
    } else {
      if (obj && obj.data.length === replies_count) {
        setCommentReplies((preValues) => ({
          ...preValues,
          [id]: {
            ...preValues[id],
            show: true,
          },
        }));
      } else {
        handleFetchCmReplies(id);
      }
    }
  };

  const handleHideRepliesOnClick = (id: number) => {
    setCommentReplies((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        show: false,
      },
    }));
  };

  return loading ? (
    <Spin textColor="text-blue-500" className="!m-auto" />
  ) : (
    <div>
      <div className="flex mx-14 border text-sm mb-10">
        <div className="w-7/12">
          <Swiper
            onDoubleClick={handlePostAddLike}
            loop={false}
            navigation={true}
            pagination={true}
            className="mySwiper w-full h-[595px]"
          >
            {data.obj?.files.map((file) => (
              <SwiperSlide key={file.id} className="w-full h-full">
                <img
                  className={`w-full h-full object-cover`}
                  src={`${endpoint}${file.file}`}
                  alt={data.obj?.user.username}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-5/12 bg-white rounded-md py-3">
          <div>
            <div className="flex items-center justify-between pb-3 px-4 border-b">
              <div className="flex items-center w-11/12">
                <Link
                  to={routes.userProfile(data.obj!.user.username)}
                  className="w-2/12"
                >
                  <img
                    className="w-9 h-9 rounded-full border"
                    src={`${endpoint}${data.obj?.user.profile.image}`}
                    alt={data.obj?.user.username}
                  />
                </Link>
                <Link
                  to={routes.userProfile(data.obj!.user.username)}
                  className="font-medium ml-1 hover:underline w-2/12"
                >
                  {data.obj?.user.username}
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
                      src={`${endpoint}${data.obj?.user.profile.image}`}
                      alt={data.obj?.user.username}
                    />
                  </div>
                  <div className="w-10/12">
                    <div className="mb-3">
                      <span className="font-medium mr-1">
                        <Link to="imortezaw_" className="hover:underline">
                          {data.obj?.user.username}
                        </Link>
                      </span>
                      <span>{getPostDescription(data.obj?.description!)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 font-medium text-xs">
                        {data.obj?.created_time}
                      </span>
                    </div>
                  </div>
                </div>
                {data.obj!.comments.length > 0 &&
                  data.obj!.comments.map((cm, cmi) => (
                    <div className="mb-3" key={cm.id}>
                      <div className="flex justify-between">
                        <div className="w-11/12">
                          <div className="flex">
                            <div className="mr-1.5 w-2/12">
                              <img
                                className="w-9 h-9 rounded-full border"
                                src={`${endpoint}${cm.user.profile.image}`}
                                alt={cm.user.username}
                              />
                            </div>
                            <div className="w-10/12">
                              <div className="mb-4">
                                <span className="font-medium mr-1">
                                  <Link
                                    to={routes.userProfile(cm.user.username)}
                                    className="hover:underline"
                                  >
                                    {cm.user.username}
                                  </Link>
                                </span>
                                <span>{getCommentText(cm.text)}</span>
                              </div>
                              <div className="flex text-xs text-gray-400 mb-4">
                                <Link
                                  className="font-medium mr-3"
                                  to="somewhere else"
                                >
                                  <span>{cm.commented_time}</span>
                                </Link>
                                {handleCommentLikeSection(cm)}
                                <span
                                  className="font-bold cursor-pointer select-none"
                                  onClick={() =>
                                    handleReplyOnClick(cm.user.username, cm.id)
                                  }
                                >
                                  Reply
                                </span>
                              </div>
                              {cm.replies_count > 0 ? (
                                commentReplies[cm.id] ? (
                                  commentReplies[cm.id].show ? (
                                    <div>
                                      <button
                                        className="text-xs text-gray-400 pl-10 font-bold relative active:text-gray-300 before:w-6 before:h-[1px] before:top-[55%] before:left-0 before:bg-gray-500 before:absolute before:active:bg-gray-400"
                                        onClick={() =>
                                          handleHideRepliesOnClick(cm.id)
                                        }
                                      >
                                        Hide replies
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <button
                                        className="text-xs text-gray-400 pl-10 font-bold relative active:text-gray-300 before:w-6 before:h-[1px] before:top-[55%] before:left-0 before:bg-gray-500 before:absolute before:active:bg-gray-400"
                                        onClick={() =>
                                          handleViewRepliesOnClick(
                                            cm.id,
                                            cm.replies_count
                                          )
                                        }
                                      >
                                        {`View replies (${cm.replies_count})`}
                                      </button>
                                      {commentReplies[cm.id].isLoading && (
                                        <Spin
                                          className="inline-block !ml-2"
                                          textColor="text-blue-500"
                                          w="w-4"
                                          h="h-4"
                                        />
                                      )}
                                    </div>
                                  )
                                ) : (
                                  <div>
                                    <button
                                      className="text-xs text-gray-400 pl-10 font-bold relative active:text-gray-300 before:w-6 before:h-[1px] before:top-[55%] before:left-0 before:bg-gray-500 before:absolute before:active:bg-gray-400"
                                      onClick={() =>
                                        handleViewRepliesOnClick(
                                          cm.id,
                                          cm.replies_count
                                        )
                                      }
                                    >
                                      {`View replies (${cm.replies_count})`}
                                    </button>
                                  </div>
                                )
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>
                        </div>
                        {handleCommentHeartIcon(cm, cmi)}
                      </div>
                      <div className="ml-12 mt-3">
                        {commentReplies[cm.id] && commentReplies[cm.id].show && (
                          <div>
                            {commentReplies[cm.id].data.length > 0 &&
                              commentReplies[cm.id].data.map((rep, repi) => (
                                <div
                                  key={rep.id}
                                  className="flex justify-between mb-2"
                                >
                                  <div className="w-11/12">
                                    <div className="flex">
                                      <div className="mr-1.5 w-2/12">
                                        <img
                                          className="w-9 h-9 rounded-full border"
                                          src={
                                            rep.user.profile.image.startsWith(
                                              "http://"
                                            )
                                              ? rep.user.profile.image
                                              : `${endpoint}${rep.user.profile.image}`
                                          }
                                          alt={rep.user.username}
                                        />
                                      </div>
                                      <div className="w-10/12">
                                        <div className="mb-4">
                                          <span className="font-medium mr-1">
                                            <Link
                                              to={routes.userProfile(
                                                rep.user.username
                                              )}
                                              className="hover:underline"
                                            >
                                              {rep.user.username}
                                            </Link>
                                          </span>
                                          <span>
                                            {getCommentText(rep.text)}
                                          </span>
                                        </div>
                                        <div className="flex text-xs text-gray-400 mb-4">
                                          <Link
                                            className="font-medium mr-3"
                                            to="somewhere else"
                                          >
                                            <span>{rep.commented_time}</span>
                                          </Link>
                                          {handleCommentLikeSection(rep)}
                                          <span
                                            className="font-bold cursor-pointer select-none"
                                            onClick={() =>
                                              handleReplyOnClick(
                                                rep.user.username,
                                                cm.id
                                              )
                                            }
                                          >
                                            Reply
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {handleReplyHeartIcon(rep, cm.id, repi)}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            <div className="mb-4 px-4 text-gray-700">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  {handleHeartIcon()}
                  <ChatIcon
                    onClick={handleCommentIconOnClick}
                    className="mr-4 hover:text-gray-500 select-none"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                  <PaperAirplaneIcon
                    className="transform rotate-45 hover:text-gray-500 select-none"
                    width={30}
                    height={30}
                    cursor="pointer"
                  />
                </div>
                <div>{handlePostSavedSection()}</div>
              </div>
              <div className="mb-0.5">{handleLikeSection()}</div>
              <div>
                <Link
                  to={routes.postDetail(1)}
                  className="text-gray-400 focus:text-opacity-70 uppercase"
                >
                  <small>2 weeks</small>
                </Link>
              </div>
            </div>
            <hr />
            <div className="px-4 flex items-center justify-between mt-3 text-gray-700">
              <div className="flex items-center w-11/12 pr-2">
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
                  ref={textAreaRef}
                  maxRows={4}
                  placeholder="Add a comment"
                  className="w-full outline-none resize-none"
                  style={{ height: 20 }}
                  value={comment.text}
                  onChange={handleCommentText}
                />
              </div>
              <div>
                {comment.text.length > 0 ? (
                  <button
                    className="text-blue-500 focus:text-blue-400 font-medium"
                    onClick={handlePostComment}
                  >
                    Post
                  </button>
                ) : (
                  <button
                    className="text-blue-200 focus:text-blue-400 font-medium"
                    disabled
                  >
                    Post
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {data!.more_posts.length > 0 && (
        <>
          <hr />
          <div className="mt-10">
            <div className="mb-4">
              <h2 className="font-medium text-gray-400 text-sm">
                More posts from{" "}
                <Link
                  className="text-gray-700"
                  to={routes.userProfile(data!.obj?.user.username!)}
                >
                  {data!.obj?.user.username}
                </Link>
              </h2>
            </div>
            <PostWrapper>
              {data!.more_posts.map((post) => (
                <MorePost
                  key={post.id}
                  multiFile={post.files.length > 1}
                  image={
                    post.files[0] ? `${endpoint}${post.files[0].file}` : null
                  }
                  likes_count={post.likes_count}
                  comments_count={post.comments_count}
                  link={routes.postDetail(post.id)}
                />
              ))}
            </PostWrapper>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
