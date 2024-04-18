import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton } from '@mui/joy';
import Table from '@mui/joy/Table';
import { useState } from 'react';
import colors from '../../../colors';
import DeleteModal from '../../common/DeleteModal';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { Option, Select, selectClasses } from '@mui/joy';

type Employee = {
  // photo: string;
  fullName: string;
  email: string;
  role: string;
};

export default function EmployeeTable({ employees }: { employees: Employee[] }) {
  const [open, setOpen] = useState(false);
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
        {employees.map(employee => (
          <tr>
            <td>
              {' '}
              <AccountCircleIcon></AccountCircleIcon>{' '}
            </td>
            <td>{employee.fullName}</td>
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
            <td>{employee.email}</td>
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
