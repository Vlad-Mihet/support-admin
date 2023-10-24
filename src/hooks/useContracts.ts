import { useEffect, useState } from "react";
import { Contract } from "../types";
import { db } from "../modules/firebase";
import { collection, getDocs } from "firebase/firestore";

export const useContracts = (): { contracts: Contract[] } => {
  const [contracts, setContracts] = useState<Contract[]>([]);

  const handleRetrieveContracts = async () => {
    // Retrieve contracts from firebase firestore

    const contractsRef = collection(db, "contracts");

    const contractsSnapshot = await getDocs(contractsRef);

    const contractsData: Contract[] = contractsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as any[];

    if (!contractsData) return;

    setContracts(contractsData);
  };

  useEffect(() => {
    handleRetrieveContracts();
  }, []);

  return { contracts };
};
