import { DeleteOutline, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Option, Select, Table, selectClasses } from '@mui/joy';
import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { EmployeeContext } from '../../../hooks/employeeContext';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useHttp from '../../../hooks/useHttp';
import { EmployeeOptions } from '../../../pages/Employees/employee-options.eum';
import { Response } from '../../../types/response';
import { Role } from '../../../types/role';
import { BASE_API_URL, RequestMethods } from '../../../utils/constants';
import ComponentPlaceholder from '../../common/ComponentPlaceholder';
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

interface Props {
  searchTerm: string;
  selectedOptions: string[];
}

export default function EmployeeTable({ searchTerm, selectedOptions }: Props) {
  const { setState } = useContext(SnackbarContext);
  const [open, setOpen] = useState(false);
  const reqEmployees = useHttp<Response<Employee>>(`/employee`, RequestMethods.GET);
  const reqRoles = useHttp<Response<Role>>(`/admin/roles`, RequestMethods.GET);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);

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

  useEffect(() => {
    if (reqEmployees.data && reqRoles.data) {
      const filteredEmployees = reqEmployees.data?.data.filter(employee => {
        let matchesFilter = false;
        switch (selectedOptions[0]) {
          case EmployeeOptions.Name:
            const fullName = `${employee.firstName} ${employee.lastName}`
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
            matchesFilter = fullName;
            break;
          case EmployeeOptions.Email:
            matchesFilter = employee.email.toLowerCase().includes(searchTerm.toLowerCase());
            break;
          case EmployeeOptions.Role:
            const role = reqRoles.data!.data.find(role => role.id === employee.idRole);
            const roleTitle = role ? role.title : '';
            matchesFilter = roleTitle.includes(searchTerm.toLowerCase());
            break;
          default:
            matchesFilter = true;
        }
        return matchesFilter;
      });
      setSearchResults(filteredEmployees);
    }
  }, [reqEmployees.data, searchTerm, selectedOptions, reqRoles.data]);

  const handleRolChange = async (newRoleId: string, userId: string) => {
    if (!newRoleId || !userId) return;
    try {
      const response = await axios.put(
        `${BASE_API_URL}/admin/role`,
        {
          userId: userId,
          roleId: newRoleId,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem('idToken')}` } }
      );

      if (response.status === 200) {
        const updatedEmployees = searchResults.map(employee => {
          if (employee.id === userId) {
            return { ...employee, idRole: newRoleId };
          }
          return employee;
        });
        setSearchResults(updatedEmployees);
        setState({ open: true, message: 'Role updated successfully', type: 'success' });
      } else {
        console.error('Error updating role:', response.status);
      }
    } catch (error) {
      console.error('Error in handleRolChange:', error);
      setState({ open: true, message: 'Failed to update role', type: 'danger' });
    }
  };

  const handleDeleteEmployee = (id: string) => {
    if (reqEmployees.data)
      reqEmployees.data.data = reqEmployees.data.data.filter(employee => employee.id !== id);
    setState({ open: true, message: 'Employee deleted successfully', type: 'success' });
  };

  const { employee: employeeContext } = useContext(EmployeeContext);
  const sessionEmployee = employeeContext?.employee.id as string;

  if (reqEmployees.loading || reqRoles.loading) return <Loader />;

  if (reqEmployees.data?.data.length === 0)
    return <ComponentPlaceholder text='No employees found' />;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '10%' }}>Photo</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell sx={{ width: '15%', textAlign: 'right' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map(employee => (
            <TableRow key={employee.id}>
              <TableCell>
                {employee.imageUrl ? <Avatar src={employee.imageUrl} /> : <Avatar />}
              </TableCell>
              <TableCell>
                {employee.firstName} {employee.lastName}
              </TableCell>
              <TableCell>
                <Select
                  variant='outlined'
                  color='neutral'
                  indicator={<KeyboardArrowDown />}
                  defaultValue={employee.idRole}
                  disabled={sessionEmployee === employee.id}
                  onChange={e => {
                    if (!e || e === null) return;
                    handleRolChange((e.target as unknown)?.ariaLabel || '', employee.id);
                  }}
                  sx={{
                    width: 150,
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                  }}
                >
                  {reqRoles.data?.data.map((role: Role) => (
                    <Option aria-label={role.id} key={role.id} value={role.id}>
                      {toTitleCase(role.title)}
                    </Option>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <Chip className='w-full overflow' variant='soft'>
                  {employee.email}
                </Chip>
              </TableCell>
              <TableCell sx={{ textAlign: 'right' }}>
                {' '}
                {sessionEmployee !== employee.id && (
                  <IconButton>
                    <DeleteOutline
                      onClick={() => {
                        setOpen(true);
                        setCurrentEmployeeId(employee.id);
                      }}
                      style={{ color: colors.gold }}
                    />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
