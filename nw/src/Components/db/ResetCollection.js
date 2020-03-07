import firebase from "./firebase";
async function resetCollection() {
  const db = firebase.firestore();
  const RequestRef = await db
    .collection("collections")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log("Collections is empty");
        return;
      }
      snapshot.forEach(async doc => {
        //console.log(doc.id);
        let deleteDoc = await db
          .collection("collections")
          .doc(`${doc.id}`)
          .delete();
      });
    })
    .catch(err => {
      console.log("Error getting documents", err);
      return err;
    });
}
export default resetCollection;
