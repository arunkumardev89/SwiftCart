import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, set,push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://messenger-2d925-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ListInDB = ref(database, "users")

let name=document.getElementById("uname")
let pass=document.getElementById("password")
let signUpBtn = document.getElementById("signup-btn")
let itemsDisplay=document.getElementById("items-display")

let uname=""
let pword=""



signUpBtn.addEventListener("click", function(){
    uname=name.value 
    pword=pass.value 
    
    if(uname.trim() !== "" && pword.trim()!=="")
    {  
        if(pword.length<6)
        {
             itemsDisplay.innerText="password cannot be less than 6 characters"
        }
        else{
           console.log("created")
            push(ListInDB, { username: uname, password: pword })
            window.location.href = 'index.html';
        }
    }
    else{
        itemsDisplay.innerText="username and password cannot be empty"
    }
})