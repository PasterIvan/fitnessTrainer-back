import {DateType} from "../../stateTypes";
import {dateCollection} from "../db";
import {DeleteResult} from "mongodb";


export const clientRepository = {
    async getAllClients(): Promise<DateType[]>{
        return await dateCollection.find({}).toArray()
    },

    async createClient(newClient: any): Promise<any>{
        const result = await dateCollection.insertOne(newClient)
        return newClient
    },

    async getClientById(clientId: string): Promise<DateType | null>{
        const client: any | null = await dateCollection.findOne({clientId})
        if (client){
            return client
        } return null
    },

    async deleteClient(clientId: string): Promise<boolean>{
        const result: DeleteResult = await dateCollection.deleteOne({clientId})
        return result.deletedCount === 1
    }
}
