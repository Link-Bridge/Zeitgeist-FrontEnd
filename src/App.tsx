import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
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
        <div>
          {/* Configuración de las rutas */}
          <Routes>
            <Route path={RoutesPath.ROOT} element={<Auth />} />
            <Route path={RoutesPath.HOME} element={<Home />} />
            <Route path={RoutesPath.PROJECTS} element={<Projects />} />
            <Route path={RoutesPath.TASKS} element={<Tasks />} />
            <Route path={RoutesPath.CLIENTS} element={<Clients />} />
            <Route path={RoutesPath.EMPLOYEES} element={<Employees />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
