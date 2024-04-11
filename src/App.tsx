import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import Clients from './pages/Clients';
import Employees from './pages/Employees/';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';

function App() {
  return (
    <Router>
      <Layout>
        {/* Configuración de las rutas */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/tasks' element={<Tasks />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/employees' element={<Employees />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
