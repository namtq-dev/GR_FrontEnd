export function friendsPageReducer(state, action) {
  switch (action.type) {
    case 'FRIENDS_PAGE_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FRIENDS_PAGE_SUCCESS':
      return { ...state, loading: false, data: action.payload, error: '' };
    case 'FRIENDS_PAGE_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
