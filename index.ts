import express, { Request, Response } from 'express'
import 'dotenv/config'
import 'express-async-errors'
import { connectDB } from './db/connectDB'
import { noRoute } from './middlewares/noRoute'
import { errorMidware } from './middlewares/errorMidware'
import { authRouter } from './routes/authRouter'
import { jobRouter } from './routes/jobRouter'

const app = express()
app.use(express.json())
app.get('/', (req: Request, res: Response) => {
    res.send('hi mom')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobRouter)
app.use(noRoute)
app.use(errorMidware)

const port = Number(process.env.PORT) || 5000

const start = async (uri: string, port: number) => {
    try {
        await connectDB(uri)
        console.log('connected to db')
        app.listen(port, () => { console.log(`server listening at port: ${port}`)})
    } catch (error) {
        console.log(error)
    }
}

start(process.env.MONGO_URI as string, port)
