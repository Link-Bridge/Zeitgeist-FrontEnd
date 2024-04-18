import { Route, Routes } from 'react-router-dom';
import NewProject from './new';

const Projects = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <main className='flex gap-4'>
            <h1>Projects Page</h1>
            <p>Welcome to the Projects page!</p>
          </main>
        }
      />
      <Route path='/new' element={<NewProject />} />
    </Routes>
  );
};

export default Projects;
