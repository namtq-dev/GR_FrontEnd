import { useState } from 'react';

export default function UpdateProfilePicture({ setImage }) {
  const [description, setDescription] = useState('');

  return (
    <div className="post_box update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage('')}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_img_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(eve) => {
            setDescription(eve.target.value);
          }}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      <div className="update_center">
        <div className="cropper"></div>
      </div>
    </div>
  );
}
