export type DateType = {
    dateId: string
    timesId: string[]
}
export type TimeType = {
    timeId: string
    timeTitle: string
    dateId?: string
    client?: ClientType
    training?: TrainingType
}
export type ClientType = {
    clientId: string
    clientName: string
}

export type TrainingType = {
    trainingId: string;
    trainingTitle: string;
    trainingDescription?: string;
    exercises?: ExerciseType[];
}
export type ExerciseType = {
    exerciseId: string
    exerciseName: string
    exerciseDescription: string
}

