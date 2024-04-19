import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Auth from './pages/Auth';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { RoutesPath } from './utils/constants';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={RoutesPath.ROOT} element={<Auth />} />
        <Route element={<Layout children={<Outlet />} />}>
          <Route
            path={RoutesPath.HOME}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path={`${RoutesPath.PROJECTS}/*`}
            element={
              <ProtectedRoute>
                <Projects />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.TASKS}
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.CLIENTS}
            element={
              <ProtectedRoute>
                <Clients />
              </ProtectedRoute>
            }
          />
          <Route
            path={RoutesPath.EMPLOYEES}
            element={
              <ProtectedRoute>
                <Employees />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
