import React from 'react'
import { Navigate } from 'react-router-dom'

// import lib
import isLogin from '../lib/isLogin';

const ConditionRoute = (props) => {
    const {type, children } = props;
       console.log(children, 'children')
     if (type === 'private' && isLogin()=== false ) {
        return <Navigate to='/login' />
    }
    if (type === 'private2' && isLogin()=== false ) {
        return <Navigate to='/teacher-login' />
    }
    return children;
}

export default ConditionRoute;