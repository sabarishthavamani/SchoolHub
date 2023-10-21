import jwt_decode from "jwt-decode";

const jwtSecretKey = 'MERN_STACK';

const jwtVerify = (token) => {
    try {
        let decoded = jwt_decode(token, jwtSecretKey);
        return decoded;
    } catch (err) {
        return ''
    }
}

export default jwtVerify;