const allCheckBox = document.querySelectorAll(".custom-checkbox");
const allInput =document.querySelectorAll(".goal-input");
const errorMessage = document.querySelector(".error-message")
const progressBar = document.querySelector(".progress-bar")
const progressValue = document.querySelector(".progress-value")
const progressText = document.getElementById("progress-text");

console.log(errorMessage)


const allQuotes = [
    'Raise the bar by completing your goals!',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals, time for chill :D',
  ]

progressText.innerText = allQuotes[0];

const allGoals = JSON.parse(localStorage.getItem("allGoals"))|| {} 
console.log(allGoals);
let completedGoalCount = Object.values(allGoals).filter((goal)=>goal.completed).length;



progressValue.style.width=`${completedGoalCount / 3 *100}%`;
 progressValue.firstElementChild.innerHTML = `${completedGoalCount}/3`;

console.log(completedGoalCount);


allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener("click", (e)=>{

       const allInputFilled = [...allInput].every((input)=>{
             return input.value
        })

        if (allInputFilled) {
            checkbox.parentElement.classList.toggle("completed");
            progressValue.style.width="33.33%";
            const inputId = checkbox.nextElementSibling.id;
            console.log(allGoals[inputId]);
            allGoals[inputId].completed = ! allGoals[inputId].completed;
            completedGoalCount = Object.values(allGoals).filter((goal)=>goal.completed).length;
            progressText.innerText = allQuotes[completedGoalCount]
            progressValue.style.width=`${completedGoalCount / 3 *100}%`;
            progressValue.firstElementChild.innerHTML = `${completedGoalCount}/3`
            localStorage.setItem('allGoals',JSON.stringify(allGoals))
            
            
        }
        else{
            progressBar.classList.add("show-error")
        }
    })
    
})


allInput.forEach((input)=>{

    input.value = allGoals[input.id].name

    if(allGoals[input.id].completed){
        input.parentElement.classList.add("completed");
    }
input.addEventListener("focus",()=>{
    progressBar.classList.remove("show-error")
})
input.addEventListener("input",(e)=>{

    if (allGoals[input.id].completed) {
        input.value = allGoals[input.id].name;
        return
    }
allGoals[input.id]={
    name:input.value,
    completed:false
}
localStorage.setItem('allGoals',JSON.stringify(allGoals))
})
})

