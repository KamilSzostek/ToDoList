import { FC, useState } from 'react';
import styles from './TaskLayout.module.scss'
import BaseButton from '@/components/BaseButton/BaseButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import AddTask from '../AddTask/AddTask';
import TaskList from '../TaskList/TaskList';

const TaskLayout: FC = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const showAddTaskHandler = () => setShowAddTask(!showAddTask)
  return (
    <main className={`pt-5 ${styles.taskLayout}`}>
      <h1 className={`pt-4 pb-4 fz-1 text-center ${styles.title}`}>-Lista zadań-</h1>
      <div className='d-flex justify-content-between gap-5 pt-3 pb-3'>
        {!showAddTask ? <BaseButton text='Dodaj zadanie' icon={faPlus} onClick={showAddTaskHandler} /> : null}
        <BaseButton text='Zwiń zadania' icon={faChevronUp} isDark />
      </div>
      {showAddTask ? <AddTask showHandler={showAddTaskHandler}/> : null}
        <TaskList/>
        <TaskList completedTaskList/>

    </main>
  );
};

export default TaskLayout;
