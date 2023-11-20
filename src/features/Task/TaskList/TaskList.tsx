import { StoreContext } from '@/store/StoreProvider';
import {FC, useContext} from 'react';

const TaskList: FC = () => {
  const {tasks} = useContext(StoreContext)
    const listElements = tasks?.map(task => (
        <li>{task.name}</li>
    ))
  return (
    <ul>
        {listElements?.length === 0 ? (<p>Nie masz aktywnych zadań.</p>) : listElements}
    </ul>
  );
};

export default TaskList;
