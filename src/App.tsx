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
<<<<<<< HEAD
    <>
      <Router>
        <Layout>
          <div>
            {/* Configuración de las rutas */}
            <Routes>
              <Route path={RoutesPath.HOME} element={<Home />} />
              <Route path={RoutesPath.PROJECTS} element={<Projects />} />
              <Route path={RoutesPath.TASKS} element={<Tasks />} />
              <Route path={RoutesPath.CLIENTS} element={<Clients />} />
              <Route path={RoutesPath.EMPLOYEES} element={<Employees />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </>
=======
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
>>>>>>> ac887d6f1c03956e65ccf293af4fa7d99a496afa
  );
}

export default App;
