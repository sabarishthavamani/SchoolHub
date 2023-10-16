import axios  from '../config/axios'

export const login = async (data) => {

    try {
        let respData = await axios({
            'url': '/login',
            'method': 'post',
            data
        })
        return {
            'status': respData.data.status,
            'message': respData.data.message,
            'token' : respData.data.token
        }
    } catch (err) {
        return{
            'status': err.response.data.status,
            'message': err.response.data.message,
            'errors': err.response.data.errors
        }
    }
}
export const verify = async (data) => {

    try {
        let respData = await axios({
            'url': '/verification',
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
export const Reverify = async () => {

    try {
        let respData = await axios({
            'url': '/re-verification',
            'method': 'get',
           
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
export const registerStudent = async (formData) => {

    try {
        let respData = await axios({
            'url': '/admission',
            'method': 'post',
            'data':formData
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