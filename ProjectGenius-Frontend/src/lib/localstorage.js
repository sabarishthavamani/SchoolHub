const getAuthToken = () => {
    return localStorage.getItem('USER_TOKEN')
}

export const setAuthToken = (token) => {
    return localStorage.setItem('USER_TOKEN', token)
}

export const removeAuthToken = () => {
    return localStorage.removeItem('USER_TOKEN')
}

export default getAuthToken;