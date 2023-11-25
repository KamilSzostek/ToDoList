import React, { createContext, FC, useState, useEffect } from "react";
import { ITask } from "@/interfaces/interfaces";

interface Props {
    children?: React.ReactNode;
}

export interface IStoreContext {
    login: string,
    setLoginHandler: (newLogin: string) => void
    tasks: ITask[]
    setTaskshandler: (newTasks: ITask[]) => void
}

export const StoreContext = createContext<Partial<IStoreContext>>({});

const StoreProvider: FC<Props> = ({ children }) => {
    const [login, setLogin] = useState('')
    const [tasks, setTasks] = useState<ITask[]>([])
    const setTaskshandler = (newTasks: ITask[]) => setTasks(newTasks)
    const setLoginHandler = (newLogin: string) => setLogin(newLogin)
    useEffect(() => {
        
    },[])
    useEffect(() => {
        fetch(`/api/users/${login}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tasks })
        })
    }, [tasks])
    const context = {
        setLoginHandler,
        tasks,
        setTaskshandler
    }
    return <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
};

export default StoreProvider;