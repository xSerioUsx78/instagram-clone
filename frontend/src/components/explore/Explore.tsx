import React, { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import Post from "../features/Post";
import { fetchExcplorePostsService } from "../../services/post";
import { MinimalPostFieldIntf } from "../../interfaces/home/posts";
import PostWrapper from "../features/PostWrapper";
import routes from "../../routes";

const Explore: React.FC = () => {
  const auth = useAppSelector((state) => state.auth);

  const [posts, setPosts] = useState<MinimalPostFieldIntf[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetchExcplorePostsService(auth.token);
      const data = res.data as MinimalPostFieldIntf[];
      setPosts(data);
    };
    fetchPosts();
  }, [auth.token]);

  return (
    <div>
      <PostWrapper>
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <Post
              key={post.id}
              specialPart={i === 0}
              multiFile={post.files.length > 1}
              image={post.files[0] ? post.files[0].file : null}
              comments_count={post.comments_count}
              likes_count={post.likes_count}
              link={routes.postDetail(post.id)}
            />
          ))
        ) : (
          <div className="text-center">There is not post to share yet!</div>
        )}
      </PostWrapper>
    </div>
  );
};

export default Explore;
