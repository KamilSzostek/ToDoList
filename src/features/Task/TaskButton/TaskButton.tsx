import { FC, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ITask } from '@/interfaces/interfaces';
import { StoreContext } from '@/store/StoreProvider';
import styles from './TaskButton.module.scss'

interface ITaskButtonProps {
    task: ITask
    taskDone?: boolean
}

const TaskButton: FC<ITaskButtonProps> = ({ task, taskDone }) => {
    const { tasks, setTaskshandler } = useContext(StoreContext)
    const setTaskDone = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isDone: true } : mappedTask)))
    const setTaskDeleted = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isDeleted: true } : mappedTask)))
    const setTaskExpanded = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isExpanded: true } : mappedTask)))

    const taskButtonStyle = taskDone ? `d-flex justify-content-between align-item-center ${styles.taskButton} ${styles.taskDone}` : `d-flex justify-content-between align-item-center ${styles.taskButton}`
    return (
        <div className={taskButtonStyle}>
            {taskDone && <FontAwesomeIcon icon={faCircleCheck} />}
            <span>{task.name}</span>
            {!taskDone && <div>
                <button onClick={setTaskDone}><FontAwesomeIcon icon={faCheck} /></button>
                <button onClick={setTaskDeleted}><FontAwesomeIcon icon={faTrashAlt} /></button>
            </div>}
            <button onClick={setTaskExpanded}><FontAwesomeIcon icon={faChevronDown} /></button>
        </div>
    );
};

export default TaskButton;
