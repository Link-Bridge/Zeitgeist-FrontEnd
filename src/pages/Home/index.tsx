// const Home = () => {
//   return (
//     <main className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
//       <section className='bg-[#FAFAFA] rounded-xl basis-4/6 p-10 lg:col-span-2 font-["Didot"] shadow-lg'>
//         <h2 className='text-[34px]'>MY PROJECTS </h2>
//       </section>
//       <section className='bg-[#FAFAFA] rounded-xl basis-2/6 p-10 font-["Didot"] shadow-lg'>
//         <h2 className='text-[34px]'>CLIENTS</h2>
//       </section>
//     </main>
//   );
// };

// export default Home;

import { useState } from 'react';
import EditClientButton from '../../components/modules/Clients/EditClientButton';
import EditClientFormModal from '../../components/modules/Clients/EditClientFormModal';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(false); // Manage loading state during API calls

  // Example client data structure, adjust according to your actual data model
  const clientData = {
    name: 'Example Corp',
    email: 'contact@example.com',
    phoneNumber: '123-456-7890',
    rfc: 'EXMPL123456',
    constitutionDate: new Date(),
    taxResidence: 'USA',
  };

  return (
    <main className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
      <section className='bg-[#FAFAFA] rounded-xl basis-4/6 p-10 lg:col-span-2 font-["Didot"] shadow-lg'>
        <h2 className='text-[34px]'>MY PROJECTS</h2>
        {/* Place the EditClientButton here or wherever you see fit */}
        <EditClientButton loading={loading} onClick={() => setModalOpen(true)} />
      </section>
      <section className='bg-[#FAFAFA] rounded-xl basis-2/6 p-10 font-["Didot"] shadow-lg'>
        <h2 className='text-[34px]'>CLIENTS</h2>
        {/* Modal can be outside of sections since it's a full-screen overlay */}
        <EditClientFormModal
          open={isModalOpen}
          setOpen={setModalOpen}
          setRefetch={setRefetch}
          clientData={clientData}
        />
      </section>
    </main>
  );
};

export default Home;
