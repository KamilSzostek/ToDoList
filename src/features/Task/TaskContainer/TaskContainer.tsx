import { FC, ReactElement, useEffect, useRef } from 'react';
import styles from './TaskContainer.module.scss'

interface ITaskContainerProps {
    children: ReactElement
    title?: string
    isSmaller?: boolean
}

const TaskContainer: FC<ITaskContainerProps> = ({children, title, isSmaller}) => {
    const containerRef = useRef<HTMLDivElement>(null)
    useEffect(()=>{
        containerRef.current?.classList.add(styles.moveDown)
    },[])
    return (
        <div ref={containerRef} className={`${isSmaller ? styles.isSmaller : ''} ${styles.taskContainer}`}>
            {title ? (<h2 className={styles.taskTitle}>{title}</h2>) : null}
            {children}
        </div>
    );
};

export default TaskContainer;
