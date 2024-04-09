import Layout from "../../components/common/Layout";
import CardContainer from "../../components/common/CardContainer";

const Clients = () => {
  return (
    <Layout>
      <main className="p-10 py-4 flex gap-4">
        <h1>Clients Page</h1>
        <p>Welcome to the Clients page!</p>
        <CardContainer>Hello</CardContainer>
      </main>
    </Layout>
  );
};

export default Clients;
