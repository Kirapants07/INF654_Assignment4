// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {getFirestore, collection, getDocs, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, where, orderBy, serverTimestamp} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

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

const search = "";

//get all records in Box collection
const boxCollection = collection(db, "Box");
//get filtered records in Box collection
const boxQuery = query(boxCollection, orderBy("name"));

//get searchbar input with each letter
const searchbar = document.querySelectorAll(".search");
searchbar.forEach(bar => {
    bar.addEventListener('keyup', function(e){
        let currentword = e.target.value.toLowerCase();
        //if searchbar is not empty
        if (currentword.length == 0)
        {
            currentword = "";
        }
        console.log(currentword);
        const filteredData = boxArray.filter(box => box.data.items.toLowerCase().includes(currentword) || 
            box.data.name.toLowerCase().includes(currentword) );

        const boxes = document.querySelectorAll(".box");
        boxes.forEach((box) => {
            removeBox(box.getAttribute("data-id"));
        })
        filteredData.forEach((box) => {
            render(box.data, box.id);
            console.log("a box was loaded");
        })
    })
});

let boxArray = [];
//check for changes to collection and re-render when changes occur
const unsub = onSnapshot(boxQuery, (doc) =>{
    doc.docChanges().forEach((change) => {
        if(change.type === "added") {
            //call render function in ui
            render(change.doc.data(), change.doc.id);
            boxArray.push({ data: change.doc.data(), id: change.doc.id });
        }
        if(change.type === "modified") {
            //update array
            boxArray = boxArray.filter(box => box.id != change.doc.id);
            boxArray.push({ data: change.doc.data(), id: change.doc.id });

            //remove old box and re-render
            removeBox(change.doc.id);
            render(change.doc.data(), change.doc.id);
        }
        if(change.type === "removed") {
            //remove box from array
            boxArray = boxArray.filter(box => box.id != change.doc.id);

            //remove box from display
            removeBox(change.doc.id);
        }
    });
});

//Categories and chips setup
//check for changes to collection and re-render when changes occur
const unsubCategories = onSnapshot(collection(db, "Categories"), (doc) =>{
    //console.log(doc.docChanges());
    doc.docChanges().forEach((change) => {
        //console.log(change.doc.data(), change.doc.id);
        if(change.type === "added") {
            //call render function in ui
            //chipsarray.push(change.doc.data());
            renderchips(change.doc.data(), change.doc.id);
        }
        if(change.type === "removed") {
            //removeBox(change.doc.id);
        }
    });
});

//add new box
const boxmodal = document.querySelector(".add-box");
boxmodal.addEventListener("submit", (event) => {
    event.preventDefault();
    addDoc(collection(db, "Box"), {
        name: boxmodal.name.value,
        items: boxmodal.items.value,
        createdAt: serverTimestamp(),
        // categories: boxmodal.categories.value,
    }).catch((error) => console.log(error));
    //clear text fields
    boxmodal.reset();
});

// //update existing box
const editboxmodal = document.querySelector(".edit-box");
editboxmodal.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = editboxmodal.uniqueid.value;
    const upDoc = doc(db, "Box", id);
    updateDoc(upDoc, {
        name: editboxmodal.name.value,
        items: editboxmodal.items.value,
    }).catch((error) => console.log(error));
    //clear text fields
    editboxmodal.reset();
});

//populate form fields with existing box info
const fillBoxFields = document.querySelector("#boxes");
fillBoxFields.addEventListener("click", (event) => {
    if (event.target.textContent === 'edit') {
        editboxmodal.uniqueid.value= event.target.getAttribute("data-id");
        editboxmodal.name.value= event.target.getAttribute("boxname");
        editboxmodal.items.value= event.target.getAttribute("items");
    }
});

//delete box
const boxContainer = document.querySelector("#boxes");
boxContainer.addEventListener("click", (event) => {
    if (event.target.textContent === 'delete') {
        const id = event.target.getAttribute("data-id");
        deleteDoc(doc(db, "Box", id));
    }
});

