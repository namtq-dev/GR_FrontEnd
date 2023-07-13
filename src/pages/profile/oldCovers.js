import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useClickOutside from '../../helpers/clickOutside';

export default function OldCovers({
  photos,
  setCoverPicture,
  setShowOldCovers,
}) {
  const { user } = useSelector((state) => ({ ...state }));

  const oldCoversRef = useRef(null);

  useClickOutside(oldCoversRef, () => setShowOldCovers(false));

  return (
    <div className="blur">
      <div className="post_box select_covers_box" ref={oldCoversRef}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setShowOldCovers(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Select photo</span>
        </div>
        <div className="select_covers_box_links">
          <div className="select_covers_box_link">Recent photos</div>
          <div className="select_covers_box_link">Albums</div>
        </div>
        <div className="old_pictures_wrap scrollbar">
          <h4>Your cover pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) => img.folder === `${user.username}/coverPictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShowOldCovers(false);
                    }}
                  />
                ))}
          </div>
          <h4>Other pictures</h4>
          <div className="old_pictures">
            {photos &&
              photos
                .filter(
                  (img) => img.folder !== `${user.username}/coverPictures`
                )
                .map((photo) => (
                  <img
                    src={photo.secure_url}
                    key={photo.public_id}
                    alt=""
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShowOldCovers(false);
                    }}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
