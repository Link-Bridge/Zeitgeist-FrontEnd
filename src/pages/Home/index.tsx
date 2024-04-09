import Layout from "../../components/common/Layout";

const Home = () => {
  return (
    <Layout>
      <main className="p-10 py-4 flex gap-4">
        <section className="bg-[#FAFAFA] rounded-xl basis-4/6 h-[750px] p-10"><h2 className="font-semibold text-[34px]">My Projects</h2></section>
        <section className="bg-[#FAFAFA] rounded-xl basis-2/6 h-[750px] p-10"><h2 className="font-semibold text-[34px]">Clients</h2></section>
      </main>
    </Layout>
  );
}

export default Home;
