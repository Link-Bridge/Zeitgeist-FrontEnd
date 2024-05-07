import { Route, Routes } from 'react-router-dom';
import AssignedTasks from './assigned';
import NewTask from './new';
import TaskDetail from './task-detail';
import UpdateTask from './update';

const Tasks = () => {
  return (
    <Routes>
      <Route path='/' element={<AssignedTasks />} />
      <Route path='/:projectId/create' element={<NewTask />} />
      <Route path='/:id' element={<TaskDetail />} />
      <Route path='/update/:id' element={<UpdateTask />} />
    </Routes>
  );
};

export default Tasks;
