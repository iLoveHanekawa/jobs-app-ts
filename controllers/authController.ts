import { Request, Response } from "express";
import { createCustomError } from "../errors/CustomError";
import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const register = async (req: Request, res: Response) => {

    const { name, email, password } = req.body
    if(!name || !email || !password) {
        throw createCustomError('All fields are required', 400)
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)

    const tempUser = { name, email, password: hashPass }

    const user = await User.create({ ...tempUser })
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET as string)

    res.status(201).json({ user: user.name, token })
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    if(!email || !password) {
        throw createCustomError('All fields are required', 400)
 
    }
    const user = await User.findOne({ email })
    if(!user) {
        throw createCustomError('Unauthorized', 401)
    }

    const isMatch = bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw createCustomError('Unauthorized', 401)
    }
    
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET as string)
    res.status(200).json({ user: user.name, token})
}