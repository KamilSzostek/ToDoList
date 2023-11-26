import { FC, useState } from 'react';
import TaskContainer from '../TaskContainer/TaskContainer';
import { ITask } from '@/interfaces/interfaces';
import TaskButton from '../TaskButton/TaskButton';
import BaseButton from '@/components/BaseButton/BaseButton';
import AddTaskAlgorithm from '../AddTaskAlgorithm/AddTaskAlgorithm';
import { faList } from '@fortawesome/free-solid-svg-icons';
import AddTask from '../AddTask/AddTask';
import DescriptionChanger from '@/components/DecriptionChanger/DescriptionChanger';
import styles from './Task.module.scss'


interface ITaskProps {
    task: ITask
    isSubTask?: boolean
}

const Task: FC<ITaskProps> = ({ task, isSubTask }) => {
    const [showAddSubTask, setShowAddSubTask] = useState(false)
    const [showAlgorihtm, setShowAlgorithm] = useState(false)
    const showAddSubTaskHandler = () => setShowAddSubTask(!showAddSubTask)
    function countTaskTime(start: number, end: number) {
        const time = (end - start) / 1000
        const hours = time > 3600 && Math.round(time/3600)
        const minutes = time > 60 && Math.round(time%3600/60)
        const seconds = Math.round(time%3600%60)
        return `${hours ? hours + 'g' : ''} ${minutes ? minutes + 'm' : ''} ${seconds !== 0 && seconds + 's'}`
    }
    const subTaskList = task.subTasks && task.subTasks.filter(subtask => subtask.isDeleted === false).map(subtask => (<TaskButton key={subtask._id} task={subtask} taskId={task._id} />))
    return (
        <TaskContainer>
            <>
                <TaskButton task={task} asHeader />
                {task.isDone && <div className={styles.taskTime}>
                    <span>{new Date(task.dateTimeStart).toLocaleString()} - {new Date(task.dateTimeEnd!).toLocaleString()}</span>
                    <br/>
                    {task.dateTimeEnd && <span>Czas trwania zadania: {countTaskTime(task.dateTimeStart, task.dateTimeEnd)}</span>}
                </div>}
                <div className='w-100 d-flex align-items-center justify-content-center gap-2 mt-3 me-3'>
                    {!task.isDone && < BaseButton specialClass='fs-4' text={showAddSubTask ? 'Zamknij podzadanie' : 'Dodaj podzadanie'} onClick={() => setShowAddSubTask(!showAddSubTask)} isDark isDisabled={showAlgorihtm ? true : false} />}
                    {task.isDone || !isSubTask && <BaseButton specialClass='fs-4' text={!showAlgorihtm ? (task.algorithm ? 'Pokaż algorytm' : 'Dodaj algorytm') : 'Ukryj algorytm'} icon={faList} onClick={() => setShowAlgorithm(!showAlgorihtm)} isDisabled={showAddSubTask ? true : false} />}
                </div>
                {showAddSubTask && <AddTask taskId={task._id} showHandler={showAddSubTaskHandler} />}
                {showAlgorihtm && <AddTaskAlgorithm task={task} />}
                <DescriptionChanger task={task} />
                {!task.isDone && <div className='d-flex flex-column align-items-center justify-content-center mt-5 mb-5'>
                    {subTaskList}
                </div>}
            </>
        </TaskContainer>);
};

export default Task;
