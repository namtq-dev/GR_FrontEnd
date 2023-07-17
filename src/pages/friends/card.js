import { Link } from 'react-router-dom';
import {
  acceptFriend,
  cancelFriendRequest,
  deleteFriendRequest,
} from '../../helpers/user';
import { useSelector } from 'react-redux';

export default function Card({ cardUser, type, getPageData }) {
  const { user } = useSelector((state) => ({ ...state }));

  const cancelRequestHandler = async (userId) => {
    const response = await cancelFriendRequest(userId, user.loginToken);
    if (response === 'OK') {
      getPageData();
    }
  };

  const acceptRequestHandler = async (userId) => {
    const response = await acceptFriend(userId, user.loginToken);
    if (response === 'OK') {
      getPageData();
    }
  };

  const declineRequestHandler = async (userId) => {
    const response = await deleteFriendRequest(userId, user.loginToken);
    if (response === 'OK') {
      getPageData();
    }
  };

  return (
    <div className="req_card">
      <Link to={`/profile/${cardUser.username}`}>
        <img src={cardUser.picture} alt="" />
      </Link>
      <div className="req_name">
        {cardUser.firstName} {cardUser.lastName}
      </div>
      {type === 'sent' ? (
        <button
          className="blue_btn"
          onClick={() => {
            cancelRequestHandler(cardUser._id);
          }}
        >
          Cancel request
        </button>
      ) : type === 'request' ? (
        <>
          <button
            className="blue_btn"
            onClick={() => {
              acceptRequestHandler(cardUser._id);
            }}
          >
            Accept
          </button>
          <button
            className="gray_btn"
            onClick={() => {
              declineRequestHandler(cardUser._id);
            }}
          >
            Decline
          </button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
