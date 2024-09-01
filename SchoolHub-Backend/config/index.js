const PORT = 3002;
const API_URL = `http://localhost:${PORT}`;
let key = {
    'API_URL': API_URL,
    'PORT': PORT,
    'SECRET_KEY': 'PROJECT_GENIUS',
    'IMAGE': {
        'USER_FILE_PATH': 'public/studentprofile/',
        'USER_FILE_URL_PATH': `${API_URL}/studentprofile`,


        'TEACHER_FILE_PATH': 'public/teacherprofile/',
        'TEACHER_FILE_URL_PATH': `${API_URL}/teacherprofile`,

        
        'DRIVER_FILE_PATH': 'public/driverprofile/',
        'DRIVER_FILE_URL_PATH': `${API_URL}/driverprofile`,


        'VehiclePhoto_FILE_PATH': 'public/VehiclePhoto/',
        'VehiclePhoto_FILE_URL_PATH': `${API_URL}/VehiclePhoto`,

        
        'AdminnotificationPhoto_FILE_PATH': 'public/AdminnotificationPhoto/',
        'AdminnotificationPhoto_FILE_URL_PATH': `${API_URL}/AdminnotificationPhoto`,


        'HomeWork_FILE_PATH': 'public/HomeWorkFile/',
        'HomeWork_FILE_URL_PATH': `${API_URL}/HomeWorkFile`,
        
        'Meeting_FILE_PATH': 'public/ParentsMeetingFile/',
        'Meeting_FILE_URL_PATH': `${API_URL}/ParentsMeetingFile`,
    }
}
module.exports = key