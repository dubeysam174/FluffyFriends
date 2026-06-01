import jwt from 'jsonwebtoken'

const generateToken = (id)=>{
    return jwt.sign(
        {id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.GENERATE_TOKEN_EXPIRY}
        
    )
}


export default generateToken