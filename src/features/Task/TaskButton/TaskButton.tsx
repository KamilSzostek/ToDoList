import { FC, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { ITask } from '@/interfaces/interfaces';
import { StoreContext } from '@/store/StoreProvider';
import Modal from '@/components/Modal/Modal';
import DescriptionChanger from '@/components/DecriptionChanger/DescriptionChanger';
import styles from './TaskButton.module.scss'

interface ITaskButtonProps {
    task: ITask
    asHeader?: boolean
    taskId?: string
}

const TaskButton: FC<ITaskButtonProps> = ({ task, asHeader, taskId }) => {
    const { tasks, setTaskshandler } = useContext(StoreContext)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('')
    const closeModal = () => setShowModal(false)
    const startDate = new Date(task.dateTimeStart).toLocaleDateString()
    const startDateTime = new Date(task.dateTimeStart).toLocaleString()
    function openModal(type: string) {
        setModalType(type)
        setShowModal(true)
    }
    const setTaskDone = () => { tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isDone: true, dateTimeEnd: Date.now() } : mappedTask))); setShowModal(false) }
    const setTaskDeleted = () => { tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, isDeleted: true } : mappedTask))); setShowModal(false) }
    const setTaskExpanded = () => {
        tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === task._id ? { ...mappedTask, expandTime: mappedTask.isExpanded === false ? Date.now() : 0, isExpanded: !mappedTask.isExpanded} : mappedTask)))
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    const setSubTaskDone = () => { tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === taskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, isDone: true, dateTimeEnd: Date.now() } : subTask)) } : mappedTask))); setShowModal(false) }
    const setSubTaskDeleted = () => { tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === taskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, isDeleted: true } : subTask)) } : mappedTask))); setShowModal(false) }
    const setSubTaskExpanded = () => tasks && setTaskshandler && setTaskshandler(tasks.map(mappedTask => (mappedTask._id === taskId ? { ...mappedTask, subTasks: mappedTask.subTasks?.map(subTask => (subTask._id === task._id ? { ...subTask, isExpanded: !subTask.isExpanded } : subTask)) } : mappedTask)))

    const taskButtonStyle = `d-flex justify-content-between align-item-center ${styles.taskButton} ${task.isDone ? styles.taskDone : ''} ${asHeader ? styles.headerTask : ''} ${taskId ? styles.subTask : ''}`
    return (
        <>
            <div className={taskButtonStyle}>
                {task.isDone && <FontAwesomeIcon icon={faCircleCheck} />}
                <div className='w-50 d-flex flex-column'>
                    {!task.isDone && <abbr title={`Data rozpoczęcia: ${startDateTime}`}><time className={styles.taskDate} dateTime={startDateTime}>{startDate}</time></abbr>}
                    <abbr className={styles.taskName} title={task.name.length > 15 ? task.name : undefined}><span>{task.name.length > 15 ? `${task.name.substring(0, 12)}...` : task.name}</span></abbr>
                </div>
                {!task.isDone && <div>
                    <button onClick={() => openModal('done')}><FontAwesomeIcon icon={faCheck} /></button>
                    <button onClick={() => openModal('delete')}><FontAwesomeIcon icon={faTrashAlt} /></button>
                </div>}
                <button onClick={taskId ? setSubTaskExpanded : setTaskExpanded}><FontAwesomeIcon className={task.isExpanded ? `${styles.turn} ${styles.icon}` : styles.icon} icon={faChevronUp} /></button>
            </div>
            {taskId && task.isExpanded && <DescriptionChanger task={task} mainTaskId={taskId} />}
            {showModal && <Modal showModal={showModal} closeModal={closeModal}>
                <div className={styles.modal}>
                    <h2>{task.name}</h2>
                    {modalType === 'done' && <p>Napewno zakończyć zadanie?</p>}
                    {modalType === 'delete' && <p>Czy napewno usunąć zadanie?</p>}
                    <div className='d-flex justify-content-evenly'>
                        {modalType === 'done' && <button className='ps-5 pe-5 btn btn-success fs-4' onClick={taskId ? setSubTaskDone : setTaskDone}>Tak</button>}
                        {modalType === 'delete' && <button className='ps-5 pe-5 btn btn-danger fs-4' onClick={taskId ? setSubTaskDeleted : setTaskDeleted}>Tak</button>}
                        <button className='ps-5 pe-5 btn btn-outline-secondary fs-4' onClick={() => setShowModal(false)}>Anuluj</button>
                    </div>
                </div>
            </Modal>}
        </>
    );
};

export default TaskButton;
