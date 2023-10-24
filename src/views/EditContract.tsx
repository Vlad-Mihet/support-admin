import { useNavigate, useParams } from "react-router-dom";
import styles from "../assets/styles/views/EditContract.module.scss";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../modules/firebase";
import { useEffect, useState } from "react";
import { Contract } from "../types";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import ContractForm from "../components/ContractsContainer/ContractForm";
import Layout from "../layout";

const EditContract = () => {
  const [name, setName] = useState("");
  const [header, setHeader] = useState("");
  const [link, setLink] = useState("");

  const [content, setContent] = useState(() => EditorState.createEmpty());
  const [contractContent, setContractContent] = useState(() =>
    EditorState.createEmpty()
  );

  const navigate = useNavigate();

  const { contractId } = useParams<{ contractId: string }>();

  const retrieveContractData = async (contractId: string) => {
    // Retrieve contract data from Firestore

    const contractsRef = doc(db, "contracts", contractId);
    const contractSnap = await getDoc(contractsRef);

    if (contractSnap.exists()) {
      const { name, header, link, content, contractContent } =
        contractSnap.data() as Contract;

      setName(name);
      setHeader(header);
      setLink(link);

      const contentState = convertFromRaw(content);
      const contractContentState = convertFromRaw(contractContent);

      setContent(EditorState.createWithContent(contentState));
      setContractContent(EditorState.createWithContent(contractContentState));
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (!contractId) return;

    retrieveContractData(contractId);
  }, [contractId]);

  const handlePublishedEditedContract = async () => {
    if (!contractId) return;

    try {
      // Update contract in Firestore
      const contractRef = doc(db, "contracts", contractId);

      const rawContentState = convertToRaw(content.getCurrentContent());
      const rawContractContentState = convertToRaw(
        contractContent.getCurrentContent()
      );

      await updateDoc(contractRef, {
        name,
        header,
        link,
        content: rawContentState,
        contractContent: rawContractContentState,
      });

      alert("Contract updated successfully!");

      // Clear form
      setName("");
      setContent(EditorState.createEmpty());
      setHeader("");
      setContractContent(EditorState.createEmpty());
      setLink("");

      // Redirect to contract view
      navigate(`/contracts/${contractId}`);
    } catch (error) {
      console.error("Error updating contract: ", error);
    }
  };

  return (
    <Layout>
      <div className={styles["edit-contract"]}>
        <div className={styles["edit-contract__content"]}>
          <h1>Edit Contract</h1>
          <ContractForm
            name={name}
            setName={setName}
            header={header}
            setHeader={setHeader}
            content={content}
            setContent={setContent}
            contractContent={contractContent}
            setContractContent={setContractContent}
            handlePublishContract={handlePublishedEditedContract}
          />
        </div>
      </div>
    </Layout>
  );
};

export default EditContract;
