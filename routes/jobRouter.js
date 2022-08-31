"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.jobRouter = express_1.default.Router();
const jobController_1 = require("../controllers/jobController");
exports.jobRouter.route('/').post(jobController_1.createJob).get(jobController_1.getAllJobs);
exports.jobRouter.route('/:id').get(jobController_1.getJob).delete(jobController_1.deleteJob).patch(jobController_1.updateJob);
