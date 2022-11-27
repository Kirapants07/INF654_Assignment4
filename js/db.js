// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {getFirestore, collection, getDocs, onSnapshot} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXs5EqmXzHzw49sUOrgFE-4B2q83qePPg",
    authDomain: "boxes-d9710.firebaseapp.com",
    projectId: "boxes-d9710",
    storageBucket: "boxes-d9710.appspot.com",
    messagingSenderId: "21099836371",
    appId: "1:21099836371:web:b81cba976511f42386b526"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Troubleshoot ME! **************************************************************** week 10 lecture:Connecting to a database
//get data from collection Boxes
async function getBoxes(db){
    const boxesCol = collection(db, "Box");
    const boxSnapshot = await getDocs(boxesCol);
    const BoxList = boxSnapshot.docs.map((doc) => doc);
    return BoxList;
}

// console.log(getBoxes(db));

getBoxes(db).then((docs) => {
    docs.forEach((doc) => {
        console.log(doc.data());
    });
});

// const unsub = onSnapshot(collection(db, "Box"), (doc) =>{
//     //console.log(doc.docChanges());
//     doc.docChanges().forEach((change) => {
//         //console.log(change.doc.data(), change.doc.id);
//         if(change.type === "added") {
//             //do something
//         }
//         if(change.type === "removed") {
//             //do something
//         }
//     });
// });