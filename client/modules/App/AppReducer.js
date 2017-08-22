// Import Actions
import { SAVE_ADVANCED_OPTIONS,
  TOGGLE_ADVANCED_DIALOG,
  TOGGLE_ADD_POST,
  CURRENT_USER_CHANGED,
  ADD_TAG,
  REMOVE_TAG,
  SEARCH_CLICKED,
  SEARCH_DONE,
  MORE_CLICKED,
  TAG_WEIGHT_CHANGE } from './AppActions';
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
  advancedOptions: {},
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
        advancedOptions:{},
      };

    case ADD_TAG:
      let key = cuid();
      return {
        ...state,
        tags: state.tags.concat({key, label: action.label, weight: 1}),
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

        case SAVE_ADVANCED_OPTIONS:
          var newTagsArray = state.tags.slice();
          var advancedTagsWeights = {};
          _.forEach(newTagsArray, (tag,index,collection) => {
            collection[index].weight = collection[index].tempWeight ? collection[index].tempWeight : collection[index].weight;
            advancedTagsWeights[tag.label] = collection[index].weight;
          });
          return {
            ...state,
            tags: newTagsArray,
            advancedOptions: {...action.advanced,
                              tags_weights: advancedTagsWeights},
            isAdvancedOpen: !state.isAdvancedOpen,
          };

        case TAG_WEIGHT_CHANGE:
          var newTagsArray = state.tags.slice();
          var index = _.findIndex(state.tags, (tag) => {
              return tag.key==action.id ? true : false;
          });
          newTagsArray[index].tempWeight = action.value;
        return {
          ...state,
          tags: newTagsArray,
        }

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
