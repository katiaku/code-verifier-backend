import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRETKEY || 'MYSECRETKEY';

/**
 * 
 * @param { Request } req Original request previous middleware of verification JWT
 * @param { Response } res JWT verification response
 * @param { NextFunction } next Next function to be executed
 * @returns Verification error or next execution
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Check HEADER from request for 'x-access-token'
    let token: any = req.headers['x-access-token'];

    // Verify if JWT is present
    if(!token) {
        return res.status(403).send({
            authenticationError: 'Missing JWT in request',
            message: 'Not authorised to consume this endpoint'
        })
    }

    // Verify the token. Pass the secret
    jwt.verify(token, secret, (err: any, decoded: any) => {

        if(err) {
            return res.status(500).send({
            authenticationError: 'JWT verification failed',
            message: 'Failed to verify JWT token in request'
            });
        }

        // Execute next function -> Protected routes will be executed
        next();
    })
}
