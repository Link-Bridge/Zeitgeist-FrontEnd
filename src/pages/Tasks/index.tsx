import { Box, Sheet, Typography } from '@mui/joy';
import { colors } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { EmployeeContext } from '../../hooks/employeeContext';
import useHttp from '../../hooks/useHttp';
import { ProjectEntity } from '../../types/project';
import { Response } from '../../types/response';
import { Task } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

/**
 * Shows the tasks assigned for the signed in employee
 *
 * @page
 * @returns JSX.Element - React component
 */
const Tasks = () => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [projectNames, setProjectNames] = useState<string[] | null>([]);
  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;

  const {
    data: taskData,
    sendRequest: fetchTasks,
    error: taskError,
  } = useHttp<Response<Task>>(`/tasks/employee/${employeeId}`, RequestMethods.GET);

  const {
    data: projectData,
    sendRequest: fetchProjects,
    error: projectError,
  } = useHttp<Response<ProjectEntity>>(`/project/`, RequestMethods.GET);

  useEffect(() => {
    if (employeeId) fetchTasks();
  }, []);

  useEffect(() => {
    if (taskData) {
      fetchProjects();
    }
  }, [taskData]);

  useEffect(() => {
    if (taskData) {
      const tasksCache = taskData.data;
      setTasks(tasksCache);
    }
  }, [taskData]);

  useEffect(() => {
    if (projectData) {
      const projectNamesCache = projectData.data.map(project => project.name);
      setProjectNames(projectNamesCache);
    }
  }, [projectData]);

  // TODO: Update the task status
  const updateTaskStatus = async (taskId: string, status: string) => {};

  if (taskError || projectError) {
    return (
      <>
        <Typography level='h1' variant='plain'>
          Error
        </Typography>
        <Typography level='h2' variant='plain'>
          {taskError?.message || projectError?.message}
        </Typography>
      </>
    );
  }

  return (
    <>
      <Sheet
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 12,
          padding: 2,
          overflowY: 'auto',
        }}
      >
        {taskData && projectData ? (
          <>
            {projectNames?.map(projectName => {
              return (
                <Box key={projectName} sx={{ marginBottom: 2 }}>
                  <Typography
                    variant='plain'
                    level='h1'
                    sx={{
                      color: colors.grey[800],
                      fontWeight: 'bold',
                      fontSize: '1.5rem',
                    }}
                  >
                    {projectName}
                  </Typography>

                  <Typography variant='plain' level='h4'>
                    No tasks assigned for this project
                  </Typography>
                </Box>
              );
            })}
          </>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: colors.grey[500],
            }}
          >
            <Typography variant='plain' level='h1'>
              Your task list is empty
            </Typography>
            <Typography variant='plain' level='h2'>
              Get started by adding tasks to your project
            </Typography>
          </Box>
        )}
      </Sheet>
    </>
  );
};

export default Tasks;
