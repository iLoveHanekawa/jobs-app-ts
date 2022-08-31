import { NextFunction, Request, Response } from "express";
import { createCustomError } from "../errors/CustomError";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

declare global {
    namespace Express {
        export interface Request {
            //properties to add
        }
    }
}

export const authMidware = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw createCustomError('No token provided', 400)
    }
    try {
        const token = authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        // add props from decoded to req
    } catch (error) {
        console.log(error)
    }
    next()
}