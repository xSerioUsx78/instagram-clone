import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import StoryBar from "./StoryBar";
import Post from "./Post";
import { useAppSelector } from "../../redux/store";
import { StoryIntf } from "../../interfaces/home/story";
import { PostIntf } from "../../interfaces/home/posts";
import { fetchStorysService } from "../../services/story";
import { fetchPostsService } from "../../services/post";

const Home = () => {
  const auth = useAppSelector((state) => state.auth);

  const [storys, setStorys] = useState<StoryIntf>({
    loading: true,
    data: [],
  });
  const [posts, setPosts] = useState<PostIntf>({
    loading: true,
    data: [],
  });

  const fetchStorys = useCallback(async () => {
    try {
      const res = await fetchStorysService(auth.token);
      setStorys((prevValues) => ({
        ...prevValues,
        data: res!.data,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setStorys((prevValues) => ({
        ...prevValues,
        loading: false,
      }));
    }
  }, [auth.token]);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetchPostsService(auth.token);
      setPosts((prevValues) => ({
        ...prevValues,
        data: res!.data,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      setPosts((prevValues) => ({
        ...prevValues,
        loading: false,
      }));
    }
  }, [auth.token]);

  useEffect(() => {
    fetchStorys();
    fetchPosts();
  }, [fetchStorys, fetchPosts]);

  return (
    <div className="flex flex-nowrap flex-row">
      <div className="w-full md:w-2/3 h-full mr-3">
        <StoryBar storys={storys} />
        <Post posts={posts} setPosts={setPosts} />
      </div>
      <div className="w-full md:w-1/3 h-full">
        <Sidebar />
      </div>
    </div>
  );
};

export default Home;
