import { FC, useContext, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import TaskLayout from '@/features/Task/TaskLayout/TaskLayout'
import NavBar from '@/components/NavBar/NavBar'
import { IUser } from '@/interfaces/interfaces';
import { StoreContext } from '@/store/StoreProvider';
import { getCollectionDB } from '@/helpers/dbConnection';
import { ITask } from '@/interfaces/interfaces';

interface IToDoProps {
    user: IUser
}

const ToDo: FC<IToDoProps> = ({ user }) => {
    const context = useContext(StoreContext)
    useEffect(() => {
        context.setLoginHandler && context.setLoginHandler(user.login)
        context.setTaskshandler && context.setTaskshandler(user.tasks)
    }, [user])
    return (
        <BaseLayout>
            <>
                <header className='mt-5'>
                    <NavBar userName={user.login} />
                </header>
                <TaskLayout />
            </>
        </BaseLayout>
    );
};

export default ToDo;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    // const token = await getServerSession(
    //     req,
    //     res,
    //     authOptions
    // )
    // if (!token) return {
    //     redirect: {
    //         destination: '/',
    //         permament: false
    //     },
    //     props: {}
    // }
    // else {
        const db = await getCollectionDB('ToDoUsers')
        // const user = await db.collection.findOne({ login: token.user?.name })
        const user = await db.collection.findOne({ login: 'Kamil1' })
        return {
            props: {
                user:{
                    _id: user?._id.toString(),
                    login: user?.login,
                    tasks: user?.tasks?.filter((task: ITask) => task.isDeleted === false)
                }
            }
        }
    }
}

