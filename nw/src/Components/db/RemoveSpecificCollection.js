import firebase from "./firebase";

async function removeSpecificCollection(collectionName) {
  const db = firebase.firestore();
  const RequestRef = await db
    .collection("collections")
    .where("name", "==", collectionName)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      snapshot.forEach(async doc => {
        console.log(doc.id);
        let deleteDoc = await db
          .collection("collections")
          .doc(`${doc.id}`)
          .delete();
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}
export default removeSpecificCollection;
