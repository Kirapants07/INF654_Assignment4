// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {getFirestore, collection, getDocs, onSnapshot, addDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

//get data from collection Box
async function getBoxes(db){
    const boxesCol = collection(db, "Box");
    const boxSnapshot = await getDocs(boxesCol);
    const BoxList = boxSnapshot.docs.map((doc) => doc);
    return BoxList;
}


// getBoxes(db).then((docs) => {
//     docs.forEach((doc) => {
//         render(doc);
//     });
// });

const unsub = onSnapshot(collection(db, "Box"), (doc) =>{
    //console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        //console.log(change.doc.data(), change.doc.id);
        if(change.type === "added") {
            //call render function in ui
            render(change.doc.data(), change.doc.id);
        }
        if(change.type === "removed") {
            //do something
        }
    });
});

