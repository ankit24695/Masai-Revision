const hamburger = document.querySelector(".hamburger");
const options = document.querySelector("#options");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    options.classList.toggle("active");
})