import {timesRepository} from "../repositories/times/times-db-repository";
import {TimeType} from "../stateTypes";

export const timesService = {
    async getAllTimes(): Promise<TimeType[]>{
        return timesRepository.getAllTimes()
    },
    async getTime(timeId: string): Promise<TimeType | null> {
        return timesRepository.getTime(timeId)
    },
    async createTime( timeId: string, timeTitle: string ): Promise<TimeType>{
        const newTime = {timeId, timeTitle}
        return timesRepository.createTime(newTime)
    },
    async updateTimeTitle(timeId: string, newTimeTitle: string): Promise<boolean>{
        return timesRepository.updateTimeTitle(timeId, newTimeTitle)
    },
    async deleteTime(timeId: string): Promise<boolean>{
        return timesRepository.deleteTime(timeId)
    },
}
