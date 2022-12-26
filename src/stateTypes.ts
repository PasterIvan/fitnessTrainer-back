export type DateType = {
    dateId: string
    timesId: string[]
}
export type TimeType = {
    timeId: string
    timeTitle: string
    dateId: string
    clientId?: string
    trainingId?: string
}
export type TimeTypeWithFront = {
    timeId: string
    timeTitle: string
    dateId: string
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
    exercisesId?: string[];
}
export type TrainingTypeWithFront = {
    trainingId: string;
    trainingTitle: string;
    trainingDescription?: string;
    exercises?: ExerciseType[];
}
export type ExerciseType = {
    exerciseId: string;
    exerciseName: string;
    exerciseDescription?: string;
    isDone: ExerciseStatuses;
}
export enum ExerciseStatuses {
    New,
    InProgress,
    Completed,
    Draft,
}



