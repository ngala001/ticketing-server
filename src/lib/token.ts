import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const jwt_secret = process.env.JWT_SECRET_KEY!


export const signToken = (userId: string) => {
 

 return jwt.sign({userId}, jwt_secret, {expiresIn: '1d'});
}