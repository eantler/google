import { TOGGLE_LOGIN, TOGGLE_IMAGE_DIALOG } from './ResultsActions';
// Initial State
const initialState = { data: [],  isDialogOpen: false};

const ResultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_IMAGE_DIALOG:
    return {
        ...state,
        isDialogOpen: !state.isDialogOpen,
      };
      
    default:
      return state;
  }
};

/* Selectors */


// Export Reducer
export default ResultsReducer;
