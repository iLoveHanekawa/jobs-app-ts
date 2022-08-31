"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMidware = void 0;
const CustomError_1 = require("../errors/CustomError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authMidware = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        throw (0, CustomError_1.createCustomError)('No token provided', 400);
    }
    try {
        const token = authorization.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // add props from decoded to req
    }
    catch (error) {
        console.log(error);
    }
    next();
};
exports.authMidware = authMidware;
