import styles from "../assets/styles/views/CreateContract.module.scss";
import { useState } from "react";
import ContractForm from "../components/ContractsContainer/ContractForm";
import Layout from "../layout";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../modules/firebase";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

const CreateContract = () => {
  const [name, setName] = useState("");
  const [header, setHeader] = useState("");
  const [link, setLink] = useState("");

  const [content, setContent] = useState(() => EditorState.createEmpty());
  const [contractContent, setContractContent] = useState(() =>
    EditorState.createEmpty()
  );

  const navigate = useNavigate();

  const handlePublishContract = async () => {
    try {
      // Create contract in Firestore

      const rawContentState = convertToRaw(content.getCurrentContent());
      const rawContractContentState = convertToRaw(
        contractContent.getCurrentContent()
      );

      const contractData = {
        name,
        content: rawContentState,
        header,
        contractContent: rawContractContentState,
        link,
      };

      const contract = await addDoc(collection(db, "contracts"), contractData);

      const contractId = contract.id;

      const contractLink = `localhost:3000/${contractId}`;

      await updateDoc(doc(db, "contracts", contractId), {
        link: contractLink,
      });

      alert("Contract created successfully!");

      // Clear form
      setName("");
      setContent(EditorState.createEmpty());
      setHeader("");
      setContractContent(EditorState.createEmpty());
      setLink("");

      // Navigate to contracts page
      navigate("/contracts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className={styles["create-contract"]}>
        <div className={styles["create-contract__content"]}>
          <h1>Create Contract</h1>
          <ContractForm
            name={name}
            header={header}
            content={content}
            contractContent={contractContent}
            setName={setName}
            setContent={setContent}
            setHeader={setHeader}
            setContractContent={setContractContent}
            handlePublishContract={handlePublishContract}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CreateContract;
