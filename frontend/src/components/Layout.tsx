import React from "react";
import Navbar from "./Navbar";
import AddPost from "./AddPost";
import { useAppSelector } from "../redux/store";

const Layout: React.FC = ({ children }) => {
  const addPostState = useAppSelector((state) => state.addPost);

  return (
    <div className="h-screen">
      <Navbar />
      {addPostState.showAddPostModal && <AddPost />}
      <div className="mt-20 max-w-screen-extmedium mx-auto pb-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
