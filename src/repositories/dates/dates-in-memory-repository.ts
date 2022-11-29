import {dates} from "../../state";
import {DateType} from "../../stateTypes";

export const datesRepository = {
    async getAllDates(): Promise<DateType[]>{
         return dates
    },
    async createDate(dateId: string): Promise<DateType>{
        const newDate = {dateId: dateId}
        dates.push(newDate)
        return newDate
    },
    async getDatesById(dateId: string): Promise<DateType | undefined>{
        return dates.find(d=>d.dateId===dateId)
    },
    async deleteDates(dateId: string): Promise<boolean>{
        for( let i=0; i < dates.length; i++ ){
            if (dates[i].dateId === dateId){
                dates.splice(i,1)
                return true
            }
        }
        return false
    }
}
