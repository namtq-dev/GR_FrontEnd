import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Profile from './pages/profile';
import LoggedInRoutes from './routes/loggedInRoutes';
import NotLoggedInRoutes from './routes/notLoggedInRoutes';
import Activate from './pages/home/activate';
import Reset from './pages/reset';
import CreatePostPopup from './components/createPostPopup';
import { useSelector } from 'react-redux';
import { useReducer, useState } from 'react';
import { postReducer } from './reducers/postReducer';
import axios from 'axios';

function App() {
  const [createPostVisible, setCreatePostVisible] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [{ loading, posts, error }, dispatch] = useReducer(postReducer, {
    loading: false,
    posts: [],
    error: '',
  });

  const getAllPosts = async () => {
    try {
      dispatch({
        type: 'POSTS_REQUEST',
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,
        { headers: { Authorization: `Bearer ${user.loginToken}` } }
      );

      dispatch({
        type: 'POSTS_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'POSTS_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div>
      {createPostVisible && (
        <CreatePostPopup
          user={user}
          setCreatePostVisible={setCreatePostVisible}
        />
      )}
      <Routes>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} exact />
          <Route
            path="/"
            element={
              <Home
                setCreatePostVisible={setCreatePostVisible}
                posts={posts}
                getAllPosts={getAllPosts}
              />
            }
            exact
          />
          <Route path="/activate/:token" element={<Activate />} exact />
        </Route>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="/reset" element={<Reset />} />
      </Routes>
    </div>
  );
}

export default App;
