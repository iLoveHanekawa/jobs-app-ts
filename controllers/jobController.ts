import { Request, Response } from "express";

export const getAllJobs = async (req: Request, res: Response) => {
    res.send('get all jobs')
}

export const getJob = async (req: Request, res: Response) => {
    res.send('get job')
}

export const createJob = async (req: Request, res: Response) => {
    res.send('create job')
}

export const updateJob = async (req: Request, res: Response) => {
    res.send('update job')
}

export const deleteJob = async (req: Request, res: Response) => {
    res.send('job deleted')
}
