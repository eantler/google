// Import Actions
import { TOGGLE_ADD_POST, CURRENT_USER_CHANGED, ADD_TAG , REMOVE_TAG, SEARCH_CLICKED, SEARCH_DONE } from './AppActions';
import _ from 'lodash';
import cuid from 'cuid';

// Initial State
const initialState = {
  showAddPost: false,
  isAuthenticated: false,
  user: undefined,
  showLoader: false,
  searchResults: [],
  tags: [],
};


const AppReducer = (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };

    case CURRENT_USER_CHANGED:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      };
    
    case SEARCH_CLICKED:
      return {
        ...state,
        showLoader: true,
      };

    case SEARCH_DONE:
      return {
        ...state,
        showLoader: false,
        searchResults: action.results,
      };
    
    case ADD_TAG:
      let key = cuid();
      return {
        ...state,
        tags: state.tags.concat({key, label: action.label}),
      };

      case REMOVE_TAG:
        let len = state.tags.length;
        let location = _.find(state.tags, (obj) => { return obj==action.id});
        let fixedTags = state.tags;
        fixedTags.splice(location, 1);
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
