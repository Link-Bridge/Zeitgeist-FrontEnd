import { DeleteOutline, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Option, Select, Table, selectClasses } from '@mui/joy';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { EmployeeContext } from '../../../hooks/employeeContext';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { Response } from '../../../types/response';
import { RequestMethods } from '../../../utils/constants';
import DeleteModal from '../../common/DeleteModal';
import Loader from '../../common/Loader';

/**
 * @param str The text to be formated to Capitalized Camel Case
 * @returns The formatted text
 */
function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt: string) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
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
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date | null;
}

export default function EmployeeTable() {
  const BASE_URL = import.meta.env.VITE_BASE_API_URL as string;

  const { setState } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);
  const reqEmployees = useHttp<Response<Employee>>(`/employee`, RequestMethods.GET);
  const reqRoles = useHttp<Response<Role>>(`/admin/roles`, RequestMethods.GET);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('');
  useEffect(() => {
    reqEmployees.sendRequest();
    reqRoles.sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reqEmployees.error) {
      setState({ open: true, message: reqEmployees.error.message, type: 'danger' });
    }
  }, [reqEmployees.error, setState]);

  const handleRolChange = (newRoleId: string, userId: string): void => {
    if (newRoleId === undefined || userId === undefined) return;
    const doFetch = async (): Promise<void> => {
      await axios.put(
        `${BASE_URL}/admin/role`,
        {
          userId: userId,
          roleId: newRoleId,
        },
        { headers: { Authorization: `Bearer ${sessionStorage.getItem('idToken')}` } }
      );
      reqEmployees.sendRequest();
    };
    void doFetch();
  };

  const handleDeleteEmployee = (id: string) => {
    if (reqEmployees.data)
      reqEmployees.data.data = reqEmployees.data.data.filter(employee => employee.id !== id);
    setState({ open: true, message: 'Employee deleted successfully', type: 'success' });
  };

  const { employee } = useContext(EmployeeContext);
  const sessionEmployee = employee?.employee.id as string;

  return (
    <>
      {reqEmployees.loading ? (
        <Loader />
      ) : (
        <Table variant={'outlined'}>
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
              {!reqEmployees.loading &&
                reqEmployees.data?.data.map(employee => (
                  <tr key={employee.id}>
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
                        defaultValue={employee.idRole}
                        onChange={e => {
                          if (e === null) return;
                          // eslint-disable-next-line
                          handleRolChange((e.target as any)?.ariaLabel || '', employee.id);
                        }}
                        sx={{
                          width: 250,
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
                          );
                        })}
                      </Select>
                    </td>
                    <td>
                      <Chip className='w-full overflow' variant='soft'>
                        {employee.email}
                      </Chip>
                    </td>
                    <td>
                      {sessionEmployee != employee.id && (
                        <IconButton>
                          <DeleteOutline
                            onClick={() => {
                              setCurrentEmployeeId(employee.id);
                              setOpen(true);
                            }}
                            style={{ color: colors.gold }}
                          />
                        </IconButton>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        </Table>
      )}
      <DeleteModal
        open={open}
        title='Delete Employee'
        description='Are you sure you want to delete this employee?'
        id={currentEmployeeId}
        setOpen={setOpen}
        handleDeleteEmployee={handleDeleteEmployee}
      />
    </>
  );
}
