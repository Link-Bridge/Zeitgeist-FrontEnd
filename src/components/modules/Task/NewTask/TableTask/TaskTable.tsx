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
        <Table size='md' hoverRow>
          <thead>
            <tr>
              <th style={{ width: '30%' }}>Task</th>
              <th>Status</th>
              <th>Hours</th>
              <th>Due Date</th>
              <th style={{ width: '10%' }}></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(task => (
              <TaskRow key={task.id} task={task} handleStatusChange={handleStatusChange} />
            ))}
          </tbody>
        </Table>
      </AccordionDetails>
    </Accordion>
  );
}

export default TaskTable;
