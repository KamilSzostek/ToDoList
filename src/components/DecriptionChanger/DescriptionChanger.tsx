import { FC, useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from '@/store/StoreProvider';
import BaseButton from '../BaseButton/BaseButton';
import { ITask } from '@/interfaces/interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import styles from './DescriptionChanger.module.scss'

interface IDescriptionChangerProps {
    task: ITask
    mainTaskId?: string
    showDescription?: boolean
}

const DescriptionChanger: FC<IDescriptionChangerProps> = ({ task, mainTaskId, showDescription }) => {
    const { tasks, setTaskshandler } = useContext(StoreContext)
    const [editDescription, setEditDescription] = useState(false)
    const descriptionRef = useRef<HTMLTextAreaElement>(null)
    const paragraphRef = useRef<HTMLParagraphElement>(null)
    useEffect(() => {
        if (descriptionRef.current && task.description)
            descriptionRef.current.value = task.description
    }, [editDescription])
    useEffect(()=>{
        mainTaskId && paragraphRef.current?.classList.add(`${styles.moveDown}`)
    }, [task.isExpanded])
    const changeDescription = () => {
        if (descriptionRef.current?.value.trim() !== '') {
            if (tasks && setTaskshandler) {
                mainTaskId ? setTaskshandler(tasks.map(mappedTask => (mappedTask._id === mainTaskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, description: descriptionRef.current?.value } : subTask)) } : mappedTask)))
                    : setTaskshandler(tasks.map(t => (t._id === task._id ? { ...task, description: descriptionRef.current?.value } : t)))
            }
        }
        setEditDescription(false)
    }
    return (
        !editDescription
            ? (
                <p id={task._id} ref={paragraphRef} className={`text-dark text-center ${mainTaskId ? styles.subTask : ''} ${styles.taskDescription} `}>{!task.isDone && <button onClick={() => setEditDescription(true)}><FontAwesomeIcon icon={faEdit} /></button>}{task.description ? task.description : (mainTaskId ? 'Brak opisu podzadania' : 'Brak opisu zadania')}</p>)
            : (<div className='d-flex flex-column align-items-center'> <textarea name="description" id="description" className={`w-75 pt-3 pb-3 fs-4 text-dark text-center ${styles.taskDescription}`} ref={descriptionRef}>{descriptionRef.current?.value}</textarea>
                <BaseButton specialClass='w-75 mb-3' text='Zmień opis' onClick={changeDescription} />
            </div>)
    );
};

export default DescriptionChanger;
