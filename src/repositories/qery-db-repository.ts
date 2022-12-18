import {ClientType, TimeType, TrainingType} from "../stateTypes";
import {clientCollection, timeCollection, trainingCollection} from "./db";

export const timesQeryRepository = {
    async getTimes(dateId: string): Promise<TimeType[]>{
        const times: TimeType[] = await timeCollection.find({dateId}).toArray()
        const arrClientId = times.map(time=>time.client?.clientId)
        const arrTrainingId = times.map(time=>time.training?.trainingId)
        const clients: ClientType[] = await clientCollection.find({clientId: { $in: arrClientId }}).toArray()
        // @ts-ignore
        const trainings: TrainingType[] = await trainingCollection.find({trainingId: { $in: arrTrainingId }}).toArray()

        return times.map(time=>{
            const client = clients.find(client => client.clientId === time.client?.clientId)
            const training = trainings.find(training => training.trainingId === time.training?.trainingId)
            if (client && training) {
                return {
                    timeId: time.timeId,
                    timeTitle: time.timeTitle,
                    client: {
                        clientId: client.clientId,
                        clientName: client.clientName
                    },
                    training: {
                        trainingId: training.trainingId,
                        trainingTitle: training.trainingTitle,
                    },
                }
            } else if (client) {
                    return {
                        timeId: time.timeId,
                        timeTitle: time.timeTitle,
                        client: {
                            clientId: client.clientId,
                            clientName: client.clientName
                        },
                }
            } else {
                    return {
                        timeId: time.timeId,
                        timeTitle: time.timeTitle,
                    }
                }
        })
    },
}
