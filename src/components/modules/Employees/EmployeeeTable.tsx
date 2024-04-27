import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
import axios from 'axios';

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    function (txt: string) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

type Employee = {
  imageUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  idRole: string;
};

interface Role {
  id: string,
  title: string,
  createdAt: Date,
  updatedAt: Date | null
};

export default function EmployeeTable() {
  const { setState } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);
  const reqEmployees = useFetch<Response<Employee>>('http://localhost:4000/api/v1/employee');
  const reqRoles = useFetch<Response<Role>>('http://localhost:4000/api/v1/admin/roles');
  const openModal = () => setOpen(true);

  useEffect(() => {
    if (reqEmployees.error) {
      setState({ open: true, message: reqEmployees.error.message, type: 'danger' });
    }
  }, [reqEmployees.error, setState]);

  const handleRolChange = (newRoleId: string, userId: string): void => {
    if (newRoleId === undefined || userId === undefined) return;
    const doFetch = async (): Promise<void> => {
        await axios.put('http://localhost:4000/api/v1/admin/role', {
          userId: userId,
          roleId: newRoleId
        });
    };
    void doFetch();
  };

  return (
    <Table variant={'outlined'}>
      {reqEmployees.isLoading ? (
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
            {!reqEmployees.isLoading &&
              reqEmployees.data?.data.map(employee => (
                <tr>
                  <td>
                    {employee.imageUrl ? (
                      <Avatar src={employee.imageUrl}></Avatar>
                    ) : (
                      <AccountCircleIcon></AccountCircleIcon>
                    )}
                  </td>
                  <td>
                    {employee.firstName} {employee.lastName}{' '}
                  </td>
                  <td>
                    <Select
                      variant='outlined'
                      color='neutral'
                      indicator={<KeyboardArrowDown />}
                      defaultValue={employee.idRole}
                      onChange={(e: any) => {
                        handleRolChange(e.target.ariaLabel, employee.id);
                      }}
                      sx={{
                        [`& .${selectClasses.indicator}`]: {
                          transition: '0.2s',
                          [`&.${selectClasses.expanded}`]: {
                            transform: 'rotate(-180deg)',
                          },
                        },
                      }}
                    >
                      {reqRoles.data?.data.map((role: Role, idxRole: number) => {
                        return (
                          <Option aria-label={role.id} key={idxRole} value={role.id}>
                            {toTitleCase(role.title)}
                          </Option>
                        )
                      })}
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
        </>
      )}
    </Table>
  );
}
