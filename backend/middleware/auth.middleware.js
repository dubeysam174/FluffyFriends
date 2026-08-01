import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import { asyncHandler } from '../utils/asyncHandler.js'



// protected routes.... for accessing you need to access or login...

export const protect = asyncHandler(async(req,res,next)=>{
    console.log('headers:', req.headers)           // see all headers
  console.log('auth header:', req.headers.authorization)
    let token

    // check if token in auth header...
    if(req.headers.authorization?.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    console.log('token extracted:', token)  // see if token is extracted

    // when no token found...
    if(!token){
        res.status(401)
        throw new Error('not authorized , no token')


    }

    // verify token 
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    //attach user to request...
    req.user = await User.findById(decoded.id).select('-password')


    if(!req.user){
        res.status(401)
        throw new Error('User not found')

    }

    next()
})



// vet only....
export const vetOnly = (req, res, next) => {
    if (req.user?.role !== 'vet') {
        res.status(403)
        throw new Error('Access denied, vets only')
    }
    next()
}

// pet owner only...
export const petOwnerOnly=(req,res,next)=>{
    if(req.user?.role!=='petOwner'){
        res.status(403)
        throw new Error('Access denied,pet owners only')
    }
    console.log("Decoded Token:", decoded);
console.log("User from DB:", req.user);
console.log("User Role:", req.user?.role);
    next()
}