import firebase from "./firebase";
async function addCollection(newCollection) {
  //newcolelction as param
  const db = firebase.firestore();
  const collectionRef = await db.collection("collections").add(newCollection);
}
export default addCollection;
