import {Request, Response, Router} from "express";
import {TrainingType} from "../stateTypes";
import {trainingSessionService} from "../domain/trainingSession-service";

export const trainingSessionRouter = Router()

trainingSessionRouter.get('/', async (req: Request, res: Response) => {
    const allTrainingSessions: TrainingType[] = await trainingSessionService.getAllTrainingSessions()
    res.send(allTrainingSessions)
})
