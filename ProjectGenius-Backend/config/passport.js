// controller
const { jwtVerify } = require('../controller/teacher.controller');

const passportAuth = (req, res, next) => {
   let decodedDoc = jwtVerify(req.headers.authorization);
   if(decodedDoc && decodedDoc.status === true){
      req.user = { _id : decodedDoc.decoded._id, role : decodedDoc.decoded.role };
      return next()
   }

   return res.status(401).json({ 'status' : false, 'message' : 'Unauthorized user'})
  
}

module.exports = passportAuth;