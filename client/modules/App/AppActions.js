import callApi from '../../util/apiCaller';
import loginApi from '../../util/loginApi';
// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const CURRENT_USER_CHANGED = 'CURRENT_USER_CHANGED';
export const START_AUTHENTICATION = 'START_AUTHENTICATION';
export const END_AUTHENTICATION = 'END_AUTHENTICATION';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG  = 'REMOVE_TAG';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
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
  console.log("added tag");
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
