import { useEffect, useRef, useState } from 'react';
import Picker from 'emoji-picker-react';

export default function CreateComments({ user }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState('');
  const [cursorPosition, setCursorPosition] = useState();
  const [commentImage, setCommentImage] = useState('');
  const [error, setError] = useState('');

  const textRef = useRef(null);
  const imageInput = useRef(null);

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

  const handleImages = (eve) => {
    let img = eve.target.files[0]; // only 1 image per comment
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
      setCommentImage(readerEvent.target.result);
    };
  };

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imageInput}
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImages}
          />
          {error && (
            <div className="post_error comment_error">
              <div className="post_error_text">{error}</div>
              <button className="blue_btn" onClick={() => setError('')}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(eve) => setText(eve.target.value)}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => setPicker((prev) => !prev)}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imageInput.current.click()}
          >
            <i className="camera_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="gif_icon"></i>
          </div>
          <div className="comment_circle_icon hover2">
            <i className="sticker_icon"></i>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage('')}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
    </div>
  );
}
