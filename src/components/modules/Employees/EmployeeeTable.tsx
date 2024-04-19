import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { IconButton, Option, Select, selectClasses } from '@mui/joy';
import Table from '@mui/joy/Table';
import Chip from '@mui/joy/chip';
import { useState } from 'react';
import colors from '../../../colors';
import useFetch from '../../../hooks/useFetch';
import { Response } from '../../../types/response';
import DeleteModal from '../../common/DeleteModal';

type Employee = {
  photo: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function EmployeeTable() {
  const [open, setOpen] = useState(false);
  const req = useFetch<Response<Employee>>('http://localhost:4000/api/v1/employee');
  const openModal = () => setOpen(true);

  return (
    <Table variant={'outlined'}>
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
                {' '}
                <AccountCircleIcon></AccountCircleIcon>{' '}
              </td>
              <td>{employee.firstName} {employee.lastName} </td>
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
                  <DeleteOutlineIcon onClick={openModal} style={{ color: colors.gold }} />
                </IconButton>
              </td>
            </tr>
          ))}
      </tbody>
      <DeleteModal
        open={open}
        title='Delete Employee'
        description='Are you sure you want to delete this employee?'
        setOpen={setOpen}
      />
    </Table>
  );
}
