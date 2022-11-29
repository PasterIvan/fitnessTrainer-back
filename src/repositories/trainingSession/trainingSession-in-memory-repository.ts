import {trainingSessions} from "../../state";
import {TrainingType} from "../../stateTypes";

export const trainingSessionRepository = {
    async getAllTrainingSessions():Promise<TrainingType[]>{
        return trainingSessions
    },
}
