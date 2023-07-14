import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';
import { useMediaQuery } from 'react-responsive';

export default function EmojiPickerAndBackground({
  text,
  setText,
  user,
  type2,
  background,
  setBackground,
}) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const [showBgs, setShowBgs] = useState(false);

  const textRef = useRef(null);
  const bgRef = useRef(null);

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
    // '../../../images/postbackgrounds/10.jpg',
  ];

  const backgroundHandler = (index) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[index]})`;
    bgRef.current.classList.add('bg_handler');
    setBackground(postBackgrounds[index]);
  };

  const removeBackground = () => {
    bgRef.current.style.backgroundImage = '';
    bgRef.current.classList.remove('bg_handler');
    setBackground('');
  };

  const smallScreen = useMediaQuery({
    query: '(max-width:550px)',
  });

  return (
    <div className={type2 ? 'image_input' : ''}>
      <div className={!type2 ? 'flex_center' : ''} ref={bgRef}>
        <textarea
          ref={textRef}
          maxLength="250"
          value={text}
          placeholder={`What's on your mind, ${user?.firstName}?`}
          className={`post_input ${type2 && 'post_input2'} ${
            smallScreen && !background && 'l0'
          }`}
          onChange={(eve) => setText(eve.target.value)}
          style={{
            paddingTop: `${
              background
                ? Math.abs(textRef.current.value.length * 0.1 - 32)
                : '0'
            }%`,
          }}
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
            <div
              className="no_bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((bg, i) => (
              <img
                src={bg}
                key={i}
                alt=""
                onClick={() => {
                  backgroundHandler(i);
                }}
              />
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
