import axios from 'axios';

export const updateAvatar = async (url, token) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`,
      { url },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateCoverPicture = async (url, token) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/updateCoverPicture`,
      { url },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};
