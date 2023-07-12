import { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../helpers/getCroppedImg';
import { uploadImages } from '../../helpers/uploadImages';
import { updateAvatar } from '../../helpers/user';
import { createPost } from '../../helpers/post';
import PulseLoader from 'react-spinners/PulseLoader';
import Cookies from 'js-cookie';

export default function UpdateProfilePicture({
  image,
  setImage,
  setError,
  setShowUpdate,
  avatarRef,
}) {
  const [description, setDescription] = useState('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);

  const slider = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };

  const getCroppedImage = useCallback(
    async (isJustShow) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (isJustShow) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateProfilePicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((data) => data.blob()); // change image url to blob

      const path = `${user.username}/profilePictures`;
      let formData = new FormData();
      formData.append('file', blob);
      formData.append('path', path);

      const response = await uploadImages(formData, user.loginToken);
      const newProfilePicRes = await updateAvatar(
        response[0].url,
        user.loginToken
      );
      if (newProfilePicRes === 'OK') {
        const newPost = await createPost(
          'profilePicture',
          null,
          description,
          response,
          user.id,
          user.loginToken
        );

        setLoading(false);
        if (newPost === 'OK') {
          avatarRef.current.style.backgroundImage = `url(${response[0].url})`;
          dispatch({
            type: 'UPDATE_AVATAR',
            payload: response[0].url,
          });
          Cookies.set(
            'user',
            JSON.stringify({ ...user, picture: response[0].url })
          );
          setShowUpdate(false);
          setImage('');
        } else {
          setError(newPost);
        }
      } else {
        setLoading(false);
        setError(newProfilePicRes);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.error);
    }
  };

  return (
    <div className="post_box update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage('')}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_img_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(eve) => {
            setDescription(eve.target.value);
          }}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      <div className="update_center">
        <div className="cropper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            value={zoom}
            onChange={(eve) => setZoom(eve.target.value)}
            ref={slider}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage(true)}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage('')}>
          Cancel
        </div>
        <button
          className="blue_btn"
          disabled={loading}
          onClick={() => updateProfilePicture()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : 'Save'}
        </button>
      </div>
    </div>
  );
}
