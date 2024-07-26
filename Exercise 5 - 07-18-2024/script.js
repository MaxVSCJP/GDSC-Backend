
const time = document.getElementById("timer");
const timeKeeper = document.getElementById("TimeKeeper");
const countdown = document.createElement("p");
let nowTime;
let intervalID;

time.addEventListener("keypress", (eve) => {
    if(eve.key === "Enter"){
        countdown.textContent = time.value;
        timeKeeper.appendChild(countdown);
        nowTime = countdown.textContent;
        countTime();
    }

});

function countTime(){
intervalID = setInterval(() => {
    nowTime = nowTime - 1;
    countdown.textContent = nowTime;
    timeKeeper.appendChild(countdown);
    if(countdown.textContent === "0"){
        alert("Time's Up");
        console.log("Time's Up");
        clearInterval(intervalID);
    }
}, 1000);


}
