import {Request, Response, Router} from "express";
import {ExerciseType, TrainingType, TrainingTypeWithFront} from "../stateTypes";
import {trainingService} from "../domain/training-service";
import {trainingQueryRepository} from "../repositories/trainingSession/trainingQuery-db-repository";
import {exerciseService} from "../domain/exercise-service";
import {exerciseRepository} from "../repositories/exercise/exercise-db-repository";

export const exerciseRouter = Router()

exerciseRouter.post('/', async (req: Request, res: Response) => {

    const exercise: ExerciseType = await exerciseService.createExercise(req.body.data.exerciseName)

    const trainingId = req.body.data.trainingId
    const exerciseId = exercise.exerciseId
    const isNewTrainingWithExercise: boolean = await trainingService.writeExercise(trainingId, exerciseId)
    if (isNewTrainingWithExercise){
        const Training: TrainingTypeWithFront | null = await trainingQueryRepository.getTraining(trainingId)
        res.status(201).send(Training)
    } else {
        res.send(404)
    }
})
exerciseRouter.put('/:exerciseId', async (req: Request, res: Response) => {
    const trainingId = req.body.data.trainingId
    const exerciseId = req.params.exerciseId

    const isNewExerciseStatus: boolean = await exerciseRepository.changeStatus(exerciseId)

    if (isNewExerciseStatus){
        const Training: TrainingType | null = await trainingQueryRepository.getTraining(trainingId)
        res.status(201).send(Training)
    } else {
        res.send(404)
    }
})
