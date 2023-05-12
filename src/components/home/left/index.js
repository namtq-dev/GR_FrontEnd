import LeftLink from './leftLink';
import './style.css';
import { left } from '../../../data/home';
import { Link } from 'react-router-dom';

export default function LeftHome({ user }) {
  return (
    <div className="left_home">
      <Link to="/profile" className="left_link hover1">
        <img src={user?.picture} alt="" />
        <span>
          {user?.firstName} {user?.lastName}
        </span>
      </Link>
      {left.slice(0, 8).map((link, i) => (
        <LeftLink
          key={i}
          img={link.img}
          text={link.text}
          notification={link.notification}
        />
      ))}
    </div>
  );
}
