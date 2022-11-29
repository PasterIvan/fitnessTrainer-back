import {TimeType} from "../../stateTypes";
import {timeCollection} from "../db";
import {DeleteResult, UpdateResult} from "mongodb";

export const timesRepository = {
    async getAllTimes(): Promise<TimeType[]>{
        return await timeCollection.find({}).toArray()
    },
    async getTime(timeId: string): Promise<TimeType | null> {
        return await timeCollection.findOne({timeId})
    },
    async createTime( newTime: TimeType ): Promise<TimeType>{
        const result = await timeCollection.insertOne(newTime)
        return newTime
    },
    async updateTimeTitle(timeId: string, newTimeTitle: string): Promise<boolean>{
        const result: UpdateResult = await timeCollection.updateOne({timeId},{ $set: {timeTitle: newTimeTitle}})
        return result.matchedCount === 1
    },
    async deleteTime(timeId: string): Promise<boolean>{
        const result: DeleteResult = await timeCollection.deleteOne({timeId})
        return result.deletedCount === 1
    },
}
