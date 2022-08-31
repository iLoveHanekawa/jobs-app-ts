"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const CustomError_1 = require("../errors/CustomError");
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw (0, CustomError_1.createCustomError)('All fields are required', 400);
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashPass = yield bcryptjs_1.default.hash(password, salt);
    const tempUser = { name, email, password: hashPass };
    const user = yield User_1.default.create(Object.assign({}, tempUser));
    const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET);
    res.status(201).json({ user: user.name, token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw (0, CustomError_1.createCustomError)('All fields are required', 400);
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw (0, CustomError_1.createCustomError)('Unauthorized', 401);
    }
    const isMatch = bcryptjs_1.default.compare(password, user.password);
    const token = jsonwebtoken_1.default.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET);
    res.status(200).json({ user: user.name, token });
});
exports.login = login;
