import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/store";
import { loadUser } from "./redux/slice/auth";
import ScrollToTop from "./components/features/ScrollToTop";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import UserProtect from "./components/UserProtect";
import Layout from "./components/Layout";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";
import Posts from "./components/profile/Posts";
import Saved from "./components/profile/Saved";
import Videos from "./components/profile/Videos";
import Tagged from "./components/profile/Tagged";
import Explore from "./components/explore/Explore";
import Inbox from "./components/direct/Inbox";
import Post from "./components/post/Post";
import NotFound from "./components/NotFound";
import routes from "./routes";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <ScrollToTop>
      <Routes>
        <Route path={routes.register} element={<Register />} />
        <Route path={routes.login} element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout>
                <Home />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.userProfileStr}
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        >
          <Route path="" element={<Posts />} />
          <Route
            path="saved"
            element={
              <UserProtect>
                <Saved />
              </UserProtect>
            }
          />
          <Route path="channel" element={<Videos />} />
          <Route path="tagged" element={<Tagged />} />
        </Route>
        <Route
          path={routes.explore}
          element={
            <PrivateRoute>
              <Layout>
                <Explore />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.directInbox}
          element={
            <PrivateRoute>
              <Layout>
                <Inbox />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path={routes.postDetailStr}
          element={
            <PrivateRoute>
              <Layout>
                <Post />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Layout>
                <NotFound />
              </Layout>
            </PrivateRoute>
          }
        />
      </Routes>
    </ScrollToTop>
  );
};

export default App;
