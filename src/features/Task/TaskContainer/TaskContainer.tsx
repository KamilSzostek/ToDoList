import { FC, ReactElement } from 'react';
import styles from './TaskContainer.module.scss'

interface ITaskContainerProps {
    children: ReactElement
    title?: string
}

const TaskContainer: FC<ITaskContainerProps> = ({children, title}) => {
    return (
        <div className={styles.taskContainer}>
            {title ? (<h2 className={styles.taskTitle}>{title}</h2>) : null}
            {children}
        </div>
    );
};

export default TaskContainer;
