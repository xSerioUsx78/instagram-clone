import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import Post from "../features/Post";
import { fetchUserProfilePostsService } from "../../services/post";
import { MinimalPostFieldIntf } from "../../interfaces/home/posts";
import Spin from "../features/animation/Spin";
import routes from "../../routes";
import { useUsername } from "./Profile";

const Posts: React.FC = () => {
  const { username } = useUsername();

  const auth = useAppSelector((state) => state.auth);

  const [loading, setLoading] = useState<boolean>();
  const [posts, setPosts] = useState<MinimalPostFieldIntf[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetchUserProfilePostsService(auth.token, username);
        const data = res.data as MinimalPostFieldIntf[];
        setPosts(data);
      } catch (e: any) {
        console.log(e.response);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [auth.token, username]);

  return (
    <>
      {loading ? (
        <Spin textColor="text-blue-500" className="!m-auto" />
      ) : (
        <div className="grid grid-cols-3 gap-7">
          {posts?.map((post) => (
            <Post
              key={post.id}
              multiFile={post.files.length > 1}
              image={post.files[0] ? post.files[0].file : ""}
              likes_count={post.likes_count}
              comments_count={post.comments_count}
              link={routes.postDetail(post.id)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Posts;
