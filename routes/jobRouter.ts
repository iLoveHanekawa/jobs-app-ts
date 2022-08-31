import express from 'express'

export const jobRouter = express.Router()

import { getAllJobs, getJob, createJob, deleteJob, updateJob } from '../controllers/jobController'

jobRouter.route('/').post(createJob).get(getAllJobs)
jobRouter.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)
