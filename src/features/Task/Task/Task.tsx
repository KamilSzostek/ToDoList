import { FC, useContext, useRef, useState } from 'react';
import TaskContainer from '../TaskContainer/TaskContainer';
import { ITask } from '@/interfaces/interfaces';
import TaskButton from '../TaskButton/TaskButton';
import BaseButton from '@/components/BaseButton/BaseButton';
import AddTaskAlgorithm from '../AddTaskAlgorithm/AddTaskAlgorithm';
import { faList } from '@fortawesome/free-solid-svg-icons';
import AddTask from '../AddTask/AddTask';
import styles from './Task.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { StoreContext } from '@/store/StoreProvider';

interface ITaskProps {
    task: ITask
    isSubTask?: boolean
}

const Task: FC<ITaskProps> = ({ task, isSubTask }) => {
    const { tasks, setTaskshandler } = useContext(StoreContext)
    const [showAddSubTask, setShowAddSubTask] = useState(false)
    const [showAlgorihtm, setShowAlgorithm] = useState(false)
    const [editDescription, setEditDescription] = useState(false)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const showAddSubTaskHandler = () => setShowAddSubTask(!showAddSubTask)
    const changeDescription = () => {
        if (descriptionRef.current?.value.trim() !== '')
            tasks && setTaskshandler && setTaskshandler(tasks.map(t => (t._id === task._id ? { ...task, description: descriptionRef.current?.value } : t)))
        setEditDescription(false)
    }
    const subTaskList = task.subTasks && task.subTasks.filter(subtask => subtask.isDeleted === false).map(subtask => (<TaskButton key={subtask._id} task={subtask} taskId={task._id} />))
    return (
        <TaskContainer>
            <>
                <TaskButton task={task} asHeader />
                <div className='w-100 d-flex align-items-center justify-content-center gap-2 mt-3 me-3'>
                    {!task.isDone && < BaseButton specialClass='fs-4' text={showAddSubTask ? 'Zamknij podzadanie' : 'Dodaj podzadanie'} onClick={() => setShowAddSubTask(!showAddSubTask)} isDark isDisabled={showAlgorihtm ? true : false}/>}
                    {task.isDone || !isSubTask && <BaseButton specialClass='fs-4' text={!showAlgorihtm ? (task.algorithm ? 'Pokaż algorytm' : 'Dodaj algorytm') : 'Ukryj algorytm'} icon={faList} onClick={() => setShowAlgorithm(!showAlgorihtm)} isDisabled={showAddSubTask ? true : false}/>}
                </div>
                {showAddSubTask && <AddTask taskId={task._id} showHandler={showAddSubTaskHandler} />}
                {showAlgorihtm && <AddTaskAlgorithm task={task} />}
                {!editDescription
                    ? (<p className={`fs-4 text-dark text-center ${styles.taskDescription}`}>{!task.isDone && <button onClick={() => setEditDescription(true)}><FontAwesomeIcon icon={faEdit} /></button>}{task.description ? task.description : 'Brak opisu zadania'}</p>)
                    : (<div className='d-flex flex-column align-items-center'> <textarea name="description" id="description" className={`w-75 pt-3 pb-3 fs-4 text-dark text-center ${styles.taskDescription}`} ref={descriptionRef}>{descriptionRef.current?.value}</textarea>
                        <BaseButton specialClass='w-75 mb-3' text='Zmień opis' onClick={changeDescription} />
                    </div>)}
                {!task.isDone && <div className='d-flex flex-column align-items-center justify-content-center mt-5 mb-5'>
                    {subTaskList}
                </div>}
            </>
        </TaskContainer>);
};

export default Task;
