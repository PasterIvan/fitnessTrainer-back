import {MongoClient} from "mongodb";
import {ClientType, DateType, ExerciseType, TimeType, TrainingType} from "../stateTypes";

const mongoUri = "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoUri)

const db = client.db('fitnessTrainer')
export const dateCollection = db.collection<DateType>('date')
export const timeCollection = db.collection<TimeType>('time')
export const trainingCollection = db.collection<TrainingType>('training')
export const clientCollection = db.collection<ClientType>('client')
export const exerciseCollection = db.collection<ExerciseType>('exercise')

export async function runDb (){
    try{
        await client.connect()
        await client.db('fitnessTrainer')
    } catch {
        await client.close()
    }
}
