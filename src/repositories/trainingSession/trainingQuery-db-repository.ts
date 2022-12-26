import {ExerciseType, TrainingType, TrainingTypeWithFront} from "../../stateTypes";
import {exerciseCollection, trainingCollection} from "../db";

export const trainingQueryRepository = {
    async getTraining(trainingId: string): Promise<TrainingTypeWithFront | null> {

        const training: TrainingType | null = await trainingCollection.findOne({trainingId})
        const arrExercisesId = training?.exercisesId

        if (arrExercisesId){
            const exercises: ExerciseType[] = await exerciseCollection.find({exerciseId: {$in: arrExercisesId}}).toArray()
            return {
                trainingId: training.trainingId,
                trainingTitle: training.trainingTitle,
                trainingDescription: training.trainingDescription,
                exercises: exercises,
            }
        } else if (training) {
            return {
                trainingId: training.trainingId,
                trainingTitle: training.trainingTitle,
                trainingDescription: training.trainingDescription,
                // exercises: exercises,
            }
        }
        return null
    }
}
