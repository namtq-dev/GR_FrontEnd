export default function AddFriendSmallCard({ item }) {
  return (
    <div className="add_friend_card">
      <div className="add_friend_img_small">
        <img src={item.profile_picture} alt="" />
        <div className="add_friend_infos">
          <div className="add_friend_name">
            {item.profile_name.length > 11
              ? `${item.profile_name.substring(0, 11)}...`
              : item.profile_name}
          </div>
          <div className="light_blue_btn">
            <img
              src="../../../icons/addFriend.png"
              alt=""
              className="filter_blue"
            />
            Add Friend
          </div>
        </div>
      </div>
    </div>
  );
}
