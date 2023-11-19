import {FC} from 'react';

interface ITaskListProps {
    listOfTasks: string[]
}

const TaskList: FC<ITaskListProps> = ({listOfTasks}) => {
    const listElements = listOfTasks.map(task => (
        <li>{task}</li>
    ))
  return (
    <ul>
        {listElements}
    </ul>
  );
};

export default TaskList;
