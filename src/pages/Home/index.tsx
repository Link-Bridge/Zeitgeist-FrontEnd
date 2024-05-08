import ComponentPlaceholder from '../../components/common/ComponentPlaceholder';

const Home = () => {
  const { employee } = useContext(EmployeeContext);
  const employeeId = employee?.employee.id;

  const req = useHttp<ResponseEntity<HomeEntity>>(`/home/${employeeId}`, RequestMethods.GET);
  const [homeData, setHomeData] = useState<HomeEntity>();
  const [isLoading, setIsLoading] = useState(req.loading);

  useEffect(() => {
    if (employeeId) req.sendRequest();
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employeeId]);

  useEffect(() => {
    if (req.data) {
      setHomeData(req.data.data);
      setIsLoading(false);
    }
  }, [req.data]);

  function findCompanyNameById(id: string): string | undefined {
    const foundCompany = homeData?.companies.find(company => company.id === id);
    return foundCompany ? foundCompany.name : undefined;
  }

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
