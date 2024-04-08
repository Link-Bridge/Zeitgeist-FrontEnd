import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Clients from './pages/Clients';
import Employees from './pages/Employees/';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

function App() {
  return (
    <>
      <Router>
        <div>
          <nav>
            {/* Navegación */}
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/projects'>Projects</Link>
              </li>
              <li>
                <Link to='/tasks'>Tasks</Link>
              </li>
              <li>
                <Link to='/clients'>Clients</Link>
              </li>
              <li>
                <Link to='/employees'>Employees</Link>
              </li>
            </ul>
          </nav>

          {/* Configuración de las rutas */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/clients' element={<Clients />} />
            <Route path='/employees' element={<Employees />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
