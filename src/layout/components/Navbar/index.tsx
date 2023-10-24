import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./index.module.scss";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../modules/firebase";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { contractId } = useParams();

  const isOnContractsPage = location.pathname.includes("/contracts");

  const isOnViewContractPage =
    location.pathname.includes("/contracts/") && contractId;

  const isOnEditContractPage =
    location.pathname.includes("/contracts/") &&
    location.pathname.includes("/edit");

  const handleCreateContract = () => {
    navigate("/contracts/create");
  };

  const handleUpdateContract = () => {
    navigate(`/contracts/${contractId}/edit`);
  };

  const handleDeleteContract = async () => {
    if (!contractId) return;

    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this contract?"
      );

      if (confirmDelete) {
        await deleteDoc(doc(db, "contracts", contractId));

        window.alert("Contract deleted successfully!");

        navigate("/contracts");
      }

      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.wrapper}>
        <ul>
          <li>
            <Link to="/">Chats</Link>
          </li>
          <li>
            <Link to="/contracts">Contracts</Link>
          </li>
        </ul>
        {isOnViewContractPage || isOnContractsPage ? (
          <div className={styles["wrapper__contract-actions"]}>
            {isOnViewContractPage && !isOnEditContractPage && (
              <>
                <button type="button" onClick={handleUpdateContract}>
                  Edit Contract
                </button>
                <button type="button" onClick={handleDeleteContract}>
                  Delete Contract
                </button>
              </>
            )}
            {isOnContractsPage && !isOnEditContractPage && (
              <button type="button" onClick={handleCreateContract}>
                Create Contract
              </button>
            )}
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
