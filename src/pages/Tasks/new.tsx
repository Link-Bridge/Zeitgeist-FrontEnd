import NewTaskForm from '../../components/modules/Task/NewTask/NewTaskForm';
import useHttp from '../../hooks/useHttp';
import { BareboneTask } from '../../types/task';
import { RequestMethods } from '../../utils/constants';

const NewTaskPage = () => {
  const { sendRequest } = useHttp<BareboneTask>('/tasks/create', RequestMethods.POST);

  const handleOnSubmit = async (payload: BareboneTask) => {
    await sendRequest({}, { ...payload });
  };

  return <NewTaskForm onSubmit={handleOnSubmit} />;
};

export default NewTaskPage;
