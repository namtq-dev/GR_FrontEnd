import { useRef, useState } from 'react';
import useClickOutside from '../../helpers/clickOutside';

export default function Cover({ cover, isVisitor }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState('');
  const [error, setError] = useState('');

  const menuRef = useRef(null);
  const inputRef = useRef(null);

  useClickOutside(menuRef, () => {
    setShowCoverMenu(false);
  });

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
      setCoverPicture(readerEvent.target.result);
    };
  };

  return (
    <div className="profile_cover">
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="post_error comment_error">
          <div className="post_error_text">{error}</div>
          <button className="blue_btn" onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      {cover && <img src={cover} className="cover" alt="" />}
      {!isVisitor && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add cover photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1">
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
