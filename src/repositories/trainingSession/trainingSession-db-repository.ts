import {TrainingType} from "../../stateTypes";
import {trainingSessionCollection} from "../db";

export const trainingSessionRepository = {
    async getAllTrainingSessions():Promise<TrainingType[]>{
        return await trainingSessionCollection.find({}).toArray()
    },
}
