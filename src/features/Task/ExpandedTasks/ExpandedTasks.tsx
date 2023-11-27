import { FC, useContext } from 'react';
import { StoreContext } from '@/store/StoreProvider';
import Task from '../Task/Task';

const ExpandedTasks: FC = () => {
  const { tasks } = useContext(StoreContext)
  const expandedTasksArray = tasks &&  tasks?.filter(task => task.isExpanded === true && task.isDeleted === false).sort((a, b) => b.expandTime! - a.expandTime!)
  const expandedTaskElements = expandedTasksArray?.map(task => (<Task key={task._id} task={task} />))
  return (
    <>
      {expandedTaskElements}
    </>
  );
};

export default ExpandedTasks;
