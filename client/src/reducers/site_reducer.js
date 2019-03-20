import { GET_STIE_INFO, UPDATE_SITE_INFO } from '../utils/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_STIE_INFO:
      return { ...state, siteInfo: action.payload };
    case UPDATE_SITE_INFO:
      return { ...state, siteInfo: action.payload.siteInfo };
    default:
      return { ...state };
  }
}
