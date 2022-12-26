import {Request, Response, Router} from "express";
import {TimeTypeWithFront, TrainingType, TrainingTypeWithFront} from "../stateTypes";
import {trainingService} from "../domain/training-service";
import {timesService} from "../domain/times-service";
import {timesQueryRepository} from "../repositories/times/timesQuery-db-repository";
import {trainingQueryRepository} from "../repositories/trainingSession/trainingQuery-db-repository";

export const trainingRouter = Router()

trainingRouter.get('/', async (req: Request, res: Response) => {
    const allTrainingSessions: TrainingType[] = await trainingService.getTrainingsById(req.query.trainingId as string)
    res.send(allTrainingSessions)
})

trainingRouter.get('/:trainingId', async (req: Request, res: Response) => {

    const training: TrainingTypeWithFront | null = await trainingQueryRepository.getTraining(req.params.trainingId)

    training ? res.send(training) : res.send(404)
})

trainingRouter.post('/', async (req: Request, res: Response) => {
    const training: TrainingType = await trainingService.createTraining(req.body.data.trainingTitle)

    const dateId = req.body.data.dateId
    const timeId = req.body.data.timeId
    const trainingId = training.trainingId
    const isNewTimeWithTraining: boolean = await timesService.writeTraining(timeId, trainingId)

    if (isNewTimeWithTraining){
        const allTimes: TimeTypeWithFront[] = await timesQueryRepository.getTimes(dateId)
        res.status(201).send(allTimes)
    } else {
        res.send(404)
    }
})
trainingRouter.put('/:trainingId', async (req: Request, res: Response) => {
    const trainingId = req.body.data.trainingId
    const trainingDescription = req.body.data.trainingDescription

    const isNewTrainingDescription: boolean = await trainingService.addTrainingDescription(trainingId, trainingDescription)

    if (isNewTrainingDescription){
        const Training: TrainingType | null = await trainingService.getTrainingById(trainingId)
        res.status(201).send(Training)
    } else {
        res.send(404)
    }
})
