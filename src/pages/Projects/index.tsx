import { Navigate, Route, Routes } from 'react-router-dom';
import ProjectDetails from './details';
import EditProject from './edit';
import ProjectMain from './main';
import NewProject from './new';
import ProjectReport from './report';

const Projects = () => {
  return (
    <Routes>
      <Route path='/' element={<ProjectMain />} />
      <Route path='/new' element={<NewProject />} />
      <Route path='/edit/:id' element={<EditProject />} />
      <Route path='/details/:id' element={<ProjectDetails />} />
      <Route path='/report/:id' element={<ProjectReport />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Projects;
