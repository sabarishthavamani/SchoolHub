// lib
import getAuthToken from './localstorage';

const isLogin = () => {
    if(getAuthToken()){
        return true;
    }

    return false;
}

export default isLogin;