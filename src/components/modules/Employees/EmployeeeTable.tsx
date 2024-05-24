import { DeleteOutline, KeyboardArrowDown } from '@mui/icons-material';
import { Avatar, Chip, IconButton, Option, Select, Sheet, Table, selectClasses } from '@mui/joy';
import { useContext, useEffect, useState } from 'react';
import colors from '../../../colors';
import { EmployeeContext } from '../../../hooks/employeeContext';
import { SnackbarContext } from '../../../hooks/snackbarContext';
import useDeleteEmployee from '../../../hooks/useDeleteEmployee';
import useHttp from '../../../hooks/useHttp';
import { axiosInstance } from '../../../lib/axios/axios';
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
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  idRole: string;
};

interface Props {
  searchTerm: string;
  filterOption: string;
}

export default function EmployeeTable({ searchTerm, filterOption }: Props) {
  const { setState } = useContext(SnackbarContext);
  const [open, setOpen] = useState<boolean>(false);
  const reqEmployees = useHttp<Response<Employee>>(`/employee`, RequestMethods.GET);
  const reqRoles = useHttp<Response<Role>>(`/admin/roles`, RequestMethods.GET);
  const [currentEmployeeId, setCurrentEmployeeId] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);

  const { deleteEmployee, error: deletError } = useDeleteEmployee();

  useEffect(() => {
    reqEmployees.sendRequest();
    reqRoles.sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reqEmployees.error) {
      setState({ open: true, message: reqEmployees.error.message, type: 'danger' });
    }
    if (deletError) {
      setState({ open: true, message: deletError.message, type: 'danger' });
    }
  }, [reqEmployees.error, deletError, setState]);

  useEffect(() => {
    const filteredEmployees =
      reqEmployees.data?.data.filter(employee => {
        const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
        if (filterOption === 'Email') {
          return employee.email.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return fullName.includes(searchTerm.toLowerCase());
      }) || [];

    setSearchResults(filteredEmployees);
  }, [searchTerm, reqEmployees.data, filterOption]);

  const handleRolChange = async (newRoleId: string, userId: string) => {
    if (!newRoleId || !userId) return;
    try {
      const response = await axiosInstance.put(`${BASE_API_URL}/admin/role`, {
        userId: userId,
        roleId: newRoleId,
      });

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
        setState({ open: true, message: 'Failed to update role', type: 'danger' });
      }
    } catch (error) {
      setState({ open: true, message: 'Failed to update role', type: 'danger' });
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      await deleteEmployee(id);
      const updatedEmployees = searchResults.filter(employee => employee.id !== id);
      setSearchResults(updatedEmployees);
      setState({ open: true, message: 'Employee deleted successfully', type: 'success' });
    } catch (error) {
      setState({ open: true, message: 'Failed to delete employee', type: 'danger' });
    }
  };

  const { employee: employeeContext } = useContext(EmployeeContext);
  const sessionEmployee = employeeContext?.employee.id as string;

  if (reqEmployees.loading || reqRoles.loading) return <Loader />;

  if (reqEmployees.data?.data.length === 0)
    return <ComponentPlaceholder text='No employees found' />;

  return searchResults.length === 0 ? (
    <ComponentPlaceholder text='No employees were found' />
  ) : (
    <Sheet sx={{ overflow: 'visible', width: '100%', maxWidth: '100%' }}>
      <Table borderAxis='xBetween' sx={{ minWidth: '800px' }} hoverRow>
        <thead>
          <tr style={{ fontWeight: 600, fontSize: '0.9rem' }}>
            <th style={{ width: '10%' }}>Photo</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th style={{ width: '15%', textAlign: 'right' }}></th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map(employee => (
            <tr key={employee.id}>
              <td>{employee.imageUrl ? <Avatar src={employee.imageUrl} /> : <Avatar />}</td>
              <td style={{ fontSize: '0.9rem' }}>
                {employee.firstName} {employee.lastName}
              </td>
              <td>
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
                    width: 'auto',
                    minWidth: '102px',
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
              </td>
              <td>
                <Chip className='w-full overflow' variant='soft'>
                  {employee.email}
                </Chip>
              </td>
              <td style={{ textAlign: 'right' }}>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <DeleteModal
        open={open}
        title='Delete Employee'
        description='Are you sure you want to delete this employee?'
        id={currentEmployeeId}
        setOpen={setOpen}
        handleDelete={handleDeleteEmployee}
      />
    </Sheet>
  );
}
