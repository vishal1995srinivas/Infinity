import firebase from "./firebase";
async function addHistory(Historydata) {
  //working good
  const db = firebase.firestore();
  const historyRef = await db.collection("history").add(Historydata);
}
export default addHistory;
