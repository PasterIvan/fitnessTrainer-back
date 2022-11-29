import {times} from "../../state";
import {TimeType} from "../../stateTypes";

export const timesRepository = {
    async getAllTimes(): Promise<TimeType[]>{
       return times
    },
    async getTime(timeId: string): Promise<TimeType | undefined> {
        return times.find(t=>t.timeId===timeId)
    },
    async updateTimeTitle(timeId: string, newTimeTitle: string): Promise<boolean>{
        let time = times.find(t=>t.timeId===timeId)
        if(time){
            time.timeTitle = newTimeTitle
            return true
        } return false
    },
}
