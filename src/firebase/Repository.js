import {
  collection,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./Firebase";

export async function addHit(word) {
  try {
    word.hits += 1;
    await updateDoc(doc(db, "SnapLearn", word.id), { ...word });
    return true;
  } catch (e) {
    return false;
  }
}

export async function addMiss(word) {
  try {
    word.misses += 1;
    await updateDoc(doc(db, "SnapLearn", word.id), { ...word });
    return true;
  } catch (e) {
    return false;
  }
}

export async function addWord(word) {
  try {
    let doc = await addDoc(collection(db, "SnapLearn"), word);
    return doc.id;
  } catch (e) {
    return null;
  }
}

export async function removeWord(id) {
  try {
    await deleteDoc(doc(db, "SnapLearn", id));
    return true;
  } catch (e) {
    return false;
  }
}
