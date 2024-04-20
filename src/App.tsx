import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useState } from 'react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/common/Layout';
import { SnackbarContext, SnackbarState } from './hooks/snackbarContext';

import { Snackbar } from '@mui/joy';
import ProtectedRoute from './components/common/ProtectedRoute';
import Auth from './pages/Auth';
import Clients from './pages/Clients';
import Employees from './pages/Employees';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import { RoutesPath } from './utils/constants';

function App() {
  const [state, setState] = useState<SnackbarState>({ open: false, message: '' });

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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <SnackbarContext.Provider value={{ state, setState }}>
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
                path={RoutesPath.PROJECTS}
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
        <Snackbar open={state.open} color={state.type ?? 'neutral'} variant='solid'>
          {state.message}
        </Snackbar>
      </SnackbarContext.Provider>
    </LocalizationProvider>
  );
}

export default App;
