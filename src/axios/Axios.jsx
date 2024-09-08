import axios from 'axios';

const BASE_URL = '/api/TAP/sync?query=select+objectid,pl_name,pl_letter,hostid,hostname,hd_name,hip_name,tic_id,disc_pubdate,disc_year,disc_method,discoverymethod,disc_locale,disc_facility,disc_instrument,disc_telescope,disc_refname,ra+from+pscomppars&format=json';

export const AxiosExoplanets = axios.create({
  baseURL: BASE_URL,
});