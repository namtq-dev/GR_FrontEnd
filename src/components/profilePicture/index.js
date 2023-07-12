import { useRef, useState } from 'react';
import './style.css';
import UpdateProfilePicture from './updateProfilePicture';

export default function ProfilePicture({ setShowUpdate, avatarRef, photos }) {
  const refInput = useRef(null);
  const [image, setImage] = useState('');
  const [error, setError] = useState('');

  const handleImage = (eve) => {
    let img = eve.target.files[0]; // only 1 image per update
    if (
      img.type !== 'image/jpeg' &&
      img.type !== 'image/png' &&
      img.type !== 'image/webp' &&
      img.type !== 'image/gif'
    ) {
      setError(`${img.name} format is unsupported.`);
      return;
    } else if (img.size > 1024 * 1024 * 5) {
      setError(`${img.name} file size is too large.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  return (
    <div className="blur">
      <input
        type="file"
        ref={refInput}
        hidden
        onChange={handleImage}
        accept="image/jpeg,image/png,image/webp,image/gif"
      />
      <div className="post_box picture_box">
        <div className="box_header">
          <div className="small_circle" onClick={() => setShowUpdate(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Update profile picture</span>
        </div>
        <div className="update_picture_wrap">
          <div className="update_picture_buttons">
            <button
              className="light_blue_btn"
              onClick={() => refInput.current.click()}
            >
              <i className="plus_icon filter_blue"></i>
              Upload photo
            </button>
            <button className="gray_btn">
              <i className="frame_icon"></i>
              Add frame
            </button>
          </div>
        </div>
        {error && (
          <div className="post_error comment_error">
            <div className="post_error_text">{error}</div>
            <button className="blue_btn" onClick={() => setError('')}>
              Try again
            </button>
          </div>
        )}
        <div className="old_pictures_wrap"></div>
      </div>
      {image && (
        <UpdateProfilePicture
          image={image}
          setImage={setImage}
          setError={setError}
          setShowUpdate={setShowUpdate}
          avatarRef={avatarRef}
        />
      )}
    </div>
  );
}
