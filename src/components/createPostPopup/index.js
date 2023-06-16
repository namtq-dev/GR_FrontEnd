import { useRef, useState } from 'react';
import EmojiPickerAndBackground from './emojiPickerAndBackground';
import AddToYourPost from './addToYourPost';
import './style.css';

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);

  const textRef = useRef(null);

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
        {!showPrev && (
          <>
            <div className="flex_center">
              <textarea
                ref={textRef}
                maxLength="500"
                value={text}
                placeholder={`What's on your mind, ${user?.firstName}?`}
                className="post_input"
                onChange={(eve) => setText(eve.target.value)}
              ></textarea>
            </div>
            <EmojiPickerAndBackground
              text={text}
              setText={setText}
              textRef={textRef}
            />
          </>
        )}
        <AddToYourPost />
        <button className="post_submit">Post</button>
      </div>
    </div>
  );
}
