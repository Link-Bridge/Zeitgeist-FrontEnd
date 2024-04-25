import { ProjectsClientList } from '../../Projects/ProjectsClientList';

type ClientDetailProps = {
  clientId: string;
};

/**
 * Client Details Page page
 *
 * @component
 * @param {ClientDetailProps} props - Page props
 * @param {string} props.clientId - The id of the client
 *
 * @returns {JSX.Element} Client details page
 */

const ClientDetails = ({ clientId }: ClientDetailProps) => {
  return (
    <main className='bg-white rounded-xl p-6'>
      <ProjectsClientList clientId={clientId} />
    </main>
  );
};

export default ClientDetails;
