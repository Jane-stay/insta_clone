
let modalButton = document.getElementById("modal-setting");
let closeButton = document.getElementById("close");
let modal = document.getElementById("modal");
let body = document.querySelector("body");
let close = document.querySelector(".close");

modalButton.addEventListener("click", ()=>{
modal.classList.add("visible");
body.classList.add("darkback");
close.classList.add("visible");
}
)

closeButton.addEventListener("click", ()=>{
modal.classList.remove("visible");
body.classList.remove("darkback");
close.classList.remove("visible");
})