import { Dots } from '../../svg';
import { stories } from '../../data/home';
import AddFriendSmallCard from './addFriendSmallCard';

export default function PeopleYouMayKnow() {
  return (
    <div className="people_u_may_know">
      <div className="people_u_may_know_header">
        People You May Know
        <div className="post_header_right people_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="people_u_may_know_list">
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
}
