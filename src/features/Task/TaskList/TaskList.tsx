import { FC, useContext, useMemo } from 'react';
import { StoreContext } from '@/store/StoreProvider';
import TaskButton from '../TaskButton/TaskButton';
import styles from './TaskList.module.scss'

interface ITaskListProps {
  completedTaskList?: boolean
}

const TaskList: FC<ITaskListProps> = ({completedTaskList}) => {
  const { tasks } = useContext(StoreContext)

  const uncompletedTasks = useMemo(() => tasks?.filter(task => (completedTaskList ? task.isDone === true : task.isDone === false) && task.isDeleted === false && task.isExpanded === false), [tasks])
  const listElements = uncompletedTasks?.map(task => (task.isDone ? <TaskButton key={task._id} task={task} taskDone/> : <TaskButton key={task._id} task={task} />))

  const taskListStyle = completedTaskList ? `d-flex flex-column align-items-center ${styles.taskList} ${styles.completed}` : `d-flex flex-column align-items-center ${styles.taskList}`
  return (
    <section className={taskListStyle}>
      {completedTaskList && <h2 className='w-100'>Ukończone zadania</h2>}
      {listElements?.length === 0 ? (<p className={styles.emptyList} >Nie masz zadań.</p>) : listElements}
    </section>
  );
};

export default TaskList;
