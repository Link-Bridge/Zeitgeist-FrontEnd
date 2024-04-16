import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Clients from './pages/Clients';
import Employees from './pages/Employees/';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { RoutesPath } from './utils/constants';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Router>
        <Layout>
          {/* Configuración de las rutas */}
          <Routes>
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route path={`${RoutesPath.PROJECTS}/*`} element={<Projects />} />
            <Route path={RoutesPath.TASKS} element={<Tasks />} />
            <Route path={RoutesPath.CLIENTS} element={<Clients />} />
            <Route path={RoutesPath.EMPLOYEES} element={<Employees />} />
          </Routes>
        </Layout>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
