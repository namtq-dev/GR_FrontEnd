import { useRef } from 'react';
import Moment from 'react-moment';

export default function Comment({ comment }) {
  const commentTextRef = useRef(null);
  const unhideButtonRef = useRef(null);

  const unhideComment = () => {
    commentTextRef.current.innerText = comment.comment;
    unhideButtonRef.current.style.display = 'None';
  };

  return (
    <div className="comment">
      <img
        src={comment.commentBy.picture}
        alt=""
        className="comment_profile_img"
      />
      <div className="comment_col">
        <div className="comment_wrap">
          <div className="comment_name">
            {comment.commentBy.firstName} {comment.commentBy.lastName}
          </div>
          <div className="comment_text" ref={commentTextRef}>
            {Number(comment.score) <= -1
              ? 'This comment is hidden.'
              : comment.comment}
          </div>
        </div>
        {comment.image && (
          <img src={comment.image} alt="" className="comment_image" />
        )}
        <div className="comment_actions">
          <span>Like</span>
          <span>Reply</span>
          {Number(comment.score) <= -1 && (
            <span ref={unhideButtonRef} onClick={() => unhideComment()}>
              Unhide
            </span>
          )}
          <span>
            <Moment fromNow interval={60}>
              {comment.commentAt}
            </Moment>
          </span>
        </div>
      </div>
    </div>
  );
}
