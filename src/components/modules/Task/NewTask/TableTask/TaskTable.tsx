import { Accordion, AccordionDetails, AccordionSummary, Table } from '@mui/joy';
import { useState } from 'react';
import { Task } from '../../../../../types/task';
import { TaskStatus } from '../../../../../types/task-status';
import TaskRow from './TaskRow';

type TaskTableProps = {
  tasks: Task[];
  projectName: string;
  handleStatusChange: (id: string, newStatus: TaskStatus) => void;
};

function TaskTable({ tasks, projectName, handleStatusChange }: TaskTableProps) {
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion
      expanded={expanded}
      onChange={(_, exp) => {
        setExpanded(exp);
      }}
    >
      <AccordionSummary>{projectName}</AccordionSummary>
      <AccordionDetails>
        <div className='overflow-x-auto'>
          <Table size='md' hoverRow>
            <thead>
              <tr className='block lg:table-row'>
                <th className='min-w-[200px] lg:max-w-1/3'>Task</th>
                <th className='min-w-[200px]'>Status</th>
                <th className='min-w-[80px]'>Hours</th>
                <th className='min-w-[80px]'>Due Date</th>
                <th className='w-1/12'></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <TaskRow key={task.id} task={task} handleStatusChange={handleStatusChange} />
              ))}
            </tbody>
          </Table>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default TaskTable;
