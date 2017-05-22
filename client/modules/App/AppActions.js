import callApi from '../../util/apiCaller';
import loginApi from '../../util/loginApi';
import { browserHistory } from 'react-router';
import cuid from 'cuid';

// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';
export const CURRENT_USER_CHANGED = 'CURRENT_USER_CHANGED';
export const START_AUTHENTICATION = 'START_AUTHENTICATION';
export const END_AUTHENTICATION = 'END_AUTHENTICATION';
export const ADD_TAG = 'ADD_TAG';
export const REMOVE_TAG  = 'REMOVE_TAG';
export const SEARCH_CLICKED = 'SEARCH_CLICKED';
export const SEARCH_DONE = 'SEARCH_DONE';

const defaultResults = [
          {
            uniqueID: cuid(),
            name: 'Kid, Apple Inc',
            memes: [
              'http://weknowmemes.com/wp-content/uploads/2012/05/itouch-kids-meme.jpg'
              ,'https://cdn.meme.am/cache/instances/folder877/65774877.jpg'
              ,'https://cdn.meme.am/cache/instances/folder965/43160965.jpg'
              ,'https://i.imgflip.com/g9k53.jpg'
              ,'https://img.memecdn.com/introducing-spoiled-kid-kyle_o_1893227.jpg'
            ]
          },
          {
            uniqueID: cuid(),
            name: 'Baby, Fruit',
            memes: [
              'http://s2.quickmeme.com/img/51/516fbac7acc1f675ba4c3222eba9c6535835a3aed60c0960bb49166f0b1984dd.jpg'
              ,'https://cdn.meme.am/cache/instances/folder438/500x/53576438.jpg'
              ,'https://s-media-cache-ak0.pinimg.com/736x/8b/4c/25/8b4c252e7721751ab69af2bb60f78392--eating-watermelon-watermelon-baby.jpg'
              ,'https://i.imgflip.com/g84ib.jpg'
              ,'https://i.imgflip.com/hqppv.jpg'
            ]
          },
          {
            uniqueID: cuid(),
            name: 'Kid, Food',
            memes: [
              'http://mommyshorts.com/wp-content/uploads/2014/09/6a0133f30ae399970b01b8d0689f9d970c-800wi.jpg'
              ,'http://images5.aplus.com/uc-up/ba24a3b8-fc7e-40e6-9d37-379b5471fb47/6a0133f30ae399970b01a73e08e2cf970d800wi.resize_640x.jpg'
              ,'http://m.memegen.com/t8ot6h.jpg'
              ,'https://img.memesuper.com/69b29cce38f32a64874db8b8eca6d3fc_-kid-meme-eating-food-meme-eating-food_400-400.jpeg'
              ,'https://i.imgflip.com/n3hlr.jpg'
            ]
          },
          {
            uniqueID: cuid(),
            name: 'Baby, Cake',
            memes: [
              'https://s-media-cache-ak0.pinimg.com/736x/f6/ba/ef/f6baefaeba0a1a28aebe40876dac37c4.jpg'
              ,'http://www.quickmeme.com/img/18/18b384585e013aa63ea6fc32f344c1417cca02903653621f22711192e16ad8d6.jpg'
              ,'https://img.memecdn.com/baby-food_o_993584.jpg'
              ,'https://img.memecdn.com/chocolate-cake_o_218856.jpg'
              ,'https://i.imgflip.com/11fx2t.jpg'
            ]
          },
        ];

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}
export function startSearch() {

  return {type: SEARCH_CLICKED}

}

export function endSearch(results) {
  // browserHistory.push('/results');
  return {
      type: SEARCH_DONE,
      results
  }
}
export function clickSearch() {
  return (dispatch) => {
  //making the loader appear
  dispatch(startSearch());

  // contacting server and doing unsync stuff..
  setTimeout(() => {
      dispatch(endSearch(defaultResults)); 
    }, 2000);

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
