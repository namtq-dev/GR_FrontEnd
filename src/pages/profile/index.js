import { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { profileReducer } from '../../reducers/profileReducer';
import axios from 'axios';
import Header from '../../components/header';
import './style.css';
import Cover from './cover';
import ProfilePictureInfos from './profilePictureInfos';
import ProfileMenu from './profileMenu';
import PeopleYouMayKnow from './peopleYouMayKnow';
import CreatePost from '../../components/createPost';
import GridPost from './gridPost';
import Post from '../../components/post';
import Photos from './photos';
import Friends from './friends';
import Intro from '../../components/intro';
import CreatePostPopup from '../../components/createPostPopup';

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user } = useSelector((state) => ({ ...state }));

  const [photos, setPhotos] = useState({});
  const [otherName, setOtherName] = useState();
  const [createPostVisible, setCreatePostVisible] = useState(false);

  let usernameToFind = username === undefined ? user.username : username;
  const path = `${usernameToFind}/*`;
  const max = 30;
  const sort = 'desc';

  const [{ loading, profile, error }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: '',
  });

  useEffect(() => {
    getProfile();
  }, [usernameToFind]); // get new profile everytime username changes
  useEffect(() => {
    setOtherName(profile?.details?.otherName);
  }, [profile]);

  const isVisitor = usernameToFind !== user.username;

  const getProfile = async () => {
    try {
      dispatch({
        type: 'PROFILE_REQUEST',
      });

      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${usernameToFind}`,
        { headers: { Authorization: `Bearer ${user.loginToken}` } }
      );
      if (data.message === 'User not found.') {
        navigate('/profile');
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/getImages`,
            { path, max, sort },
            { headers: { Authorization: `Bearer ${user.loginToken}` } }
          );

          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: 'PROFILE_SUCCESS',
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'PROFILE_ERROR',
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="profile">
      {createPostVisible && (
        <CreatePostPopup
          user={user}
          setCreatePostVisible={setCreatePostVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}
      <Header page="profile" />
      <div className="profile_top">
        <div className="profile_container">
          <Cover
            cover={profile?.cover}
            isVisitor={isVisitor}
            photos={photos.resources}
          />
          <ProfilePictureInfos
            profile={profile}
            isVisitor={isVisitor}
            photos={photos.resources}
            otherName={otherName}
          />
          <ProfileMenu />
        </div>
      </div>
      <div className="profile_bottom">
        <div className="profile_container">
          <div className="bottom_container">
            <PeopleYouMayKnow />
            <div className="profile_grid">
              <div className="profile_left">
                <Intro
                  oldDetails={profile.details}
                  isVisitor={isVisitor}
                  setOtherName={setOtherName}
                />
                <Photos photos={photos} />
                <Friends friends={profile.friends} />
                <div className="relative_fb_copyright">
                  <Link to="/">Privacy </Link>
                  <span>. </span>
                  <Link to="/">Terms </Link>
                  <span>. </span>
                  <Link to="/">Advertising </Link>
                  <span>. </span>
                  <Link to="/">
                    Ad Choices <i className="ad_choices_icon"></i>{' '}
                  </Link>
                  <span>. </span>
                  <Link to="/">Cookies </Link>
                  <span>. </span>
                  <Link to="/">More </Link>
                  <span>. </span> <br />
                  Aimer © 2023
                </div>
              </div>
              <div className="profile_right">
                {!isVisitor && (
                  <CreatePost
                    user={user}
                    setCreatePostVisible={setCreatePostVisible}
                    isMyProfile
                  />
                )}
                <GridPost />
                <div className="posts">
                  {profile.posts && profile.posts.length ? (
                    profile.posts?.map((post) => (
                      <Post post={post} user={user} key={post._id} profile />
                    ))
                  ) : (
                    <div className="no_posts">No post available</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
