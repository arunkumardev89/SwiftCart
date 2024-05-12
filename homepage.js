import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://messenger-2d925-default-rtdb.firebaseio.com/" 
    // database url
}

let username = sessionStorage.getItem('username')
console.log(username)

let inputVal=document.getElementById("input-field")
const inputBtn=document.getElementById("input-btn")
let itemsDisplay=document.getElementById("items-display")
const signoutBtn=document.getElementById('signout-btn')
const app = initializeApp(appSettings)// initializing the urll
const database = getDatabase(app) // retrive the database connection
 
 window.addEventListener('beforeunload', function() {
    sessionStorage.removeItem('username');
});

 if (!username) {
    // If username is not found in session storage, redirect to login page
    window.location.href = 'index.html';
}

signoutBtn.addEventListener("click",function(){
    sessionStorage.removeItem('username');
    window.location.href = 'index.html';


})

const shoppingListInDB = ref(database, username) // connecting to database and adding object to it




onValue(shoppingListInDB, function(snapshot){
// retriving data from firebase database in realtime
   if(snapshot.exists())// can use snapshots.val()
    {
    let itemsArray=Object.entries(snapshot.val())
    clearInnerHtml()
    for(let i=0;i<itemsArray.length;i++)
    {
        let currentItem=itemsArray[i]
        displayItems(currentItem)
    }
    }
    else{
       itemsDisplay.innerHTML=`<p id="no-items">No Items here... yet</p>`
    }   
})


inputBtn.addEventListener("click", function() {
    let inputValue = inputVal.value
    if(inputValue!=="")
    { 
     // to add user input to data base 
      push(shoppingListInDB, inputValue)
        
    }
    else{
        window.alert("Cannot add empty item, please Enter item name to be added")
    }
    clearInputVal()
})

function clearInputVal(){
        inputVal.value="" // to clear user input value
}


function displayItems(newitem){
   // itemsDisplay.innerHTML+=`<button class='items-el'>${newitem}</button> ` // to display elements
  //itemsDisplay.innerHTML+=`<li>${newitem}</li> ` // to display elements
  
 let ItemID= newitem[0]
  let Item = newitem[1]
  let newEl=document.createElement("li")
  newEl.textContent=Item
  newEl.addEventListener("dblclick", function(){
    let exactLocationOfItemInDb= ref(database, `${username}/${ItemID}`) 
      remove(exactLocationOfItemInDb)
 
  })
  itemsDisplay.append(newEl)
}


function clearInnerHtml(){
    itemsDisplay.innerHTML="" // to clear the dom 
}

