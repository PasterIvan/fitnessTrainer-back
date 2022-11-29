import {MongoClient} from "mongodb";
import {DateType, TimeType, TrainingType} from "../stateTypes";

const mongoUri = "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoUri)

const db = client.db('fitnessTrainer')
export const dateCollection = db.collection<DateType>('date')
export const timeCollection = db.collection<TimeType>('time')
export const trainingSessionCollection = db.collection<TrainingType>('training-sessions')

export async function runDb (){
    try{
        await client.connect()
        await client.db('fitnessTrainer')
    } catch {
        await client.close()
    }
}
