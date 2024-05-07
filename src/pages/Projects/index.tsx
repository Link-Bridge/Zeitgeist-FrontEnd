import { Route, Routes } from 'react-router-dom';
import ProjectDetails from './details';
import EditProject from './edit';
import ProjectMain from './main';
import NewProject from './new';
import ProjectReport from './report';

const Projects = () => {
  return (
    <Routes>
      <Route path='/' element={<ProjectMain />} />
      <Route path='/' element={<ProjectMain />} />
      <Route path='/new' element={<NewProject />} />
      <Route path='/edit/:id' element={<EditProject />} />
      <Route path='/details/:id' element={<ProjectDetails />} />
      <Route path='/report/:id' element={<ProjectReport />} />
    </Routes>
  );
};

export default Projects;
