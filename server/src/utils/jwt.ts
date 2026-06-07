import jwt, { SignOptions } from "jsonwebtoken";


const getJWTSecret = () => {

    const secret = process.env.JWT_SECRET;

    if(!secret){
        throw new Error("JWT_SECRET not found");
    }

    return secret;

};


export const generateToken = (
    payload: object,
    expiresIn: SignOptions["expiresIn"] = "1h"
) => {

    return jwt.sign(
        payload,
        getJWTSecret(),
        {
            expiresIn
        }
    );

};


export const verifyToken = (
    token:string
) => {

    return jwt.verify(
        token,
        getJWTSecret()
    );

};