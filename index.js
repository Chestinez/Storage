import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: 'https://test-8135d-default-rtdb.asia-southeast1.firebasedatabase.app/'
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const notesDb = ref(database, 'notepad');

const inputField = document.getElementById('input-field');
const buttonField = document.getElementById('button-field');
const noteList = document.getElementById('note-list');



function clearInputField() {
    inputField.value = '';
};

function clearNoteList() {
    noteList.innerHTML = '';
};

function appendInputInList(item) {
    
    let itemId = item[0];
    let itemValue = item[1];
    
    let newLi = document.createElement('li');
    newLi.textContent = itemValue;

    newLi.addEventListener('click', function() {
        let itemIdLocation = ref(database, `notepad/${itemId}`);
        
        remove(itemIdLocation);
    });

    noteList.append(newLi);
};


buttonField.addEventListener('click', function() {
    let input = inputField.value;
        
    push(notesDb, input);

    clearInputField();

});

onValue(notesDb, function(snapshot) {
    
  if (snapshot.exists()) {
    let notesArray = Object.entries(snapshot.val());
    
    clearNoteList();

    for (let i = 0; i < notesArray.length; i++) {
       
       let notes = notesArray[i];
       let notesId = notes[0];
       let notesIdValue = notes[1];

       appendInputInList(notes);
    };

 } else {
    noteList.innerHTML = 'No notes yet :(';
 }

});
