import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Clients from './pages/Clients';
import Employees from './pages/Employees/';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { RoutesPath } from './utils/constants';

function App() {
  return (
    <>
      <Router>
          {/* Configuración de las rutas */}
          <Routes>
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route path={`${RoutesPath.PROJECTS}/*`} element={<Projects />} />
            <Route path={RoutesPath.TASKS} element={<Tasks />} />
            <Route path={RoutesPath.CLIENTS} element={<Clients />} />
            <Route path={RoutesPath.EMPLOYEES} element={<Employees />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
