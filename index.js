import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://messenger-2d925-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const ListInDB = ref(database, "users")

let name=document.getElementById("uname")
let pass=document.getElementById("password")
let submitBtn = document.getElementById("submit-btn")
let itemsDisplay=document.getElementById("items-display")
let signUpBtn = document.getElementById("signup-btn")

let username=""
let password=""
let arr=[]

signUpBtn.addEventListener("click",function(){
      window.location.href = 'signup.html';
})

submitBtn.addEventListener("click", function() {
    let flag=0
    username=name.value
    password=pass.value
    for(let i=0;i<arr.length;i++)
         {
              let currentItem=arr[i]
              console.log(currentItem.username+" "+currentItem.password)
              if(currentItem[1].username===username&&currentItem[1].password===password)
              {
                    console.log("correct")
                    flag=1
                    sessionStorage.setItem('username', username);
                    name.value=""
                    pass.value=""
                    window.location.href = 'homepage.html';
                    break
              }
              else{
                //  console.log('wrong')
              }
         }
         if(flag==0)
         { 
             itemsDisplay.innerText="Wrong Credentails"
             
         }
        
})

onValue(ListInDB, function(snapshot) {
    if(snapshot.exists())// can use snapshots.val()
    { 
         let itemsArray=Object.entries(snapshot.val())
         arr=itemsArray
        
        
    }
   
   
})