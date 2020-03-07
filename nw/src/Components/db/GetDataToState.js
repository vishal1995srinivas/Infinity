import firebase from "./firebase";

async function getDataToState() {
  let newHistoryState = [];
  let newCollectionsState = [];
  const db = firebase.firestore();
  let historyRef = db.collection("history");
  let collectionsRef = db.collection("collections");
  let allHistory = historyRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        newHistoryState.push(doc.data());
      });
      console.log(newHistoryState);
      return newHistoryState;
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return err;
    });

  let allCollections = collectionsRef
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        newCollectionsState.push(doc.data());
      });
      console.log(newCollectionsState);
      return newCollectionsState;
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return err;
    });
}
export default getDataToState;
