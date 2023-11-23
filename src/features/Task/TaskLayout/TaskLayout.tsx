import { FC, useState, useContext } from 'react';
import BaseButton from '@/components/BaseButton/BaseButton';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons/faChevronUp';
import AddTask from '../AddTask/AddTask';
import TaskList from '../TaskList/TaskList';
import ExpandedTasks from '../ExpandedTasks/ExpandedTasks';
import styles from './TaskLayout.module.scss'
import { StoreContext } from '@/store/StoreProvider';

const TaskLayout: FC = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const { tasks, setTaskshandler } = useContext(StoreContext)
  const showAddTaskHandler = () => setShowAddTask(!showAddTask)
  const closeTasks = () => {
    tasks && setTaskshandler && setTaskshandler(tasks.map(task => {
      if (task.isExpanded) {
        task.isExpanded = false
        return task
      }
      else return task
    }))
  }
  return (
    <main className={`row pt-5 ${styles.taskLayout}`}>
      <h1 className={`pt-4 pb-4 fz-1 text-center ${styles.title}`}>-Lista zadań-</h1>
      <div className='d-flex justify-content-between gap-5 pt-3 pb-3'>
        {!showAddTask ? <BaseButton text='Dodaj zadanie' icon={faPlus} onClick={showAddTaskHandler} /> : null}
        <BaseButton specialClass={styles.rightButton} text='Zwiń zadania' icon={faChevronUp} isDark onClick={closeTasks} />
      </div>
      {showAddTask && <AddTask showHandler={showAddTaskHandler} />}
      <ExpandedTasks />
      <TaskList />
      <TaskList completedTaskList />
    </main>
  );
};

export default TaskLayout;
