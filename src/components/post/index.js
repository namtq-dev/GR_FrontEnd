import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Dots, Public } from '../../svg';
import ReactsPopup from './reactsPopup';
import { useEffect, useState } from 'react';
import CreateComments from './createComments';
import './style.css';
import PostMenu from './postMenu';
import { getAllReacts } from '../../helpers/post';
import { reactPost } from '../../helpers/post';

export default function Post({ post, user, profile }) {
  const [visible, setVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [reacts, setReacts] = useState();
  const [myReact, setMyReact] = useState();
  const [totalReacts, setTotalReacts] = useState(0);

  useEffect(() => {
    getAllPostReacts();
  }, [post]);

  const reactHandler = async (react) => {
    reactPost(post._id, react, user.loginToken);
    if (myReact === react) {
      setMyReact();

      let type = reacts.findIndex((reactType) => reactType.react === myReact);
      if (type !== -1) {
        setReacts([...reacts, reacts[type].count--]);
        setTotalReacts((prev) => --prev);
      }
    } else {
      let type1 = reacts.findIndex((reactType) => reactType.react === react);
      if (type1 !== -1) {
        setReacts([...reacts, reacts[type1].count++]);
        setTotalReacts((prev) => ++prev);
      }

      let type2 = reacts.findIndex((reactType) => reactType.react === myReact);
      if (type2 !== -1) {
        setReacts([...reacts, reacts[type2].count--]);
        setTotalReacts((prev) => --prev);
      }

      setMyReact(react);
    }
  };

  const getAllPostReacts = async () => {
    const response = await getAllReacts(post._id, user.loginToken);
    setReacts(response.reacts);
    setMyReact(response.myReact);
    setTotalReacts(response.total);
  };

  return (
    <div className="post" style={{ width: `${profile && '100%'}` }}>
      <div className="post_header">
        <Link
          className="post_header_left"
          to={`/profile/${post.user.username}`}
        >
          <img src={post.user.picture} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.firstName} {post.user.lastName}
              <div className="updated_p">
                {post.type === 'profilePicture' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } profile picture`}
                {post.type === 'cover' &&
                  `updated ${
                    post.user.gender === 'male' ? 'his' : 'her'
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={60}>
                {post.createdAt}
              </Moment>
              . <Public color="#828387" />
            </div>
          </div>
        </Link>
        <div
          className="post_header_right hover1"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <Dots color="#828387" />
        </div>
      </div>
      {post.background ? (
        <div
          className="post_bg"
          style={{ backgroundImage: `url(${post.background})` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : post.type === null ? (
        <>
          <div className="post_text">{post.text}</div>
          {post.images && post.images.length && (
            <div
              className={
                post.images.length === 1
                  ? 'grid_1'
                  : post.images.length === 2
                  ? 'grid_2'
                  : post.images.length === 3
                  ? 'grid_3'
                  : post.images.length === 4
                  ? 'grid_4'
                  : post.images.length > 4 && 'grid_5'
              }
            >
              {post.images.slice(0, 5).map((img, i) => (
                <img src={img.url} key={i} alt="" className={`img-${i}`} />
              ))}
              {post.images.length > 5 && (
                <div className="more-pics-shadow">
                  +{post.images.length - 5}
                </div>
              )}
            </div>
          )}
        </>
      ) : post.type === 'profilePicture' ? (
        <div className="post_profile_wrap">
          <div className="post_updated_bg">
            <img src={post.user.cover} alt="" />
          </div>
          <img
            src={post.images[0].url}
            alt=""
            className="post_updated_picture"
          />
        </div>
      ) : (
        <div className="post_cover_wrap">
          <img src={post.images[0].url} alt="" />
        </div>
      )}
      <div className="post_infos">
        <div className="reacts_count">
          <div className="reacts_count_imgs">
            {reacts &&
              reacts
                .sort((react1, react2) => {
                  return react2.count - react1.count;
                })
                .slice(0, 3)
                .map(
                  (react, i) =>
                    react.count > 0 && (
                      <img
                        src={`../../../reacts/${react.react}.svg`}
                        key={i}
                        alt=""
                      />
                    )
                )}
          </div>
          <div className="reacts_count_num">
            {totalReacts > 0 && totalReacts}
          </div>
        </div>
        <div className="to_right">
          <div className="comments_count">13 comments</div>
          <div className="share_count">1 share</div>
        </div>
      </div>
      <div className="post_actions">
        <ReactsPopup
          visible={visible}
          setVisible={setVisible}
          reactHandler={reactHandler}
        />
        <div
          className="post_action hover1"
          onMouseOver={() => {
            setTimeout(() => {
              setVisible(true);
            }, 500);
          }}
          onMouseLeave={() => {
            setTimeout(() => {
              setVisible(false);
            }, 500);
          }}
          onClick={() => reactHandler(myReact ? myReact : 'like')}
        >
          {myReact ? (
            <img
              src={`../../../reacts/${myReact}.svg`}
              alt=""
              className="small_react"
              style={{ width: '18px' }}
            />
          ) : (
            <i className="like_icon"></i>
          )}
          <span
            style={{
              color: `${
                myReact === 'like'
                  ? '#4267b2'
                  : myReact === 'love'
                  ? '#f63459'
                  : myReact === 'haha'
                  ? '#f7b125'
                  : myReact === 'sad'
                  ? '#f7b125'
                  : myReact === 'wow'
                  ? '#f7b125'
                  : myReact === 'angry'
                  ? '#e4605a'
                  : ''
              }`,
            }}
          >
            {myReact ? myReact : 'Like'}
          </span>
        </div>
        <div className="post_action hover1">
          <i className="comment_icon"></i>
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="share_icon"></i>
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <div className="comments_order"></div>
        <CreateComments user={user} />
      </div>
      {showMenu && (
        <PostMenu
          userId={user.id}
          postUserId={post.user._id}
          imagesLength={post?.images?.length}
          setShowMenu={setShowMenu}
        />
      )}
    </div>
  );
}
