import {trainingRepository} from "../repositories/trainingSession/training-db-repository";
import {TrainingType} from "../stateTypes";
import {randomUUID} from "crypto";

export const trainingService = {
    async getTrainingById(trainingId: string):Promise<TrainingType | null>{
        return  trainingRepository.getTrainingById(trainingId)
    },
    async getTrainingsById(trainingId: string):Promise<TrainingType[]>{
        return  trainingRepository.getTrainingsById(trainingId)
    },
    async createTraining(trainingTitle: string): Promise<TrainingType>{
        const newTraining: TrainingType = {trainingTitle: trainingTitle, trainingId: randomUUID()}
        return trainingRepository.createTraining(newTraining)
    },
    async addTrainingDescription(trainingId: string, trainingDescription: string): Promise<boolean>{
        return trainingRepository.createTrainingDescription(trainingId, trainingDescription)
    },
    async writeExercise(trainingId: string, exerciseId: string): Promise<boolean>{
        return trainingRepository.writeExercise(trainingId, exerciseId)
    },
}
