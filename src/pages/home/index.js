import Header from '../../components/header';
import LeftHome from '../../components/home/left';
import { useSelector } from 'react-redux';
import RightHome from '../../components/home/right';
import Stories from '../../components/home/stories';
import CreatePost from '../../components/createPost';
import SendVerification from '../../components/home/sendVerification';
import Post from '../../components/post';
import { useEffect } from 'react';
import './style.css';

export default function Home({ setCreatePostVisible, posts, getAllPosts }) {
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="home">
      <Header page="home" getAllPosts={getAllPosts} />
      <LeftHome user={user} />
      <div className="home_middle">
        <Stories />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} setCreatePostVisible={setCreatePostVisible} />
        <div className="posts">
          {posts.map((post) => (
            <Post post={post} key={post._id} user={user} />
          ))}
        </div>
      </div>
      <RightHome user={user} />
    </div>
  );
}
