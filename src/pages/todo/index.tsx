import { FC } from 'react';
import { GetServerSideProps } from 'next/types';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import BaseLayout from '@/components/BaseLayout/BaseLayout'
import TaskLayout from '@/features/Task/TaskLayout/TaskLayout'
import NavBar from '@/components/NavBar/NavBar'

interface IToDoProps {
}

const ToDo: FC<IToDoProps> = (props) => {
    return (
        <BaseLayout>
            <>
                <header className='mt-5'>
                    <NavBar userName='User 1' />
                </header>
                <TaskLayout />
            </>
        </BaseLayout>
    );
};

export default ToDo;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const token = await getServerSession(
        req,
        res,
        authOptions
    )
    if (!token) return {
        redirect: {
            destination: '/',
            permament: false
        },
        props: {}
    }
    else return {
        props: {}
    }
}

