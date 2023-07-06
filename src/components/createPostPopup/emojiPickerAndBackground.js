import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';

export default function EmojiPickerAndBackground({
  text,
  setText,
  user,
  type2,
}) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showBgs, setShowBgs] = useState(false);

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

  const postBackgrounds = [
    '../../../images/postbackgrounds/1.jpg',
    '../../../images/postbackgrounds/2.jpg',
    '../../../images/postbackgrounds/3.jpg',
    '../../../images/postbackgrounds/4.jpg',
    '../../../images/postbackgrounds/5.jpg',
    '../../../images/postbackgrounds/6.jpg',
    '../../../images/postbackgrounds/7.jpg',
    '../../../images/postbackgrounds/8.jpg',
    '../../../images/postbackgrounds/9.jpg',
    '../../../images/postbackgrounds/10.jpg',
  ];

  return (
    <div className={type2 ? 'image_input' : ''}>
      <div className={!type2 ? 'flex_center' : ''}>
        <textarea
          ref={textRef}
          maxLength="500"
          value={text}
          placeholder={`What's on your mind, ${user?.firstName}?`}
          className={`post_input ${type2 && 'post_input2'}`}
          onChange={(eve) => setText(eve.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? 'post_emojis_wrap' : ''}>
        {picker && (
          <div
            className={`comment_emoji_picker ${
              type2 ? 'move_picker2' : 'rlmove'
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => {
              setShowBgs((prev) => !prev);
            }}
          />
        )}
        {!type2 && showBgs && (
          <div className="post_backgrounds">
            <div className="no_bg"></div>
            {postBackgrounds.map((bg, i) => (
              <img src={bg} key={i} alt="" />
            ))}
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 && 'move_left'}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
