import {timesRepository} from "../repositories/times/times-db-repository";
import {TimeType, TimeTypeWithFront} from "../stateTypes";
import {timesQueryRepository} from "../repositories/times/timesQuery-db-repository";

export const timesService = {
    async getAllTimes(dateId: string ): Promise<TimeTypeWithFront[]>{
        return timesQueryRepository.getTimes(dateId)
    },
    async getTime(timeId: string): Promise<TimeType | null> {
        return timesRepository.getTime(timeId)
    },
    async createTime( timeId: string, timeTitle: string, dateId: string): Promise<TimeType>{
        const newTime = {timeId, timeTitle, dateId}
        return timesRepository.createTime(newTime)
    },
    async writeClient( timeId: string, clientId: string): Promise<boolean>{

        return timesRepository.writeClient(timeId, clientId)
    },
    async writeTraining( timeId: string, trainingId: string): Promise<boolean>{
        return timesRepository.writeTraining(timeId, trainingId)
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
