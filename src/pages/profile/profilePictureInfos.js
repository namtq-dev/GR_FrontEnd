import { useRef, useState } from 'react';
import ProfilePicture from '../../components/profilePicture';
import Friendship from './friendship';
import { Link } from 'react-router-dom';

export default function ProfilePictureInfos({
  profile,
  isVisitor,
  photos,
  otherName,
}) {
  const [showUpdate, setShowUpdate] = useState(false);

  const avatarRef = useRef(null);

  return (
    <div className="profile_img_wrap">
      {showUpdate && (
        <ProfilePicture
          setShowUpdate={setShowUpdate}
          avatarRef={avatarRef}
          photos={photos}
        />
      )}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={avatarRef}
            style={{
              backgroundSize: 'cover',
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>
          {!isVisitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShowUpdate(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile.firstName} {profile.lastName}
            <div className="othername">{!!otherName && `(${otherName})`}</div>
          </div>
          <div className="profile_friend_count">
            <div className="profile_card_count">
              {profile?.friends?.length === 0
                ? ''
                : profile?.friends?.length === 1
                ? '1 friend'
                : `${profile?.friends?.length} friends`}
            </div>
          </div>
          <div className="profile_friend_imgs">
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=""
                    style={{
                      transform: `translateX(${-i * 8}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {isVisitor ? (
        <Friendship
          oldFriendship={profile?.friendship}
          profileId={profile._id}
        />
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
}
