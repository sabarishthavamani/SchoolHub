import axios from 'axios';

// import config
import config from './index';

// import lib
import getAuthToken, { removeAuthToken } from '../lib/localstorage';

axios.defaults.baseURL = config.SERVER_URL;
axios.defaults.headers.common['Authorization'] = getAuthToken();

export const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export const removeAuthorization = (token) => {
    delete axios.defaults.headers.common['Authorization'];
    removeAuthToken()
}

export default axios;