import React from 'react';
import useHttp from '../../../hooks/useHttp';
import { RequestMethods } from '../../../utils/constants';

enum TaskStatus {
  NOT_STARTED = 'NOT STARTED',
  IN_PROGRESS = 'IN PROGRESS',
  UNDER_REVISSION = 'UNDER REVISSION',
  DELAYED = 'DELAYED',
  POSTPONED = 'POSTPONED',
  DONE = 'DONE',
  CANCELLED = 'CANCELLED',
}

type taskData = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  waitingFor?: string;
  startDate: Date;
  endDate?: Date;
  workedHours?: Number;
  createdAt: Date;
  updatedAt?: Date;
  idProject: string;
};

const CreateTaskComponent = () => {
  const { data, error, loading, sendRequest } = useHttp<taskData>(
    '/tasks/create',
    RequestMethods.POST
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data && <div>{data.title}</div>}
    </div>
  )
};

export default CreateTaskComponent;
