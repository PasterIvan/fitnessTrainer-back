import {ClientType, TimeType, TrainingType} from "../../stateTypes";
import {timeCollection} from "../db";
import {DeleteResult, UpdateResult} from "mongodb";
import {randomUUID} from "crypto";

export const timesRepository = {

    async getTime(timeId: string): Promise<TimeType | null> {
        return await timeCollection.findOne({timeId})
    },
    async createTime( newTime: TimeType ): Promise<TimeType>{
        const result = await timeCollection.insertOne(newTime)
        return newTime
    },
    async createTimes(dateId:string | undefined): Promise<TimeType[]>{
        if (dateId){
            const res = await timeCollection.find({dateId}).toArray()
            if (res.length !== 0) {
                return res
            } else {
                await timeCollection.insertMany([
                    {
                        timeId : randomUUID(),
                        timeTitle : "7:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "8:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "9:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "10:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "11:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "12:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "13:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "14:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "15:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "16:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "17:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "18:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "19:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "20:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "21:00",
                        dateId : dateId
                    },{
                        timeId : randomUUID(),
                        timeTitle : "22:00",
                        dateId : dateId
                    },
                ])
                return await timeCollection.find({dateId}).toArray()
            }
        }
        return await timeCollection.find({}).toArray()
    },
    async writeClient(timeId: string, client: ClientType): Promise<boolean>{
        const result: UpdateResult = await timeCollection.updateOne(
            {timeId},
            { $set: {client: client}})
        return result.matchedCount === 1
    },
    async writeTraining(timeId: string, training: TrainingType): Promise<boolean>{
        const result: UpdateResult = await timeCollection.updateOne(
            {timeId},
            { $set: {training: training}})
        return result.matchedCount === 1
    },
    async updateTime(timeId: string, newTimeTitle: string): Promise<boolean>{
        const result: UpdateResult = await timeCollection.updateOne({timeId},{ $set: {timeTitle: newTimeTitle}})
        return result.matchedCount === 1
    },
    async deleteTime(timeId: string): Promise<boolean>{
        const result: DeleteResult = await timeCollection.deleteOne({timeId})
        return result.deletedCount === 1
    },
}
