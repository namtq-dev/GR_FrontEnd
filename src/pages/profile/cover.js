import { useCallback, useEffect, useRef, useState } from 'react';
import useClickOutside from '../../helpers/clickOutside';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../helpers/getCroppedImg';
import { updateCoverPicture } from '../../helpers/user';
import { useSelector } from 'react-redux';
import { uploadImages } from '../../helpers/uploadImages';
import { createPost } from '../../helpers/post';
import PulseLoader from 'react-spinners/PulseLoader';

export default function Cover({ cover, isVisitor }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState('');
  const [error, setError] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [coverWidth, setCoverWidth] = useState();
  const [loading, setLoading] = useState(false);

  const menuRef = useRef(null);
  const inputRef = useRef(null);
  const coverRef = useRef(null);
  const coverPictureRef = useRef(null);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setCoverWidth(coverRef.current.clientWidth);
  }, [window.innerWidth]);

  useClickOutside(menuRef, () => {
    setShowCoverMenu(false);
  });

  const handleImage = (eve) => {
    let img = eve.target.files[0]; // only 1 image per update
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
      setCoverPicture(readerEvent.target.result);
    };
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (isJustShow) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (isJustShow) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateCover = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((data) => data.blob()); // change image url to blob

      const path = `${user.username}/coverPictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);

      const response = await uploadImages(formData, user.loginToken);
      const newCoverPicRes = await updateCoverPicture(
        response[0].url,
        user.loginToken
      );
      if (newCoverPicRes === 'OK') {
        const newPost = await createPost(
          'cover',
          null,
          null,
          response,
          user.id,
          user.loginToken
        );

        setLoading(false);
        if (newPost === 'OK') {
          setCoverPicture('');
          coverPictureRef.current.src = response[0].url;
        } else {
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(newCoverPicRes);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="profile_cover" ref={coverRef}>
      {coverPicture && (
        <div className="save_changes_cover">
          <div className="save_changes_left">
            <i className="public_icon"></i>
            Your cover photo is public
          </div>
          <div className="save_changes_right">
            <button
              className="blue_btn opacity_btn"
              onClick={() => setCoverPicture('')}
            >
              Cancel
            </button>
            <button className="blue_btn" onClick={() => updateCover()}>
              {loading ? <PulseLoader color="#fff" size={5} /> : 'Save changes'}
            </button>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={inputRef}
        hidden
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
      {error && (
        <div className="post_error comment_error">
          <div className="post_error_text">{error}</div>
          <button className="blue_btn" onClick={() => setError('')}>
            Try again
          </button>
        </div>
      )}
      {coverPicture && (
        <div className="cover_cropper">
          <Cropper
            image={coverPicture}
            crop={crop}
            zoom={zoom}
            aspect={coverWidth / 350}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={true}
            objectFit="horizontal-cover"
          />
        </div>
      )}
      {cover && !coverPicture && (
        <img src={cover} className="cover" alt="" ref={coverPictureRef} />
      )}
      {!isVisitor && (
        <div className="update_cover_wrapper">
          <div
            className="open_cover_update"
            onClick={() => setShowCoverMenu((prev) => !prev)}
          >
            <i className="camera_filled_icon"></i>
            Add cover photo
          </div>
          {showCoverMenu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div className="open_cover_menu_item hover1">
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => inputRef.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
