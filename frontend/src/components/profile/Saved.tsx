import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import Post from "../features/Post";
import { fetchUserProfileSavedPostsService } from "../../services/post";
import { BaseSavedFieldIntf } from "../../interfaces/home/posts";
import Spin from "../features/animation/Spin";
import routes from "../../routes";
import { useUsername } from "./Profile";

const Posts = () => {
  const { username } = useUsername();

  const auth = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState<boolean>();
  const [savedPosts, setSavedPosts] = useState<BaseSavedFieldIntf[]>();

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        const res = await fetchUserProfileSavedPostsService(
          auth.token,
          username
        );
        const data = res.data as BaseSavedFieldIntf[];
        setSavedPosts(data);
      } catch (e: any) {
        console.log(e.response);
      } finally {
        setLoading(false);
      }
    };
    fetchSavedPosts();
  }, [auth.token, username]);

  return (
    <>
      {loading ? (
        <Spin textColor="text-blue-500" className="!m-auto" />
      ) : (
        <div className="grid grid-cols-3 gap-7">
          {savedPosts?.map((savedPost) => (
            <Post
              key={savedPost.post.id}
              multiFile={savedPost.post.files.length > 1}
              image={
                savedPost.post.files[0] ? savedPost.post.files[0].file : ""
              }
              likes_count={savedPost.post.likes_count}
              comments_count={savedPost.post.comments_count}
              link={routes.postDetail(savedPost.post.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
