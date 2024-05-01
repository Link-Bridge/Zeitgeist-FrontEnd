import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectDetails from './details';
import ProjectMain from './main';
import NewProject from './new';
import ProjectReport from './report';

const Projects = () => {
  const [projectId, setProjectId] = useState<string>('');
  return (
    <Routes>
      <Route path='/' element={<ProjectMain projectId={projectId} setProjectId={setProjectId} />} />
      <Route path='/new' element={<NewProject />} />
      <Route
        path='/details/:id'
        element={<ProjectDetails projectId={projectId} setProjectId={setProjectId} />}
      />
      <Route path='/report/:id' element={<ProjectReport />} />
    </Routes>
  );
};

export default Projects;
