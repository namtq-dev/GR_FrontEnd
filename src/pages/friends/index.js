import { useEffect, useReducer } from 'react';
import Header from '../../components/header';
import { getFriendsPage } from '../../helpers/user';
import { useSelector } from 'react-redux';
import { friendsPageReducer } from '../../reducers/friendsPageReducer';
import Card from './card';
import { Link, useParams } from 'react-router-dom';
import './style.css';

export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();

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
            <Link
              to="/friends"
              className={`mmenu_item hover3 ${
                type === undefined && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_home_icon"></i>
              </div>
              <span>Home</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/requests"
              className={`mmenu_item hover3 ${
                type === 'requests' && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Friend requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <Link
              to="/friends/sent"
              className={`mmenu_item hover3 ${
                type === 'sent' && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="friends_requests_icon"></i>
              </div>
              <span>Sent requests</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
            <div className="mmenu_item hover3">
              <div className="small_circle">
                <i className="friends_suggestions_icon"></i>
              </div>
              <span>Suggestions</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </div>
            <Link
              to="/friends/all"
              className={`mmenu_item hover3 ${
                type === 'all' && 'active_friends'
              }`}
            >
              <div className="small_circle">
                <i className="all_friends_icon"></i>
              </div>
              <span>All friends</span>
              <div className="rArrow">
                <i className="right_icon"></i>
              </div>
            </Link>
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
          {(type === undefined || type === 'requests') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Friend requests</h3>
                {type === undefined && (
                  <Link to="/friends/requests" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data.requests &&
                  data.requests.map((user) => (
                    <Card
                      cardUser={user}
                      key={user._id}
                      type="request"
                      getPageData={getPageData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === 'sent') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>Sent requests</h3>
                {type === undefined && (
                  <Link to="/friends/sent" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data.sentRequests &&
                  data.sentRequests.map((user) => (
                    <Card
                      cardUser={user}
                      key={user._id}
                      type="sent"
                      getPageData={getPageData}
                    />
                  ))}
              </div>
            </div>
          )}
          {(type === undefined || type === 'all') && (
            <div className="friends_right_wrap">
              <div className="friends_left_header">
                <h3>All friends</h3>
                {type === undefined && (
                  <Link to="/friends/all" className="see_link hover3">
                    See all
                  </Link>
                )}
              </div>
              <div className="flex_wrap">
                {data.friends &&
                  data.friends.map((user) => (
                    <Card
                      cardUser={user}
                      key={user._id}
                      type="friend"
                      getPageData={getPageData}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
