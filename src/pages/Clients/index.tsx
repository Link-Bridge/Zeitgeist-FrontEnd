import Layout from "../../components/common/Layout";
import CardContainer from "../../components/common/CardContainer";
import AddButton from "../../components/common/AddButton";
import CardsGrid from "../../components/common/CardsGrid";
import ClientCard from "../../components/common/ClientCard";


const clients = [
  {
      id:1,
      name: "Pollman México",
      accountingHours: 20,
      legalHours: 15,
      chargeableHours: 10,
      totalProjects: 5,
  },
  {
      id:2,
      name: "Pollman México",
      accountingHours: 20,
      legalHours: 15,
      chargeableHours: 10,
      totalProjects: 5,
  },
  {
      id:3,
      name: "Pollman México",
      accountingHours: 20,
      legalHours: 15,
      chargeableHours: 10,
      totalProjects: 5,
  },
  {
      id:4,
      name: "Pollman México",
      accountingHours: 20,
      legalHours: 15,
      chargeableHours: 10,
      totalProjects: 5,
  },
  {
      id:5,
      name: "Pollman México",
      accountingHours: 20,
      legalHours: 15,
      chargeableHours: 10,
      totalProjects: 5,
  },
  {
      id:6,
      name: "Pollman México",
      accountingHours: 20,
      legalHours: 15,
      chargeableHours: 10,
      totalProjects: 5,
  },
]

const Clients = () => {
  return (
    <Layout>
      <main className="p-10 py-4 flex flex-col gap-4">
      <section className='flex flex-row justify-end p-5 gap-6'>
          <button>Not Archived</button>
          <AddButton/>
        </section>
        <CardsGrid>
          {clients.map((client) => (
            <ClientCard 
                name={client.name}
                accountingHours= {client.accountingHours}
                legalHours= {client.legalHours}
                chargeableHours= {client.chargeableHours}
                totalProjects= {client.totalProjects}
              />
          ))}
        </CardsGrid>
      </main>
    </Layout>
  );
};

export default Clients;
