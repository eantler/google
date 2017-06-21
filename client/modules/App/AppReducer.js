// Import Actions
import { TOGGLE_ADVANCED_DIALOG,TOGGLE_ADD_POST, CURRENT_USER_CHANGED, ADD_TAG , REMOVE_TAG, SEARCH_CLICKED, SEARCH_DONE, MORE_CLICKED } from './AppActions';
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
  isAdvancedOpen: false,
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

    case MORE_CLICKED:
      var results = _.map(state.searchResults, _.clone);
      results[action.id].isExpanded = !state.searchResults[action.id].isExpanded;
      return {
        ...state,
        searchResults: results,
      };

      case REMOVE_TAG:
        let fixedTags = state.tags.concat();
        _.remove(fixedTags, (obj) => { return obj.key==action.id});
        return {
          ...state,
          tags: fixedTags,
        };

        case TOGGLE_ADVANCED_DIALOG:
        return {
          ...state,
          isAdvancedOpen: !state.isAdvancedOpen,
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
