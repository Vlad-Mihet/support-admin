import styles from "./index.module.scss";
import { Contract } from "../../types";
import { useNavigate } from "react-router-dom";

interface Props {
  contracts: Contract[];
}

const ContractsContainer = ({ contracts }: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles["contracts-container"]}>
      <div className={styles["contracts-container__sidebar"]}>
        <ul>
          {contracts.map((contract) => (
            <li
              key={contract.id}
              className={styles["contracts-container__sidebar__item"]}
              onClick={() => {
                navigate(`/contracts/${contract.id}`);
              }}>
              <p>{contract.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["contracts-container__contract"]}></div>
    </div>
  );
};

export default ContractsContainer;
