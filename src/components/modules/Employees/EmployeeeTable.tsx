import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Option, Select, selectClasses } from '@mui/joy';
import Chip from '@mui/joy/Chip';
import Table from '@mui/joy/Table';
import { Avatar } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useFetch from '../../../hooks/useFetch';
import { Response } from '../../../types/response';
import DeleteModal from '../../common/DeleteModal';
import Loader from '../../common/Loader';

type Employee = {
  imageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  id: string;
};

export default function EmployeeTable() {
  const { setState } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);
  const req = useFetch<Response<Employee>>('http://localhost:4000/api/v1/employee');
  const openModal = (id: string) => {
    setOpen(true);
    setId(id);
  };
  const [id, setId] = useState('');
  console.log(req.data?.data);

  useEffect(() => {
    if (req.error) {
      setState({ open: true, message: req.error.message, type: 'danger' });
    }
  }, [req.error, setState]);

  return (
    <Table variant={'outlined'}>
      {req.isLoading ? (
        <Loader />
      ) : (
        <>
          <thead>
            <tr>
              <th style={{ width: '10%' }}> Photo </th>
              <th>Name</th>
              <th>Role</th>
              <th>Email</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {!req.isLoading &&
              req.data?.data.map(employee => (
                <tr>
                  <td>
                    {employee.imageUrl ? <Avatar src={employee.imageUrl}></Avatar> : <Avatar />}
                  </td>
                  <td>
                    {employee.firstName} {employee.lastName}{' '}
                  </td>
                  <td>
                    <Select
                      variant='outlined'
                      color='neutral'
                      indicator={<KeyboardArrowDown />}
                      sx={{
                        [`& .${selectClasses.indicator}`]: {
                          transition: '0.2s',
                          [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                          },
                        },
                      }}
                    >
                      <Option value='employee.role'>{employee.role}</Option>
                    </Select>
                  </td>
                  <td>
                    <Chip variant='soft'> {employee.email} </Chip>
                  </td>
                  <td>
                    <IconButton>
                      <DeleteOutlineIcon
                        onClick={() => openModal(employee.id)}
                        style={{ color: colors.gold }}
                      />
                    </IconButton>
                  </td>
                </tr>
              ))}
          </tbody>
          <DeleteModal
            open={open}
            title='Delete Employee'
            description='Are you sure you want to delete this employee?'
            id={id}
            setOpen={setOpen}
          />
        </>
      )}
    </Table>
  );
}
