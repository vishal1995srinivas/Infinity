import firebase from "./firebase";
async function addRequestToCollection(collectionName) {
  //add newRequest a param
  let id = Date.now();
  let newRequest = {
    id: id,
    title: "Sample",
    url: "www.google.com",
    method: "GET"
  };
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
      snapshot.forEach(doc => {
        console.log(doc.id);
        let updateRef = db.collection("collections").doc(`${doc.id}`);
        let elementRef = updateRef.update({
          requests: firebase.firestore.FieldValue.arrayUnion(newRequest)
        });
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
  // console.log(RequestRef);
}
export default addRequestToCollection;
