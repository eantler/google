// Import Actions
import { TOGGLE_ADD_POST, CURRENT_USER_CHANGED, ADD_TAG , REMOVE_TAG } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  isAuthenticated: false,
  user: undefined,
  tags: [{ key: 0 , label: 'test' }],
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case CURRENT_USER_CHANGED:
      return {
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    case ADD_TAG:
      let key = state.tags.length;
      return {
        tags: state.tags.concat({key, label: action.label}),
      };
      case REMOVE_TAG:
        let len = state.tags.length;
        let fixedTags = state.tags;
        fixedTags.splice(action.id, 1);
        return {
          tags: fixedTags.concat(),
        };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

//Get is Authenticated
export const getAuthenticated = state => state.app.getAuthenticated;

// Export Reducer
export default AppReducer;
