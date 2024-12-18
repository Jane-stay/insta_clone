
let modalButton = document.getElementById("modal-setting");
let closeButton = document.getElementById("close");
let modal = document.getElementById("modal");



modalButton.addEventListener("click", ()=>{
modal.classList.add("visible");
}
)

closeButton.addEventListener("click", ()=>{
modal.classList.remove("visible");
modal.classList.add("invisible");
})