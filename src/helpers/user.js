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

export const addFriend = async (id, token) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (
      data.response.message === 'Your friend request has been sent successfully'
    ) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const cancelFriendRequest = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/cancelFriendRequest/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (
      data.response.message === 'Your cancel request has been sent successfully'
    ) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const follow = async (id, token) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/follow/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (
      data.response.message === 'Your follow request has been sent successfully'
    ) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const unfollow = async (id, token) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/unfollow/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (
      data.response.message ===
      'Your unfollow request has been sent successfully'
    ) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const acceptFriend = async (id, token) => {
  try {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/acceptFriend/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (
      data.response.message ===
      'You have successfully become friend with this user'
    ) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const unfriend = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/unfriend/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (data.response.message === 'You have successfully unfriend this user') {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteFriendRequest = async (id, token) => {
  try {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/deleteFriendRequest/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (
      data.response.message === 'You have successfully decline a friend request'
    ) {
      return 'OK';
    }
  } catch (error) {
    return error.response.data.message;
  }
};
