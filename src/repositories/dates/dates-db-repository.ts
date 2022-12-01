import {clientCollection} from "../db";
import {DeleteResult} from "mongodb";

export const datesRepository = {
    async getAllDates(): Promise<any>{
        return await clientCollection.find({}).toArray()
    },

    async createDate(newClient: any): Promise<any>{
        const result = await clientCollection.insertOne(newClient)
        return newClient
    },

    async getDatesById(clientId: string): Promise<any | null>{
        const client: any | null = await clientCollection.findOne({clientId})
        if (client){
            return client
        } return null
    },

    async deleteDates(clientId: string): Promise<boolean>{
        const result: DeleteResult = await clientCollection.deleteOne({clientId})
        return result.deletedCount === 1
    }
}
