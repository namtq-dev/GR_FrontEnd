import { Link } from 'react-router-dom';

export default function UserMenu({ user }) {
  return (
    <div className="mmenu">
      <Link to="/profile" className="mmenu_header hover3">
        <img src={user?.picture} alt="" />
        <div className="mmenu_col">
          <span>
            {user?.firstName}
            {user?.lastName}
          </span>
          <span>See your profile</span>
        </div>
      </Link>
      <div className="mmenu_splitter"></div>
      <div className="mmenu_main hover3">
        <div className="small_circle">
          <i className="report_filled_icon"></i>
        </div>
        <div className="mmenu_col">
          <div className="mmenu_span1">Give feedback</div>
          <div className="mmenu_span2">Help us improve Aimer</div>
        </div>
      </div>
      <div className="mmenu_splitter"></div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="settings_filled_icon"></i>
        </div>
        <span>Settings & Privacy</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="help_filled_icon"></i>
        </div>
        <span>Help & Support</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="dark_filled_icon"></i>
        </div>
        <span>Display & Accessibility</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle">
          <i className="logout_filled_icon"></i>
        </div>
        <span>Logout</span>
      </div>
    </div>
  );
}
