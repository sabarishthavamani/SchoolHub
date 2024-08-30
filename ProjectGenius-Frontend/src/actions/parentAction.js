import axios from '../config/axios'

export const parentsignup = async (data) => {

    try {
        let respData = await axios({
            'url': '/parent-register',
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
export const parentlogin = async (data) => {

    try {
        let respData = await axios({
            'url': '/parent-login',
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

export const parentchangepassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/parent-changepassword',
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


export const parentforgetpassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/parent-forgetpassword',
            'method': 'post',
             'data' : data,
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
export const parentresetpassword = async (data) => {

    try {
        let respData = await axios({
            'url': '/parent-resetpassword',
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