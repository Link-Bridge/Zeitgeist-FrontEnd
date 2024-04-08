import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Clients from './pages/Clients';
import Employees from './pages/Employees/';
import Home from './pages/Home';
import Layout from './components/common/Layout';

function App() {

  return (
    <>
    <Router>
      <div>
        {/* Configuración de las rutas */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/employees" element={<Employees />} />
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
