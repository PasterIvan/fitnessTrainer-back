import {DateType} from "../stateTypes";
import {clientRepository} from "../repositories/client/client-db-repository";

export const clientService = {
    async getAllClients(): Promise<DateType[]>{
        return clientRepository.getAllClients()
    },

    async createClient(clientId: string): Promise<any>{
        const newClient = {clientId: clientId}
        return clientRepository.createClient(newClient)
    },

    async getClientById(clientId: string): Promise<any | null>{
        return clientRepository.getClientById(clientId)
    },

    async deleteClient(dateId: string): Promise<boolean>{
        return clientRepository.deleteClient(dateId)
    }
}
