import {Request, Response, Router} from "express";
import {TimeType, TimeTypeWithFront} from "../stateTypes";
import {timesService} from "../domain/times-service";
import {timesQeryRepository} from "../repositories/times/timesQery-db-repository";

export const timesRouter = Router()

timesRouter.get('/', async (req: Request, res: Response) => {
    const allTimes: TimeTypeWithFront[] = await timesQeryRepository.getTimes(req.query.dateId as string)
    allTimes.length === 0
        ? res.send(await timesService.createTimes(req.query.dateId as string))
        : res.send(allTimes)
})
timesRouter.get('/:timeId', async (req: Request, res: Response) => {
    const time: TimeType | null = await timesQeryRepository.getTime(req.params.timeId)
    time ? res.send(time) : res.send(404)
})
// timesRouter.put('/', async (req: Request, res: Response) => {
//     const isNewTime: boolean = await timesService.writeClient(req.body.params.timeId, req.body.params.clientId)
//     if (isNewTime){
//         const allTimes: TimeType[] = await timesService.getAllTimes(req.body.params.dateId)
//         res.status(201).send(allTimes)
//     } else {
//         res.send(404)
//     }
// })
timesRouter.put('/', async (req: Request, res: Response) => {
    const timeId = req.body.data.timeId
    const clientId =req.body.data.clientId
    // const trainingId =req.body.data.trainingId
    const dateId = req.body.data.dateId

    const isNewTimeWithClient: boolean = await timesService.writeClient(timeId, clientId)
    // const isNewTimeWithTraining: boolean = await timesService.writeTraining(timeId, trainingId)

    if (isNewTimeWithClient){
        const allTimes: TimeTypeWithFront[] = await timesQeryRepository.getTimes(dateId)
        res.status(201).send(allTimes)
    } else {
        res.send(404)
    }
})
timesRouter.delete('/timeId', async (req: Request, res: Response) => {
    const isDeletedTime: boolean = await timesService.deleteTime(req.params.timeId)
    isDeletedTime ? res.send(204) : res.send(404)
})
