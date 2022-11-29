import {DateType} from "../../stateTypes";
import {dateCollection} from "../db";
import {DeleteResult} from "mongodb";


export const datesRepository = {
    async getAllDates(): Promise<DateType[]>{
        return await dateCollection.find({}).toArray()
    },

    async createDate(newDate: DateType): Promise<DateType>{
        const result = await dateCollection.insertOne(newDate)
        return newDate
    },

    async getDatesById(dateId: string): Promise<DateType | null>{
        const date: DateType | null = await dateCollection.findOne({dateId})
        if (date){
            return date
        } return null
    },

    async deleteDates(dateId: string): Promise<boolean>{
        const result: DeleteResult = await dateCollection.deleteOne({dateId})
        return result.deletedCount === 1
    }
}
