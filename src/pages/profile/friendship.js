import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import useClickOutside from '../../helpers/clickOutside';
import {
  acceptFriend,
  addFriend,
  cancelFriendRequest,
  deleteFriendRequest,
  follow,
  unfollow,
  unfriend,
} from '../../helpers/user';

export default function Friendship({ oldFriendship, profileId }) {
  const { user } = useSelector((state) => ({ ...state }));

  const [friendsMenu, setFriendsMenu] = useState(false);
  const [responseMenu, setResponseMenu] = useState(false);
  const [friendship, setFriendship] = useState(oldFriendship);

  const friendsMenuRef = useRef(null);
  const responseMenuRef = useRef(null);

  useClickOutside(friendsMenuRef, () => setFriendsMenu(false));
  useClickOutside(responseMenuRef, () => setResponseMenu(false));

  useEffect(() => {
    setFriendship(oldFriendship);
  }, [oldFriendship]);

  const addFriendHandler = async () => {
    setFriendship({ ...friendship, requestSent: true, following: true });
    await addFriend(profileId, user.loginToken);
  };

  const cancelFriendRequestHandler = async () => {
    setFriendship({ ...friendship, requestSent: false, following: false });
    await cancelFriendRequest(profileId, user.loginToken);
  };

  const followHandler = async () => {
    setFriendship({ ...friendship, following: true });
    await follow(profileId, user.loginToken);
  };

  const unfollowHandler = async () => {
    setFriendship({ ...friendship, following: false });
    await unfollow(profileId, user.loginToken);
  };

  const acceptFriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: true,
      following: true,
      requestSent: false,
      requestReceived: false,
    });
    await acceptFriend(profileId, user.loginToken);
  };

  const unfriendHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await unfriend(profileId, user.loginToken);
  };

  const deleteFriendRequestHandler = async () => {
    setFriendship({
      ...friendship,
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    });
    await deleteFriendRequest(profileId, user.loginToken);
  };

  return (
    <div className="friendship">
      {friendship?.friends ? (
        <div className="friends_menu_wrap">
          <button className="gray_btn" onClick={() => setFriendsMenu(true)}>
            <img src="../../../icons/friends.png" alt="" />
            <span>Friends</span>
          </button>
          {friendsMenu && (
            <div className="open_cover_menu" ref={friendsMenuRef}>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/favoritesOutline.png" alt="" />
                Favorites
              </div>
              <div className="open_cover_menu_item hover1">
                <img src="../../../icons/editFriends.png" alt="" />
                Edit friend list
              </div>
              {friendship?.following ? (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={unfollowHandler}
                >
                  <img src="../../../icons/unfollowOutlined.png" alt="" />
                  Unfollow
                </div>
              ) : (
                <div
                  className="open_cover_menu_item hover1"
                  onClick={followHandler}
                >
                  <img src="../../../icons/follow.png" alt="" />
                  Follow
                </div>
              )}
              <div
                className="open_cover_menu_item hover1"
                onClick={unfriendHandler}
              >
                <i className="unfriend_outlined_icon"></i>
                Unfriend
              </div>
            </div>
          )}
        </div>
      ) : (
        !friendship?.requestSent &&
        !friendship?.requestReceived && (
          <button className="blue_btn" onClick={addFriendHandler}>
            <img src="../../../icons/addFriend.png" alt="" className="invert" />
            <span>Add friend</span>
          </button>
        )
      )}
      {friendship?.requestSent ? (
        <button className="blue_btn" onClick={cancelFriendRequestHandler}>
          <img
            src="../../../icons/cancelRequest.png"
            alt=""
            className="invert"
          />
          <span>Cancel request</span>
        </button>
      ) : (
        friendship?.requestReceived && (
          <div className="friends_menu_wrap">
            <button className="gray_btn" onClick={() => setResponseMenu(true)}>
              <img src="../../../icons/friends.png" alt="" />
              <span>Respond</span>
            </button>
            {responseMenu && (
              <div className="open_cover_menu" ref={responseMenuRef}>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={acceptFriendHandler}
                >
                  Accept
                </div>
                <div
                  className="open_cover_menu_item hover1"
                  onClick={deleteFriendRequestHandler}
                >
                  Decline
                </div>
              </div>
            )}
          </div>
        )
      )}
      {friendship?.following ? (
        <button className="gray_btn" onClick={unfollowHandler}>
          <img src="../../../icons/follow.png" alt="" />
          <span>Following</span>
        </button>
      ) : (
        <button className="blue_btn" onClick={followHandler}>
          <img src="../../../icons/follow.png" alt="" className="invert" />
          <span>Follow</span>
        </button>
      )}
      <button className={friendship?.friends ? 'blue_btn' : 'gray_btn'}>
        <img
          src="../../../icons/message.png"
          alt=""
          className={friendship?.friends ? 'invert' : ''}
        />
        <span>Message</span>
      </button>
    </div>
  );
}
