import {ExerciseStatuses, ExerciseType} from "../../stateTypes";
import {exerciseCollection} from "../db";
import {UpdateResult} from "mongodb";

export const exerciseRepository = {
    async getExerciseById(exerciseId: string): Promise<ExerciseType | null> {
        return await exerciseCollection.findOne({exerciseId})
    },
    async creatExercise(newExercise: ExerciseType): Promise<ExerciseType>{
        const result = await exerciseCollection.insertOne(newExercise)
        return newExercise
    },
    async changeStatus(exerciseId: string): Promise<boolean>{

        const exercise: ExerciseType | null  = await exerciseCollection.findOne({exerciseId})
        const isDone: ExerciseStatuses | undefined = exercise?.isDone
        if (isDone === ExerciseStatuses.New) {
            const result: UpdateResult = await exerciseCollection.updateOne(
                {exerciseId},
                {$set: {isDone: ExerciseStatuses.Completed}})
            return result.matchedCount === 1
        } else {
            const result: UpdateResult = await exerciseCollection.updateOne(
                {exerciseId},
                {$set: {isDone: ExerciseStatuses.New}})
            return result.matchedCount === 1
        }
    },
    // async writeTraining(timeId: string, trainingId: string): Promise<boolean>{
    //     const result: UpdateResult = await timeCollection.updateOne(
    //         {timeId},
    //         { $set: {trainingId: trainingId}})
    //     return result.matchedCount === 1
    // },
    // async updateTime(timeId: string, newTimeTitle: string): Promise<boolean>{
    //     const result: UpdateResult = await timeCollection.updateOne({timeId},{ $set: {timeTitle: newTimeTitle}})
    //     return result.matchedCount === 1
    // },
    // async deleteTime(timeId: string): Promise<boolean>{
    //     const result: DeleteResult = await timeCollection.deleteOne({timeId})
    //     return result.deletedCount === 1
    // },
}
