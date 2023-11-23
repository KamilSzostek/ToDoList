import { FC, ReactElement } from 'react';
import styles from './TaskContainer.module.scss'

interface ITaskContainerProps {
    children: ReactElement
    title?: string
    isSmaller?: boolean
}

const TaskContainer: FC<ITaskContainerProps> = ({children, title, isSmaller}) => {
    return (
        <div className={`${isSmaller ? styles.isSmaller : ''} ${styles.taskContainer}`}>
            {title ? (<h2 className={styles.taskTitle}>{title}</h2>) : null}
            {children}
        </div>
    );
};

export default TaskContainer;
