const PORT = 3002;
const API_URL = `http://localhost:${PORT}`;
let key = {
    'API_URL': API_URL,
    'PORT': PORT,
    'SECRET_KEY': 'PROJECT_GENIUS',
    'IMAGE': {
        'USER_FILE_PATH': 'public/profile/',
        'USER_FILE_URL_PATH': `${API_URL}/profile`,
        'TEACHER_FILE_PATH': 'public/teacherprofile/',
        'TEACHER_FILE_URL_PATH': `${API_URL}/teacherprofile`,
    }
}
module.exports = key