import { useEffect, useRef, useState } from 'react';
import { Return, Search } from '../../svg';
import useClickOutside from '../../helpers/clickOutside';
import {
  addToSearchHistory,
  deleteSearchHistory,
  getSearchHistory,
  search,
} from '../../helpers/user';
import { Link } from 'react-router-dom';

export default function SearchMenu({ color, setShowSearchMenu, token }) {
  const [searchIconVisible, setSearchIconVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const menu = useRef(null);
  const input = useRef(null);

  useClickOutside(menu, () => {
    setShowSearchMenu(false);
  });

  useEffect(() => {
    input.current.focus();
  }, []);
  useEffect(() => {
    getSearchHistoryHandler();
  }, []);

  const searchHandler = async () => {
    if (searchTerm === '') {
      setResults([]);
    } else {
      const response = await search(searchTerm, token);
      setResults(response);
    }
  };

  const getSearchHistoryHandler = async () => {
    const response = await getSearchHistory(token);
    setSearchHistory(response);
  };

  const addToSearchHistoryHandler = async (searchedUser) => {
    const response = await addToSearchHistory(searchedUser, token);
    getSearchHistoryHandler();
  };

  const deleteSearchHistoryHandler = async (searchedUser) => {
    await deleteSearchHistory(searchedUser, token);
    getSearchHistoryHandler();
  };

  return (
    <div className="header_left search_area scrollbar" ref={menu}>
      <div className="search_wrap">
        <div className="header_logo">
          <div
            className="circle hover1"
            onClick={() => {
              setShowSearchMenu(false);
            }}
          >
            <Return color={color} />
          </div>
        </div>
        <div
          className="search"
          onClick={() => {
            input.current.focus();
          }}
        >
          {searchIconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}
          <input
            type="text"
            placeholder="Search Aimer"
            ref={input}
            value={searchTerm}
            onChange={(eve) => setSearchTerm(eve.target.value)}
            onKeyUp={searchHandler}
            onFocus={() => {
              setSearchIconVisible(false);
            }}
            onBlur={() => {
              setSearchIconVisible(true);
            }}
          />
        </div>
      </div>
      {results.length === 0 && (
        <div className="search_history_header">
          <span>Recent searches</span>
          <a href="/">Edit</a>
        </div>
      )}
      <div className="search_history scrollbar">
        {searchHistory.length > 0 &&
          results.length === 0 &&
          searchHistory
            .sort((search1, search2) => {
              return new Date(search2.createdAt) - new Date(search1.createdAt);
            })
            .map((user) => (
              <div className="search_user_item hover1" key={user.user._id}>
                <Link
                  className="flex"
                  to={`/profile/${user.user.username}`}
                  onClick={() => addToSearchHistoryHandler(user.user._id)}
                >
                  <img src={user.user.picture} alt="" />
                  <span>
                    {user.user.firstName} {user.user.lastName}
                  </span>
                </Link>
                <i
                  className="exit_icon"
                  onClick={() => {
                    deleteSearchHistoryHandler(user.user._id);
                  }}
                ></i>
              </div>
            ))}
      </div>
      <div className="search_results scrollbar">
        {results &&
          results.map((user, i) => (
            <Link
              to={`/profile/${user.username}`}
              key={i}
              className="search_user_item hover1"
              onClick={() => addToSearchHistoryHandler(user._id)}
            >
              <img src={user.picture} alt="" />
              <span>
                {user.firstName} {user.lastName}
              </span>
            </Link>
          ))}
      </div>
    </div>
  );
}
