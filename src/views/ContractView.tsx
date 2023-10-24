import styles from "../assets/styles/views/ContractView.module.scss";
import { useParams } from "react-router-dom";
import Layout from "../layout";
import { useEffect, useMemo, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../modules/firebase";

import type { Contract } from "../types";
import RichTextEditor from "../components/Editor";
import { EditorState, convertFromRaw } from "draft-js";

const ContractView = () => {
  const [contract, setContract] = useState<Contract | null>(null);

  const { contractId } = useParams();

  const retrieveContractData = async (contractId: string) => {
    // Retrieve contract data from Firestore

    const contractsRef = doc(db, "contracts", contractId);
    const contractSnap = await getDoc(contractsRef);

    if (contractSnap.exists()) {
      setContract(contractSnap.data() as Contract);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (!contractId) return;

    retrieveContractData(contractId);
  }, [contractId]);

  const contractContent = useMemo(() => {
    if (
      !contract?.contractContent ||
      typeof contract?.contractContent === "string"
    ) {
      return convertFromRaw({
        blocks: [],
        entityMap: {},
      });
    }

    return convertFromRaw(contract?.contractContent);
  }, [contract?.contractContent]);

  const content = useMemo(() => {
    if (!contract?.content || typeof contract?.content === "string")
      return convertFromRaw({
        blocks: [],
        entityMap: {},
      });

    return convertFromRaw(contract?.content);
  }, [contract?.content]);

  const handleCopyContractLink = async () => {
    // Copy contract link to clipboard

    await navigator.clipboard.writeText(contract?.link || "");

    window.alert("Copied contract link to clipboard!");
  };

  return (
    <Layout>
      <div className={styles["contract-view"]}>
        {contract && (
          <div className={styles["contract-view__content"]}>
            <h1>{contract?.name}</h1>
            <div className={styles["contract-view__content__field"]}>
              <p>Contract Header</p>
              <p>{contract?.header}</p>
            </div>
            <div className={styles["contract-view__content__field"]}>
              <p>Contract Content</p>
              <RichTextEditor
                state={EditorState.createWithContent(content)}
                isReadOnly
              />
            </div>
            <div className={styles["contract-view__content__field"]}>
              <p>Contract Content</p>
              <RichTextEditor
                state={EditorState.createWithContent(contractContent)}
                isReadOnly
              />
            </div>
            <div className={styles["contract-view__content__field"]}>
              <p>Contract Link</p>
              <div className={styles.wrapper}>
                <p>{contract?.link}</p>
                <button
                  type="button"
                  className={styles["copy-link"]}
                  onClick={handleCopyContractLink}>
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ContractView;
