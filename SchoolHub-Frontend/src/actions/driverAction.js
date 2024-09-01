import axios from '../config/axios'

export const Driversignup = async (data) => {

    try {
        let respData = await axios({
            'url': '/driver-register',
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


export const driverlogin = async (data) => {

    try {
        let respData = await axios({
            'url': '/driver-login',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'token': respData.data.token,
            'result' : respData.data.result,
        }
    } catch (err) {
        return {
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
