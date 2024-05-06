
const button = document.querySelector('.btn');
let taskCounter = 0;

let storedElements =  () => {
    taskCounter++;

    const createElements = `
    <div id="actualinput">
        <label for="inputUser" >Enter Your Task ${taskCounter}</label>
      
            <textarea maxlength="300" name="" id="inputUser" cols="29" rows="7" style="resize: none;"></textarea>
            <i class="bi bi-x-square-fill"></i>
        </div>
    `;

    document.querySelector('#main').insertAdjacentHTML('beforeend', createElements);

    const existingConfirmButton = document.querySelector('.confirmButton');
    if (existingConfirmButton) {
        existingConfirmButton.remove();
    }

    document.querySelector('#main').insertAdjacentHTML('beforeend', `
        <div class="confirmButton">
            <button id="cBtn">
                <span class="text">Confirm</span>
            </button>
        </div>
    `);
   crossAndAdjust()
   displayResult()
};

button.addEventListener('click',storedElements);

let crossAndAdjust = ()=>{
    let crossSign = document.querySelectorAll('.bi')
    crossSign.forEach((x)=>{
        x.addEventListener('click',()=>{
         x.parentElement.remove();
         taskCounter--
         updateTaskLabels()
        })
    })
};
let updateTaskLabels = ()=>{
    let labels = document.querySelectorAll('label[for="inputUser"]');
    labels.forEach((label,index)=>{
        label.innerText = `Enter Your Task ${index+1}`
    })
    taskCounter = labels.length;
};
let displayResult = () => {
    let confirmButton = document.getElementById('cBtn');
    confirmButton.addEventListener('click',()=>{
       emptyInputFix()
      
  })
};
let emptyInputFix = () => {
    let textAreas = document.querySelectorAll('#inputUser');
    let isEmptyTask = false; // Flag to track if an empty task is found

    textAreas.forEach((x) => {
        if (x.value === '') {
            isEmptyTask = true; // Set flag to true if an empty task is found
        }
    });

    if (isEmptyTask) {
        window.alert(`Task cannot be empty`);
    } else {
      Data()
    }
};

let keys = [];
let Data = ()=>{
    let textAreas = document.querySelectorAll('#inputUser');
    document.querySelector('.hidemain').style.display = 'none';
        document.querySelector('#loader').classList.remove('hide');
        setTimeout(() => {
            document.querySelector('#loader').classList.add('hide');
            document.querySelector('#result').classList.remove('hideBorders');
            textAreas.forEach((x,index)=>{
              
                keys.push(x.value);
                let currentTimeStamp = new Date().getTime()
                let dataObject = {
                        value: keys,
                        time:  currentTimeStamp
                }
             
            localStorage.setItem('data-toDo-Array',JSON.stringify(dataObject));
                
                let newDiv = `<div class="outputs card">
                <h3>Task ${index + 1}</h3>
               <p><strong>•</strong>${x.value}</p>
               </div>`;
              document.querySelector('#result').insertAdjacentHTML('beforeend',newDiv)

            });
            
            let goBackBtn = `<div id="edit">
            <button id="funcBack"  class="button" role="button">Go Back</button>
            </div>
            `;
            let removeAllTasksBtn = `<button class="button" id="remove">Remove All Tasks</button>`
            document.querySelector('#result').insertAdjacentHTML('beforeend',goBackBtn);
            document.querySelector('#edit').insertAdjacentHTML('beforeend',removeAllTasksBtn);
          goBack();
          removeTasks();
           
        }, 3000);
};
let goBack = () => {
        document.querySelector('#funcBack').addEventListener('click',()=>{
         window.location.reload();
         })
};
// Check if there is any data stored in local storage
let goBackAgain = ()=>{
    document.querySelector('#funcBackAgain').addEventListener('click',()=>{
        window.location.reload();
    })
};
// If there is data, display the stored tasks directly



     let values = JSON.parse(localStorage.getItem('data-toDo-Array'));
    
     let viewTasks = ()=>{

        document.querySelector('#viewTasks').addEventListener('click',()=>{
             document.querySelector('.hidemain').style.display = 'none';
             document.querySelector('#viewtasksdiv').classList.remove('hideBordersAgain')
                values.value.forEach((x,index)=>{
                let newDivvv = `<div id = "re-View"  class= "outputs card">
                 <h3>Task ${index + 1}</h3>
                <p><strong>•</strong>${x}</p>
                </div>`;
               document.querySelector('#viewtasksdiv').insertAdjacentHTML('beforeend',newDivvv);
                })
                let goBackAgainBtn = `<div id="againBack">
     <button id = "funcBackAgain" class="button" role="button">Go Back</button>
     </div>`;
     let removeAllTasksBtnAgain = `<button class="button" id="removeAgain">Remove All Tasks</button>`
         document.querySelector('#viewtasksdiv').insertAdjacentHTML('beforeend',goBackAgainBtn);
         document.querySelector('#againBack').insertAdjacentHTML('beforeend',removeAllTasksBtnAgain);
         goBackAgain();
         removeTasksAgain();
        
         })
       
     };
   let checkForData = () => {
         if (values && values?.value !== null && values?.value.length > 0) {
             document.querySelector('#main').insertAdjacentHTML("afterbegin", `<button id="viewTasks" class="btn">View Already Added Tasks</button>`);
            viewTasks();
         } 
     };
    
     let checkAndRemoveExpiredData = () => {
     
        if (values?.time) {
            let currentTime = new Date().getTime();
            let twentyFourHours = 24 * 60 * 60 * 1000;
            if (currentTime - values.time >= twentyFourHours) {
                localStorage.removeItem('data-toDo-Array');
                document.querySelector('#viewTasks').style.display = 'none';
              
            }
        }
    };

    
window.onload = function() {
    checkForData();
 checkAndRemoveExpiredData();
   
}
let removeTasks = ()=>{
    document.querySelector('#remove').addEventListener('click',()=>{
            document.querySelectorAll('.outputs').forEach((x)=>{
                    x.remove()
            });
            localStorage.removeItem('data-toDo-Array');
            document.querySelector('#result').innerHTML = `<div class= removeMessage"><h3>All Tasks Removed</h3><div>
            <div id="edit">
            <button id="funcBack"  class="button" role="button">Go Back</button>
            <button class="button" id="remove">Remove All Tasks</button>
            </div>
            `
goBack();
})}

let removeTasksAgain = ()=>{
    document.querySelector('#removeAgain').addEventListener('click',()=>{
        document.querySelectorAll("#re-View").forEach((x)=>{
            x.remove()
    });
    localStorage.removeItem('data-toDo-Array');
    document.querySelector('#viewtasksdiv').innerHTML = `<div class= removeMessage"><h3>All Tasks Removed</h3><div>
    <div id="againBack">
         <button id = "funcBackAgain" class="button" role="button">Go Back</button>
         <button class="button" id="removeAgain">Remove All Tasks</button>
         </div>
    `
    goBackAgain();
    });
}
