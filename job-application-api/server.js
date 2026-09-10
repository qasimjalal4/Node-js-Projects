import express from 'express'
import { jobs, applications } from './data/data'
import jobRouter from './routes/jobRoutes'
import applicationRouter from './routes/applicationRoutes'

const app = express()
const PORT = 3000

app.use(express.json())


app.get('/', (req,res) => {
  res.status(200).json({
    success: true,
    message: 'Job Application API is running!'
  })
})


app.use('/api/jobs', jobRouter)

app.use('/api/jobs/:id', jobRouter)

app.use('/api/jobs', jobRouter)

app.use('/api/jobs/:id', jobRouter)

app.use('/api/jobs/:id', jobRouter)



app.use('/api/applications', applicationRouter)

app.use('/api/applications/:id', applicationRouter)

app.use('/api/applications', applicationRouter)

app.use('/api/applications/:id', applicationRouter)

app.use('/api/applications/:id', applicationRouter)



app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})