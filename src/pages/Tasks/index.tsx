import { Navigate, Route, Routes } from 'react-router-dom';
import TaskDetails from './details';
import EditTask from './edit';
import AssignedTasks from './main';
import NewTask from './new';

const Tasks = () => {
  return (
    <Routes>
      <Route path='/' element={<AssignedTasks />} />
      <Route path='/:idProject/create' element={<NewTask />} />
      <Route path='/:id' element={<TaskDetails />} />
      <Route path='/edit/:id' element={<EditTask />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Tasks;
