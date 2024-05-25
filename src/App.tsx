import { Snackbar } from '@mui/joy';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/es-mx';
import { useEffect, useState } from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import NotFoundPage from './components/common/NotFound';
import OfflineModal from './components/common/OfflineModal';
import ProtectedRoute from './components/common/ProtectedRoute';
import { EmployeeBodyType, EmployeeContext } from './hooks/employeeContext';
import { SnackbarContext, SnackbarState } from './hooks/snackbarContext';
import { configDayjs } from './lib/dayjs/dayjs';
import Auth from './pages/Auth';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import Expenses from './pages/Expenses';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { RoutesPath } from './utils/constants';

function App() {
  configDayjs();

  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });
  const [employee, setEmployee] = useState<EmployeeBodyType | null>(null);

  useEffect(() => {
    const currentEmployee = JSON.parse(localStorage.getItem('employee') ?? '{}');
    if (currentEmployee) {
      setEmployee(currentEmployee);
    }
  }, []);

  useEffect(() => {
    if (state.open) {
      setTimeout(
        () =>
          setState(s => {
            return { ...s, open: false };
          }),
        2000
      );
    }
  }, [state]);

  return (
    <EmployeeContext.Provider value={{ employee, setEmployee }}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='es-mx'>
        <SnackbarContext.Provider value={{ state, setState }}>
          <OfflineModal />
          <Router>
            <Routes>
              {<Route path={RoutesPath.ROOT} element={<Auth />} />}
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
                  path={`${RoutesPath.TASKS}/*`}
                  element={
                    <ProtectedRoute>
                      <Tasks />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path={`${RoutesPath.CLIENTS}/*`}
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
                <Route
                  path={`${RoutesPath.EXPENSES}/*`}
                  element={
                    <ProtectedRoute>
                      <Expenses />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </Router>
          <Snackbar open={state.open} color={state.type ?? 'neutral'} variant='solid'>
            {state.message}
          </Snackbar>
        </SnackbarContext.Provider>
      </LocalizationProvider>
    </EmployeeContext.Provider>
  );
}

export default App;
