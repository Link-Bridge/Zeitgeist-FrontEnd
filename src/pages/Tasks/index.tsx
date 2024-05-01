import { Route, Routes } from 'react-router-dom';
import Task from './task-detail';

const Tasks = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <main className='p-10 py-4 flex gap-4'>
            <h1>Tasks Page</h1>
            <p>Welcome to the Tasks page!</p>
          </main>
        }
      />
      <Route path='/:id' element={<Task />} />
    </Routes>
  );
};

export default Tasks;
