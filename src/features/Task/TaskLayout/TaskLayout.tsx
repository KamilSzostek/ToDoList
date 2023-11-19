import {FC} from 'react';
import styles from './TaskLayout.module.scss'
import BaseButton from '@/components/BaseButton/BaseButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';

const TaskLayout: FC = () => {
  return (
    <main className={`pt-5 ${styles.taskLayout}`}>
        <h1 className={`pt-4 pb-4 fz-1 text-center ${styles.title}`}>-Lista zadań-</h1>
        <div className='d-flex justify-content-between gap-5 pt-3 pb-3'>
            <BaseButton text='Dodaj zadanie' icon={faPlus}/>
            <BaseButton text='Zwiń zadania' icon={faChevronUp} isDark/>
        </div>
        
    </main>
  );
};

export default TaskLayout;
