import {Request, Response, Router} from "express";
import {TimeType, TrainingType} from "../stateTypes";
import {trainingService} from "../domain/training-service";
import {timesService} from "../domain/times-service";

export const trainingRouter = Router()

trainingRouter.get('/', async (req: Request, res: Response) => {
    const allTrainingSessions: TrainingType[] = await trainingService.getTrainingById(req.query.trainingId as string)
    res.send(allTrainingSessions)
})
trainingRouter.post('/', async (req: Request, res: Response) => {
    const training: TrainingType = await trainingService.createTraining(req.body.data.trainingTitle)

    const dateId = req.body.data.dateId
    const timeId = req.body.data.timeId
    const trainingId = training.trainingId
    const isNewTimeWithTraining: boolean = await timesService.writeTraining(timeId, trainingId)

    if (isNewTimeWithTraining){
        const allTimes: TimeType[] = await timesService.getAllTimes(dateId)
        res.status(201).send(allTimes)
    } else {
        res.send(404)
    }
})
