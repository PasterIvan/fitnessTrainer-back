import {datesRepository} from "../repositories/dates/dates-db-repository";
import {DateType} from "../stateTypes";

export const datesService = {
    async getAllDates(): Promise<DateType[]>{
        return datesRepository.getAllDates()
    },

    async createDate(dateId: string): Promise<DateType>{
        const newDate = {dateId: dateId}
        return datesRepository.createDate(newDate)
    },

    async getDatesById(dateId: string): Promise<DateType | null>{
        return datesRepository.getDatesById(dateId)
    },

    async deleteDates(dateId: string): Promise<boolean>{
        return datesRepository.deleteDates(dateId)
    }
}
