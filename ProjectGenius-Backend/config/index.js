const PORT = 3002;
const API_URL = `http://localhost:${PORT}`;
let key = {
    'API_URL': API_URL,
    'PORT': PORT,
    'SECRET_KEY': 'MERN_STACK',
    'IMAGE': {
        'USER_FILE_PATH': 'public/profile/',
        'USER_FILE_URL_PATH': `${API_URL}/profile`,
    }
}

module.exports = key 