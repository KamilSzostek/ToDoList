import { FC, useContext, useId } from 'react';
import { useFormik } from 'formik';
import BaseButton from '@/components/BaseButton/BaseButton';
import TaskContainer from '../TaskContainer/TaskContainer';
import { faCross, faPlus } from '@fortawesome/free-solid-svg-icons';
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
            const arr = context.tasks && [...context.tasks, { _id: id, name: values.name!, description: values.description, dateTimeStart: Date.now().toLocaleString() }]
            arr && context.setTaskshandler && context.setTaskshandler(arr)
        }
    })
    return (
        <TaskContainer title='Dodaj zadanie'>
            <form className={`d-flex flex-column p-5 ${styles.signInForm}`} onSubmit={formik.handleSubmit}>
                <div className='d-flex flex-column  mb-3'>
                    {formik.errors.name ? (<div className={styles.error}>{formik.errors.name}</div>) : null}
                    <div className='d-flex justify-content-between'>
                        <label htmlFor="name">Nazwa: </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete='false'
                            onChange={formik.handleChange}
                            value={formik.values.name}
                        />
                    </div>
                </div>
                <div className='d-flex justify-content-between mb-4'>
                    <label htmlFor="password">Opis: </label>
                    <textarea
                        id="password"
                        className={styles.textarea}
                        name="password"
                        autoComplete='false'
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    <div>
                        {formik.errors.description ? (<span className={styles.error}>{formik.errors.description}</span>) : null}
                        <span className='w-25 text-right'>Liczba znaków:{formik.values.description?.length}/120</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <BaseButton type='submit' text='Dodaj zadanie' icon={faPlus} />
                    <BaseButton type='button' text='Zamknij' icon={faCross} isDark onClick={showHandler} />
                </div>
            </form>
        </TaskContainer>
    );
};

export default AddTask;
