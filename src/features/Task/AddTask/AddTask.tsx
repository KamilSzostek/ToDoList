import { FC, useContext, useId } from 'react';
import { useFormik } from 'formik';
import BaseButton from '@/components/BaseButton/BaseButton';
import TaskContainer from '../TaskContainer/TaskContainer';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '@/store/StoreProvider';

import styles from './AddTask.module.scss'

interface IAddTaskProps {
    showHandler: () => void
}

interface IFormValues {
    name?: string
    description?: string
}
const validate = (values: IFormValues) => {
    const errors: IFormValues = {};
    if (!values.name)
        errors.name = 'Nazwa jest wymagana.'
    else if (values.name.length < 3)
        errors.name = 'Nazwa jest zbyt krótka.'
    else if (values.name.length > 20)
        errors.name = 'Nazwa jest zbyt długa.'
    if (values.description && values.description?.length > 120)
        errors.description = 'Opis jest zbyt długi.'
    return errors
}

const AddTask: FC<IAddTaskProps> = ({ showHandler }) => {
    const context = useContext(StoreContext)
    const id = useId()
    const formik = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validate,
        validateOnChange: false,
        onSubmit: (values: IFormValues) => {
            const newTasks = context.tasks && [...context.tasks, { _id: id, name: values.name!, description: values.description, dateTimeStart: Date.now().toLocaleString(), isDeleted: false, isExpanded: false, isDone: false }]
            newTasks && context.setTaskshandler && context.setTaskshandler(newTasks)
            showHandler()
        }
    })
    return (
        <TaskContainer title='Dodaj zadanie'>
            <form className={`d-flex flex-column p-5 ${styles.addTaskForm}`} onSubmit={formik.handleSubmit}>
                <div className='d-flex flex-column  mb-3'>
                    {formik.errors.name ? (<div className='text-danger fs-5'>{formik.errors.name}</div>) : null}
                    <div className='d-flex justify-content-between'>
                        <label className='w-25 fs-3' htmlFor="name">Nazwa: </label>
                        <input
                            id="name"
                            className='w-75 ps-2 pt-1 pb-1 fs-5'
                            name="name"
                            type="text"
                            autoComplete='false'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                </div>
                {formik.errors.description ? (<span className='text-danger fs-5'>{formik.errors.description}</span>) : null}
                <div className='d-flex justify-content-between mb-4'>
                    <label className='w-25 fs-3' htmlFor="description">Opis: </label>
                    <textarea
                        id="description"
                        className={`w-75 ps-2 pt-1 pb-1 fs-5 ${styles.description}`}
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </div>
                <p>Liczba znaków:<span className='fw-bold'>{formik.values.description?.length}</span>/120</p>
                <div className='d-flex justify-content-between align-items-center gap-2'>
                    <BaseButton type='button' text='Zamknij' isDark onClick={showHandler} />
                    <BaseButton specialClass={styles.addButton} type='submit' text='Dodaj zadanie' icon={faPlus} />
                </div>
            </form>
        </TaskContainer>
    );
};

export default AddTask;
