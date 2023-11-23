import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ITask } from '@/interfaces/interfaces';
import { StoreContext } from '@/store/StoreProvider';
import styles from './TaskButton.module.scss'

interface ITaskButtonProps {
    task: ITask
    asHeader?: boolean
    taskId?: string
}

const TaskButton: FC<ITaskButtonProps> = ({ task, asHeader, taskId }) => {
    const { tasks, setTaskshandler } = useContext(StoreContext)
    const setTaskDone = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isDone: true } : mappedTask)))
    const setTaskDeleted = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isDeleted: true } : mappedTask)))
    const setTaskExpanded = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isExpanded: !mappedTask.isExpanded } : mappedTask)))
    const setSubTaskDone = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === taskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, isDone: true } : subTask)) } : mappedTask)))
    const setSubTaskDeleted = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === taskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, isDeleted: true } : subTask)) } : mappedTask)))
    const setSubTaskExpanded = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === taskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, isExpanded: !subTask.isExpanded } : subTask)) } : mappedTask)))

    const taskButtonStyle = `d-flex justify-content-between align-item-center ${styles.taskButton} ${task.isDone ? styles.taskDone : ''} ${asHeader ? styles.headerTask : ''} ${taskId ? styles.subTask : ''}`
    return (
        <>
            <div className={taskButtonStyle}>
                {task.isDone && <FontAwesomeIcon icon={faCircleCheck} />}
                <span>{task.name}</span>
                {!task.isDone && <div>
                    <button onClick={taskId ? setSubTaskDone : setTaskDone}><FontAwesomeIcon icon={faCheck} /></button>
                    <button onClick={taskId ? setSubTaskDeleted : setTaskDeleted}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>}
                <button onClick={taskId ? setSubTaskExpanded : setTaskExpanded}><FontAwesomeIcon className={task.isExpanded ? styles.turn : ''} icon={faChevronDown} /></button>
            </div>
            {taskId && task.isExpanded && <p className={styles.subTaskDescription}>{(!task.description || task.description?.trim() === '') ? 'Podzadanie nie posiada opisu.' : task.description}</p>}
        </>
    );
};

export default TaskButton;
