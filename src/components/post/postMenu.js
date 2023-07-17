import { useRef, useState } from 'react';
import MenuItem from './menuItem';
import useClickOutside from '../../helpers/clickOutside';
import { deletePost, savePost } from '../../helpers/post';
import { saveAs } from 'file-saver';

export default function PostMenu({
  userId,
  postUserId,
  imagesLength,
  setShowMenu,
  postId,
  token,
  isPostSaved,
  setIsPostSaved,
  images,
  postRef,
}) {
  const [isMyPost, setIsMyPost] = useState(
    userId === postUserId ? true : false
  );

  const menu = useRef(null);

  useClickOutside(menu, () => {
    setShowMenu(false);
  });

  const savePostHandler = async () => {
    savePost(postId, token);
    if (isPostSaved) {
      setIsPostSaved(false);
    } else {
      setIsPostSaved(true);
    }
  };

  const downloadImages = async () => {
    images?.map((img) => {
      const imgName = img.url.substr(img.url.lastIndexOf('/') + 1);
      saveAs(img.url, imgName);
      return img;
    });
  };

  const deletePostHandler = async () => {
    const response = await deletePost(postId, token);
    if (response.status === 'OK') {
      postRef.current.remove();
    }
  };

  return (
    <ul className="post_menu" ref={menu}>
      {isMyPost && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={savePostHandler}>
        {isPostSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>
      {isMyPost && <MenuItem icon="edit_icon" title="Edit Post" />}
      {!isMyPost && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this Post"
        />
      )}
      {imagesLength && (
        <div onClick={downloadImages}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )}
      {isMyPost && (
        <MenuItem img="../../../icons/lock.png" title="Edit audience" />
      )}
      {isMyPost && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this Post"
        />
      )}
      {isMyPost && (
        <MenuItem icon="delete_icon" title="Turn off translations" />
      )}
      {isMyPost && <MenuItem icon="date_icon" title="Edit Date" />}
      {isMyPost && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {isMyPost && <MenuItem icon="archive_icon" title="Move to archive" />}
      {isMyPost && (
        <div onClick={deletePostHandler}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="Items in your trash are deleted after 30 days."
          />
        </div>
      )}
      {!isMyPost && <div className="line"></div>}
      {!isMyPost && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report Post"
          subtitle="I'm concerned about this post."
        />
      )}
    </ul>
  );
}
