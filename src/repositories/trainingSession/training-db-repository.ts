import {TrainingType} from "../../stateTypes";
import {trainingCollection} from "../db";
import {UpdateResult} from "mongodb";

export const trainingRepository = {
    async getTrainingById(trainingId: string):Promise<TrainingType | null>{
        return await trainingCollection.findOne({trainingId})
    },
    async getTrainingsById(trainingId: string):Promise<TrainingType[]>{
        return await trainingCollection.find({trainingId}).toArray()
    },
    async createTraining(newTraining: TrainingType): Promise<TrainingType>{
        const result = await trainingCollection.insertOne(newTraining)
        return newTraining
    },
    async createTrainingDescription(trainingId: string, trainingDescription: string): Promise<boolean>{
        const result: UpdateResult = await trainingCollection.updateOne(
            {trainingId},
            { $set: {trainingDescription: trainingDescription}})
        return result.matchedCount === 1
    },
    async writeExercise(trainingId: string, exerciseId: string): Promise<boolean>{
        const result: UpdateResult = await trainingCollection.updateOne(
            {trainingId},
            { $push: {exercisesId: exerciseId}})
        return result.matchedCount === 1
    },

}
