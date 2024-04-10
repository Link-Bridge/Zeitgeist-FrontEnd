import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import Clients from './pages/Clients';
import Employees from './pages/Employees/';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';


function App() {
  return (
    <>
      <h1>Main page</h1>
      <Router>
        <div>
          {/* Configuración de las rutas */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<Auth />} />
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
