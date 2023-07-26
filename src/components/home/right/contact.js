export default function Contact({ user }) {
  return (
    <>
      <div className="contact hover3">
        <div className="contact_img">
          <img src={user?.picture} alt="" />
        </div>
        <span>
          {user.firstName} {user.lastName}
        </span>
      </div>
      {user?.friends?.map((friend, i) => (
        <div className="contact hover3" key={i}>
          <div className="contact_img">
            <img src={friend?.picture} alt="" />
          </div>
          <span>
            {friend.firstName} {friend.lastName}
          </span>
        </div>
      ))}
    </>
  );
}
