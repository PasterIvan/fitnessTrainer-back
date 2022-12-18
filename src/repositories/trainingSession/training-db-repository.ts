import {TrainingType} from "../../stateTypes";
import {trainingCollection} from "../db";

export const trainingRepository = {
    async getTrainingById(trainingId: string):Promise<TrainingType[]>{
        return await trainingCollection.find({trainingId}).toArray()
    },
    async createTraining(newTraining: TrainingType): Promise<TrainingType>{
        const result = await trainingCollection.insertOne(newTraining)
        return newTraining
    },

}
