import {trainingRepository} from "../repositories/trainingSession/training-db-repository";
import {TrainingType} from "../stateTypes";
import {randomUUID} from "crypto";

export const trainingService = {
    async getTrainingById(trainingId: string):Promise<TrainingType[]>{
        return  trainingRepository.getTrainingById(trainingId)
    },
    async createTraining(trainingTitle: string): Promise<TrainingType>{
        const newTraining: TrainingType = {trainingTitle: trainingTitle, trainingId: randomUUID()}
        return trainingRepository.createTraining(newTraining)
    },
}
