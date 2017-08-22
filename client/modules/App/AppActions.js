import callApi from '../../util/apiCaller';
import callPythonApi from '../../util/pythonApiCaller';
import loginApi from '../../util/loginApi';
//import SOME API from
import { browserHistory } from 'react-router';
import cuid from 'cuid';
import _ from 'lodash';

// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const CURRENT_USER_CHANGED = 'CURRENT_USER_CHANGED';
export const START_AUTHENTICATION = 'START_AUTHENTICATION';
export const END_AUTHENTICATION = 'END_AUTHENTICATION';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG  = 'REMOVE_TAG';
export const SEARCH_CLICKED = 'SEARCH_CLICKED';
export const SEARCH_DONE = 'SEARCH_DONE';
export const MORE_CLICKED = 'MORE_CLICKED';
export const TOGGLE_ADVANCED_DIALOG = 'TOGGLE_ADVANCED_DIALOG';
export const SAVE_ADVANCED_OPTIONS = 'SAVE_ADVANCED_OPTIONS';
export const TAG_WEIGHT_CHANGE = 'TAG_WEIGHT_CHANGE';


// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}
export function startSearch() {

  return {type: SEARCH_CLICKED}

}

export function moreClicked(id){
    return {
      type: MORE_CLICKED,
      id
    }
}
export function endSearch(results) {
  // browserHistory.push('/results');
  return {
      type: SEARCH_DONE,
      results
  }
}

export function toggleAdvancedDialog() {
  return {
    type: TOGGLE_ADVANCED_DIALOG,
  }
}

export function saveAdvancedOptions(advanced) {
  return {
    type: SAVE_ADVANCED_OPTIONS,
    advanced
  }
}

export function tagWeightChange(id,value) {
  return {
    type: TAG_WEIGHT_CHANGE,
    id,
    value
  }
}
export function clickSearch(photo, tags, advanced) {
  return (dispatch) => {
  //making the loader appear
  dispatch(startSearch());
  // api call
  console.log('staring to call api');
  callPythonApi('get_clustered_top_k_similar_memes', 'post', {photo, tags, advanced}).then( res => {
    console.log('got response: ');
    console.log(JSON.stringify(res));
    var clusters = res.clusters;
    _.forEach(clusters, (item,i) => {
      item.isExpanded = false;
    });
    dispatch(endSearch(clusters));
  })
  // // contacting server and doing unsync stuff..
  // dispatch(endSearch(defaultResults));
  }
}

export function startAuthentication() {
  return {
    type: START_AUTHENTICATION,
  };
}


export function currentUserChanged(isAuthenticated,user) {
  return  {
    type: CURRENT_USER_CHANGED,
    isAuthenticated,
    user
  };
}

export function addTag(label) {
  return {
    type: ADD_TAG,
    label
  }
}

export function removeTag(id) {
  return {
    type: REMOVE_TAG,
    id
  }
}
// Getters
export function performAddTag(label) {
  return (dispatch) => {
    dispatch(addTag(label));
  };

}

export function performRemovetag(id) {
  // do some calling to server
  return (dispatch) => {
    dispatch(removeTag(id));
  };

}

export function fetchCurrentUser() {
  return (dispatch) => {
    return callApi('user').then(res => {
      console.log('response from api: ' + JSON.stringify(res));
      dispatch(currentUserChanged(res.isAuthenticated, res.user[0]));
    });
  };
}

export function makeLoginWithGoogle() {
  return (dispatch) => {
    dispatch(startAuthentication());
    return loginApi('/google/redirect').then(res => {
      console.log('response from api: ' + JSON.stringify(res));
      dispatch(currentUserChanged(res.isAuthenticated, res.user[0]));
    });
  };
}
