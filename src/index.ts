import express from 'express'
import bodyParser from "body-parser";
import {datesRouter} from "./routes/dates-router";
import {timesRouter} from "./routes/times-router";
import {trainingSessionRouter} from "./routes/trainingSession-router";
import {runDb} from "./repositories/db";

const app = express()
const port = 3000

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/dates', datesRouter)
app.use('/times', timesRouter)
app.use('/trainingSession', trainingSessionRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()