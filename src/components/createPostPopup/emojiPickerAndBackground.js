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
        {!type2 && <img src="../../../icons/colorful.png" alt="" />}
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
