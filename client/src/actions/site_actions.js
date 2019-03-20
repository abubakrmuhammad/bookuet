import axios from 'axios';
import { SITE_SERVER } from '../utils/misc';
import { GET_STIE_INFO, UPDATE_SITE_INFO } from '../utils/types';

export function getSiteInfo() {
  const request = axios.get(`${SITE_SERVER}/site_info`).then(response => response.data[0]);

  return {
    type: GET_STIE_INFO,
    payload: request
  };
}

export function updateSiteInfo(dataToSubmit) {
  const request = axios.post(`${SITE_SERVER}/site_info`, dataToSubmit).then(response => response.data);

  return {
    type: UPDATE_SITE_INFO,
    payload: request
  };
}
