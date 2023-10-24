import { ContractsContainer } from "../components";
import { useContracts } from "../hooks/useContracts";
import Layout from "../layout";

const Contracts = () => {
  const { contracts } = useContracts();

  return (
    <Layout>
      <ContractsContainer contracts={contracts} />
    </Layout>
  );
};

export default Contracts;
