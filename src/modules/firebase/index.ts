/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-cycle */
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/functions";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./config";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";
import { getDatabase } from "firebase/database";

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

const functions = getFunctions(app);

const rdb = getDatabase(app);

export {
  app,
  storage,
  db,
  auth,
  functions,
  rdb,
};

export default app;
