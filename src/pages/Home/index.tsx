import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';

const Home = () => {
  return (
    <main className='grid grid-cols-1 lg:grid-cols-3 gap-4 h-full'>
      <section className='bg-[#FAFAFA] rounded-xl basis-4/6 p-10 lg:col-span-2 font-["Didot"] shadow-lg'>
        <h1 className='text-[34px]'>MY PROJECTS </h1>
        <ComponentPlaceholder />
      </section>
      <section className='bg-[#FAFAFA] rounded-xl basis-2/6 p-10 font-["Didot"] shadow-lg'>
        <h1 className='text-[34px]'>CLIENTS</h1>
        <ComponentPlaceholder />
      </section>
    </main>
  );
};

export default Home;
