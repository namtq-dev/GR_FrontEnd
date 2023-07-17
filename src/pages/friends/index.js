import { useEffect, useReducer } from 'react';
import Header from '../../components/header';
import './style.css';
import { getFriendsPage } from '../../helpers/user';
import { useSelector } from 'react-redux';
import { friendsPageReducer } from '../../reducers/friendsPageReducer';
import Card from './card';

export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));

  const [{ loading, data, error }, dispatch] = useReducer(friendsPageReducer, {
    loading: false,
    data: {},
    error: '',
  });

  useEffect(() => {
    getPageData();
  }, []);

  const getPageData = async () => {
    dispatch({ type: 'FRIENDS_PAGE_REQUEST' });
    const data = await getFriendsPage(user.loginToken);

    if (data.status === 'OK') {
      dispatch({ type: 'FRIENDS_PAGE_SUCCESS', payload: data.data });
    } else {
      dispatch({ type: 'FRIENDS_PAGE_ERROR', payload: data.data });
    }
  };

  return (
    <>
      <Header page="friends" />
      <div className="friends">
        <div className="friends_left">
          <div className="friends_left_header">
            <h3>Friends</h3>
            <div className="small_circle">
              <i className="settings_filled_icon"></i>
            </div>
          </div>
          <div className="friends_left_wrap">
            <div className="mmenu_item active_friends">
              <div className="small_circle" style={{ background: '#1876f2' }}>
                <i className="friends_home_icon invert"></i>
              </div>
              <span>Home</span>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="birthdays_icon"></i>
              </div>
              <span>Birthdays</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>Custom</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="friends_right">
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Friend requests</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.requests &&
                data.requests.map((user) => (
                  <Card user={user} key={user._id} type="request" />
                ))}
            </div>
          </div>
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>Sent requests</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.sentRequests &&
                data.sentRequests.map((user) => (
                  <Card user={user} key={user._id} type="sent" />
                ))}
            </div>
          </div>
          <div className="friends_right_wrap">
            <div className="friends_left_header">
              <h3>All friends</h3>
              <a className="see_link hover3">See all</a>
            </div>
            <div className="flex_wrap">
              {data.friends &&
                data.friends.map((user) => (
                  <Card user={user} key={user._id} type="friend" />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
