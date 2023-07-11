import { useRef } from 'react';
import './style.css';

export default function ProfilePicture() {
  const refInput = useRef(null);

  const handleImage = () => {};

  return (
    <div className="blur">
      <input type="file" ref={refInput} hidden onChange={handleImage} />
      <div className="post_box picture_box">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button className="light_blue_btn">
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        <div className="old_pictures_wrap"></div>
      </div>
    </div>
  );
}
