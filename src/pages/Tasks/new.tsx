import NewTaskForm from '../../components/modules/Task/NewTask/NewTaskForm';
import useHttp from '../../hooks/useHttp';
import { BareboneTask } from '../../types/task';
import {
  NotificationDescriptions,
  NotificationTitles,
  RequestMethods,
} from '../../utils/constants';

const NewTaskPage = () => {
  const { sendRequest } = useHttp<BareboneTask>('/tasks/create', RequestMethods.POST);

  const handleOnSubmit = async (payload: BareboneTask) => {
    const modifiedPayload = {
      ...payload,
      notification: {
        title: NotificationTitles.NEW_TASK,
        description: NotificationDescriptions.NEW_TASK,
      },
    };

    await sendRequest({}, { modifiedPayload });
  };

  return <NewTaskForm onSubmit={handleOnSubmit} />;
};

export default NewTaskPage;
