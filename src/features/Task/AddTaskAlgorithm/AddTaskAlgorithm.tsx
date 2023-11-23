import { FC, useContext, useEffect, useRef, useState } from 'react';
import TaskContainer from '../TaskContainer/TaskContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import BaseButton from '@/components/BaseButton/BaseButton';
import { ITask } from '@/interfaces/interfaces';
import { StoreContext } from '@/store/StoreProvider';
import styles from './AddTaskAlgorithm.module.scss'

interface IAddTaskAlgorithmProps {
    task: ITask
}

const AddTaskAlgorithm: FC<IAddTaskAlgorithmProps> = ({ task }) => {
    const [algorithmArray, setAlgorithmArray] = useState<string[]>([])
    const [error, setError] = useState('')
    const { tasks, setTaskshandler } = useContext(StoreContext)
    const newStepRef = useRef<HTMLInputElement>(null)
    useEffect(()=>{
        algorithmArray.length > 0 && setError('')
    },[algorithmArray])
    const algorithmSteps = task.algorithm ? task.algorithm.map((step, key) => (<li key={key}><span>{step}</span></li>))
        : algorithmArray.map((step, key) => (<li key={key}><span>{step}</span><button onClick={() => cancelStep(step)}><FontAwesomeIcon icon={faXmark} /></button></li>))

    function addAlgorithm(algorithmArray: string[]) {
        task.algorithm = algorithmArray
        tasks && setTaskshandler && setTaskshandler(tasks.map(oldTask => (oldTask._id === task._id ? task : oldTask)))
    }
    function cancelStep(step: string) {
        setAlgorithmArray(algorithmArray.filter(algStep => algStep !== step))
    }
    const addStep = () => {
        if (newStepRef.current?.value && !algorithmArray.includes(newStepRef.current.value) && newStepRef.current?.value !== '') {
            setAlgorithmArray([...algorithmArray, newStepRef.current.value])
            newStepRef.current.value = ''
        }
    }
    return (
        <TaskContainer title={task.algorithm ? 'Algorytm' : 'Dodawanie algorytmu'} isSmaller>
            <>
                {error !== '' && <p className={styles.error}>{error}</p>}
                <ol className={styles.algorithm}>
                    {algorithmSteps}
                    {!task.algorithm && <li><input ref={newStepRef} type='text' /><button onClick={addStep}><FontAwesomeIcon icon={faPlus} /></button></li>}
                </ol>
                {!task.algorithm && <BaseButton specialClass={styles.rightButton} text='Dodaj algorytm' onClick={() => algorithmArray.length > 0 ? addAlgorithm(algorithmArray) : setError('Nie można dodać pustego algorytmu.')} />}
            </>
        </TaskContainer>
    );
};

export default AddTaskAlgorithm;
