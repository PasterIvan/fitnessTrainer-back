import {ClientType} from "../../stateTypes";
import {clientCollection} from "../db";
import {DeleteResult} from "mongodb";

export const clientRepository = {
    async getAllClients(clientName: string): Promise<ClientType[]>{
        if (clientName){
            return await clientCollection.find({clientName:{$regex: clientName}}).toArray()
        }
        return await clientCollection.find({}).toArray()
    },
    async getAllClientsById(clientId: string): Promise<ClientType[]>{

        if (clientId){
            return await clientCollection.find({clientId:{$regex: clientId}}).toArray()
        }
        return await clientCollection.find({}).toArray()
    },

    async createClient(newClient: any): Promise<ClientType>{
        const result = await clientCollection.insertOne(newClient)
        return newClient
    },

    async getClientById(clientId: string): Promise<ClientType | null>{
        const client: ClientType | null = await clientCollection.findOne({clientId})
        if (client){
            return client
        } return null
    },

    async deleteClient(clientId: string): Promise<boolean>{
        const result: DeleteResult = await clientCollection.deleteOne({clientId})
        return result.deletedCount === 1
    }
}
