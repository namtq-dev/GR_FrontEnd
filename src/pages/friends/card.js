import { Link } from 'react-router-dom';

export default function Card({ user, type }) {
  return (
    <div className="req_card">
      <Link to={`/profile/${user.username}`}>
        <img src={user.picture} alt="" />
      </Link>
      <div className="req_name">
        {user.firstName} {user.lastName}
      </div>
      {type === 'sent' ? (
        <button className="blue_btn">Cancel request</button>
      ) : type === 'request' ? (
        <>
          <button className="blue_btn">Accept</button>
          <button className="gray_btn">Decline</button>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
