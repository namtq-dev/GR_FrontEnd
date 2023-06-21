import EmojiPickerAndBackground from './emojiPickerAndBackground';

export default function ImagePreview({ text, setText, user }) {
  return (
    <div className="overflow_a">
      <EmojiPickerAndBackground
        text={text}
        setText={setText}
        user={user}
        type2
      />
    </div>
  );
}
