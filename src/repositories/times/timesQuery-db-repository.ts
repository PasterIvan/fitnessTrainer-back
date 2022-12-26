import {ClientType, TimeType, TimeTypeWithFront, TrainingType} from "../../stateTypes";
import {clientCollection, timeCollection, trainingCollection} from "../db";

export const timesQueryRepository = {
    async getTimes(dateId: string): Promise<TimeTypeWithFront[]> {
        const times: TimeType[] = await timeCollection.find({dateId}).toArray()
        const arrClientID: (string | undefined)[] = times.filter(client => client.clientId).map(client=>client.clientId)
        const arrTrainingID: (string | undefined)[] = times.filter(training => training.trainingId).map(training=>training.trainingId)
        // @ts-ignore
        const clients: ClientType[] = await clientCollection.find({clientId: {$in: arrClientID}}).toArray()
        // @ts-ignore
        const trainings: TrainingType[] = await trainingCollection.find({trainingId: {$in: arrTrainingID}}).toArray()

        return times.map(time => {
            if (time.clientId && time.trainingId) {
                const client = clients.find(client => client.clientId === time.clientId)
                const training = trainings.find(training => training.trainingId === time.trainingId)
                return {
                    dateId: time.dateId,
                    timeId: time.timeId,
                    timeTitle: time.timeTitle,
                    client: {
                        clientId: client!.clientId,
                        clientName: client!.clientName
                    },
                    training: {
                        trainingId: training!.trainingId,
                        trainingTitle: training!.trainingTitle,
                        trainingDescription: training!.trainingDescription,
                    },
                }
            } else if (time.clientId) {
                const client = clients.find(client => client.clientId === time.clientId)

                return {
                    dateId: time.dateId,
                    timeId: time.timeId,
                    timeTitle: time.timeTitle,
                    client: {
                        clientId: client!.clientId,
                        clientName: client!.clientName
                    },
                }
            } else {
                return {
                    dateId: time.dateId,
                    timeId: time.timeId,
                    timeTitle: time.timeTitle,
                }
            }
        })
    },
    async getTime(timeId: string): Promise<TimeTypeWithFront> {
        const time: TimeType | null = await timeCollection.findOne({timeId})
        const client: ClientType | null = await clientCollection.findOne({clientId: time?.clientId})
        const training: TrainingType | null = await trainingCollection.findOne({trainingId: time?.trainingId})

        if (client && training) {
            return {
                dateId: time!.dateId,
                timeId: time!.timeId,
                timeTitle: time!.timeTitle,
                client: {
                    clientId: client!.clientId,
                    clientName: client!.clientName
                },
                training: {
                    trainingId: training!.trainingId,
                    trainingTitle: training!.trainingTitle,
                    trainingDescription: training!.trainingDescription,
                },
            }
        } else if (client) {
            return {
                dateId: time!.dateId,
                timeId: time!.timeId,
                timeTitle: time!.timeTitle,
                client: {
                    clientId: client!.clientId,
                    clientName: client!.clientName
                },
            }
        } else {
            return {
                dateId: time!.dateId,
                timeId: time!.timeId,
                timeTitle: time!.timeTitle,
            }
        }
    }
}
