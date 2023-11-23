import { FC, useContext, useMemo } from 'react';
import { StoreContext } from '@/store/StoreProvider';
import TaskButton from '../TaskButton/TaskButton';
import TaskContainer from '../TaskContainer/TaskContainer';
import styles from './TaskList.module.scss'

interface ITaskListProps {
  completedTaskList?: boolean
}

const TaskList: FC<ITaskListProps> = ({ completedTaskList }) => {
  const { tasks } = useContext(StoreContext)

  const uncompletedTasks = useMemo(() => tasks?.filter(task => (completedTaskList ? task.isDone === true : task.isDone === false) && task.isDeleted === false && task.isExpanded === false), [tasks])
  const listElements = uncompletedTasks?.map(task => (task.isDone ? <TaskButton key={task._id} task={task} /> : <TaskButton key={task._id} task={task} />))

  const taskListStyle = completedTaskList ? `d-flex flex-column align-items-center justify-content-center ${styles.taskList} ${styles.completed}` : `d-flex flex-column align-items-center ${styles.taskList}`
  return (
    <TaskContainer title={completedTaskList ? 'Ukończone zadania' : undefined}>
      <section className={taskListStyle}>
        {listElements?.length === 0 ? (<p className={styles.emptyList} >Nie masz nieotwartych zadań.</p>) : listElements}
      </section>
    </TaskContainer>
  );
};

export default TaskList;
