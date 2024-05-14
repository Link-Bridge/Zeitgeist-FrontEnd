import { Navigate, Route, Routes } from 'react-router-dom';
import ClientDetails from './details';
import ClientList from './main';

const Clients = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientList />} />
      <Route path={'/details/:clientId'} element={<ClientDetails />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Clients;
