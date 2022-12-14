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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("express-async-errors");
const connectDB_1 = require("./db/connectDB");
const noRoute_1 = require("./middlewares/noRoute");
const errorMidware_1 = require("./middlewares/errorMidware");
const authRouter_1 = require("./routes/authRouter");
const jobRouter_1 = require("./routes/jobRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('hi mom');
});
app.use('/api/v1/auth', authRouter_1.authRouter);
app.use('/api/v1/jobs', jobRouter_1.jobRouter);
app.use(noRoute_1.noRoute);
app.use(errorMidware_1.errorMidware);
const port = Number(process.env.PORT) || 5000;
const start = (uri, port) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.connectDB)(uri);
        console.log('connected to db');
        app.listen(port, () => { console.log(`server listening at port: ${port}`); });
    }
    catch (error) {
        console.log(error);
    }
});
start(process.env.MONGO_URI, port);
