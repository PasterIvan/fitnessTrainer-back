import {trainingSessionRepository} from "../repositories/trainingSession/trainingSession-db-repository";
import {TrainingType} from "../stateTypes";

export const trainingSessionService = {
    async getAllTrainingSessions():Promise<TrainingType[]>{
        return  trainingSessionRepository.getAllTrainingSessions()
    },
}
