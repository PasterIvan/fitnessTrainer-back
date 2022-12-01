import {Request, Response, Router} from "express";
import {TimeType} from "../stateTypes";
import {timesService} from "../domain/times-service";
import {timesRepository} from "../repositories/times/times-db-repository";

export const timesRouter = Router()

timesRouter.get('/', async (req: Request, res: Response) => {
    const allTimes = await timesRepository.getAllTimes(req.query.dateId as string)
    res.send(allTimes)
})
timesRouter.get('/:timeId', async (req: Request, res: Response) => {
    const time: TimeType | null = await timesService.getTime(req.params.timeId)
    time ? res.send(time) : res.send(404)
})
timesRouter.post('/', async (req: Request, res: Response) => {
    const newTime: TimeType = await timesService.createTime(req.body.timeId, req.body.timeTitle, req.body.dateId)
    res.status(201).send(newTime)
})
timesRouter.put('/:timeId', async (req: Request, res: Response) => {
    const isNewTimeTitle: boolean = await timesService.updateTimeTitle(req.params.timeId, req.body.newTimeTitle)
    if (isNewTimeTitle){
        const newTime: TimeType | null = await timesService.getTime(req.params.timeId)
        res.send(newTime)
    } else {
        res.send(404)
    }
})
timesRouter.delete('/:timeId', async (req: Request, res: Response) => {
    const isDeletedTime: boolean = await timesService.deleteTime(req.params.timeId)
    isDeletedTime ? res.send(204) : res.send(404)
})
