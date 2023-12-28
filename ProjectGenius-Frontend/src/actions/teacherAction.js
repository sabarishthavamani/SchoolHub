import axios from '../config/axios'

export const teachersignup = async (data) => {

    try {
        let respData = await axios({
            'url': '/teacher-register',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const teacherlogin = async (data) => {

    try {
        let respData = await axios({
            'url': '/teacher-login',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'token': respData.data.token,
            'result': respData.data.result
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const findsection = async (Data) => {

    try {
        let respData = await axios({
            'url': '/findsection',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
            'result2':respData.data.result2
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const Dailyattendance = async (Data) => {

    try {
        let respData = await axios({
            'url': '/daily-attendance',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
    }
}
}
export const findsectionformarks = async (Data) => {

    try {
        let respData = await axios({
            'url': '/findsectionformarks',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
            'result2':respData.data.result2,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const savemarksheet = async (Data) => {

    try {
        let respData = await axios({
            'url': '/marksheet',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
    }
}
}
export const findmarksheet = async (Data) => {

    try {
        let respData = await axios({
            'url': '/find-marksheet',
            'method': 'post',
            'data':Data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'result':respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
    }
}
}