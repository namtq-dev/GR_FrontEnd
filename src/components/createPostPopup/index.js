import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import './style.css';

export default function CreatePostPopup({ user }) {
  const [text, setText] = useState('');
  const [showPrev, setShowPrev] = useState(false);
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);

  const handleEmoji = (eve, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const textBeforeCursor = text.substring(0, ref.selectionStart);
    const textAfterCursor = text.substring(ref.selectionStart);
    const newText = textBeforeCursor + emoji + textAfterCursor;

    setText(newText);
    setCursorPosition(textBeforeCursor.length + emoji.length);
  };

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
        )}
        <div className="post_emojis_wrap">
          {picker && (
            <div className="comment_emoji_picker rlmove">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <img src="../../../icons/colorful.png" alt="" />
          <i
            className="emoji_icon_large"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}
