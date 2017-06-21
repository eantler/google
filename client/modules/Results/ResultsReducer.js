import { TOGGLE_LOGIN, TOGGLE_IMAGE_DIALOG } from './ResultsActions';
// Initial State
const initialState = { data: [], isDialogOpen: false, clusterId: null, memeId: null};

const ResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IMAGE_DIALOG:
    return {
        ...state,
        isDialogOpen: !state.isDialogOpen,
        clusterId: action.clusterId,
        memeId: action.memeId
      };

    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default ResultsReducer;
