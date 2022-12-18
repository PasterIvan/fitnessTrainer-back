import {ClientType} from "../stateTypes";
import {clientRepository} from "../repositories/client/client-db-repository";
import {randomUUID} from "crypto";

export const clientService = {
    async getAllClients(clientName: string): Promise<ClientType[] | ClientType>{
        return clientRepository.getAllClients(clientName)
    },

    async createClient(clientName: string): Promise<ClientType>{
        const newClient = {clientName: clientName, clientId: randomUUID()}
        return clientRepository.createClient(newClient)
    },

    async getClientById(clientId: string): Promise<ClientType | null>{
        return clientRepository.getClientById(clientId)
    },

    async deleteClient(dateId: string): Promise<boolean>{
        return clientRepository.deleteClient(dateId)
    }
}
