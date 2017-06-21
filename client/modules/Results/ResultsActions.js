import callApi from '../../util/apiCaller';

// Export Constants
export const TOGGLE_LOGIN = 'TOGGLE_LOGIN';
export const TOGGLE_IMAGE_DIALOG = 'TOGGLE_IMAGE_DIALOG';

// Export Actions
export function toggleImageDialog(clusterId, memeId) {
  return {
    type: TOGGLE_IMAGE_DIALOG,
    clusterId,
    memeId
  };
}
