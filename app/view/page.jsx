"use client";
import DataShow from "@/components/DataShow";
import { app } from "../../firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export default async function View() {
  const db = getFirestore(app);
  const querySnapshot = await getDocs(collection(db, "data"));
  const documents = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return <DataShow data={documents} />;
}
