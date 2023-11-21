import { Timestamp } from "mongodb"
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
    algorithm?: string[]
    isDone: boolean
    isDeleted: boolean
    isExpanded: boolean
    dateTimeStart: string
    dateTimeEnd?: string
}