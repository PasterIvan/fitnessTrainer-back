import {timesRepository} from "../repositories/times/times-db-repository";
import {TimeType} from "../stateTypes";
import {timesQeryRepository} from "../repositories/qery-db-repository";
import {clientRepository} from "../repositories/client/client-db-repository";
import {trainingRepository} from "../repositories/trainingSession/training-db-repository";

export const timesService = {
    async getAllTimes(dateId: string ): Promise<TimeType[]>{
        return timesQeryRepository.getTimes(dateId)
    },
    async getTime(timeId: string): Promise<TimeType | null> {
        return timesRepository.getTime(timeId)
    },
    async createTime( timeId: string, timeTitle: string, dateId: string): Promise<TimeType>{
        const newTime = {timeId, timeTitle, dateId}
        return timesRepository.createTime(newTime)
    },
    async writeClient( timeId: string, clientId: string): Promise<boolean>{
        const clients = await clientRepository.getAllClientsById(clientId)

        const client = clients[0]
        return timesRepository.writeClient(timeId, client)
    },
    async writeTraining( timeId: string, trainingId: string): Promise<boolean>{
        const trainings = await trainingRepository.getTrainingById(trainingId)

        const training = trainings[0]
        return timesRepository.writeTraining(timeId, training)
    },
    async createTimes(dateId: string): Promise<TimeType[]>{
        return timesRepository.createTimes(dateId)
    },
    async updateTime(timeId: string, newTimeTitle: string): Promise<boolean>{
        return timesRepository.updateTime(timeId, newTimeTitle)
    },
    async deleteTime(timeId: string): Promise<boolean>{
        return timesRepository.deleteTime(timeId)
    },
}
