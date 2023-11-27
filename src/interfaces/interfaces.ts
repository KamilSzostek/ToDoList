import { StaticImageData } from "next/image"

export interface IImage {
    src: StaticImageData
    alt: string
}

export interface IUser{
    _id: string
    login: string
    hash?: string
    tasks: ITask[]
}

export interface ITask{
    _id: string
    name: string
    description?: string
    subTasks?: ISubTask[]
    algorithm?: string[]
    isDone: boolean
    isDeleted: boolean
    isExpanded: boolean
    dateTimeStart: number
    dateTimeEnd?: number
    expandTime?: number
}
export interface ISubTask{
    _id: string
    taskId: string
    name: string
    description?: string
    isDone: boolean
    isDeleted: boolean
    isExpanded: boolean
    dateTimeStart: number
    dateTimeEnd?: number
}