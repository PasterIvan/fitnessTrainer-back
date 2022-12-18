import express from 'express'
import bodyParser from "body-parser";
import {datesRouter} from "./routes/dates-router";
import {timesRouter} from "./routes/times-router";
import {trainingRouter} from "./routes/training-router";
import {runDb} from "./repositories/db";
import {clientRouter} from "./routes/client-router";

const app = express()
const port = 3000
const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/dates', datesRouter)
app.use('/times', timesRouter)
app.use('/training', trainingRouter)
app.use('/clients', clientRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
