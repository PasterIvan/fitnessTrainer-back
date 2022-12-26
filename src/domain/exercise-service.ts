import {ExerciseStatuses, ExerciseType} from "../stateTypes";
import {randomUUID} from "crypto";
import {exerciseRepository} from "../repositories/exercise/exercise-db-repository";

export const exerciseService = {

    async createExercise(exerciseName: string): Promise<ExerciseType>{
        const newExercise: ExerciseType = {exerciseName: exerciseName, exerciseId: randomUUID(), isDone: ExerciseStatuses.New}
        return exerciseRepository.creatExercise(newExercise)
    },
}
