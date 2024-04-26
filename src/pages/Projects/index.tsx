import { Link, Route, Routes } from 'react-router-dom';
import AddButton from '../../components/common/AddButton';
import { RoutesPath } from '../../utils/constants';
import ProjectDetails from './details';
import NewProject from './new';
import ProjectReport from './report';

const Projects = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <main className='flex gap-4'>
            <h1>Projects Page</h1>
            <p>Welcome to the Projects page!</p>
            <Link to={`${RoutesPath.PROJECTS}/new`}>
              <AddButton></AddButton>
            </Link>
            <Link to={`${RoutesPath.PROJECTS}/details`}>
              <AddButton></AddButton>
            </Link>
          </main>
        }
      />
      <Route path='/new' element={<NewProject />} />
      <Route path='/details' element={<ProjectDetails />} />
      <Route path='/report/:id' element={<ProjectReport />} />
    </Routes>
  );
};

export default Projects;
