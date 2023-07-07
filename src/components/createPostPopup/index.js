import { useState } from 'react';
import EmojiPickerAndBackground from './emojiPickerAndBackground';
import AddToYourPost from './addToYourPost';
import ImagePreview from './imagePreview';
import './style.css';

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState('');

  return (
    <div className="blur">
      <div className="post_box">
        <div className="box_header">
          <div className="small_circle">
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user?.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!showPrev ? (
          <>
            <EmojiPickerAndBackground
              text={text}
              setText={setText}
              user={user}
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            setText={setText}
            user={user}
            images={images}
            setImages={setImages}
            setShowPrev={setShowPrev}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
}
