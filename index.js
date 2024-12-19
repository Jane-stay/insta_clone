
window.addEventListener('DOMContentLoaded', ()=>{
    const fileinput = document.getElementById("fileinput");
    const inputimg = document.getElementById("inputimg");

    let modalButton = document.getElementById("modal-setting");
    let closeButton = document.getElementById("close");
    let modal = document.getElementById("modal");
    let body = document.querySelector("body");
    let close = document.querySelector(".close");
    let save = document.querySelector(".modal-header>input");

    const profileimage = document.querySelector(".profileimage img");
    const nickname = document.querySelector(".profileset #nickname");
    const name = document.querySelector('.text-area #name');
    const text = document.querySelector('.text-area #text');
    const site = document.querySelector('.text-area #site');

    const modalId = document.querySelector('.modal-content #instaid');
    const modalName = document.querySelector('.modal-content #name');
    const modalSite = document.querySelector('.modal-content #website');
    const modalProfile = document.querySelector('.modal-content #textprofile');

    const upload = document.querySelector('.sidebar #upload');
    let uploadpost = document.getElementById("uploadpost");
    



    let imageData = "";

    save.addEventListener('click', ()=>{
       
        if(imageData) {
            profileimage.src = imageData;
        }
        nickname.textContent = modalId.value;
        name.textContent = modalName.value;
        text.textContent = modalProfile.value;
        site.textContent = modalSite.value;
        site.href = modalSite.value;

        saveToLocal();
        closeModal();
    });


    modalButton.addEventListener("click", ()=>{
    modal.classList.add("visible");
    body.classList.add("darkback");
    close.classList.add("visible");
    });

    closeButton.addEventListener("click", ()=>{
        closeModal();
    });
   
    function closeModal() {
        modal.classList.remove("visible");
        body.classList.remove("darkback");
        close.classList.remove("visible")
    };

    function saveToLocal () {
        let dataAll = {
            profileimage : profileimage.src,
            nickname : nickname.textContent,
            name : name.textContent,
            text: text.textContent,
            sitetext : site.textContent,
            sitehref : site.href,
        };
        localStorage.setItem("dataAll", JSON.stringify(dataAll));
    }
    function loadFromLocal() {
        const data = JSON.parse(localStorage.getItem('dataAll'));
        if (data) {
            profileimage.src = data.profileimage;
            nickname.textContent = data.nickname;
            name.textContent = data.name;
            text.textContent = data.text;
            site.textContent = data.sitetext;
            site.href = data.sitehref;
        }
    }





    function loadImage() {
        const image = localStorage.getItem('image');
        if (image) {
            fileinput.src = image;
        }
    }
    fileinput.addEventListener('change', (e)=>{
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imageData = e.target.result;
                inputimg.src = imageData;
            };
            reader.readAsDataURL(file);
        }
    })
    loadImage();
    loadFromLocal();


    upload.addEventListener("click", (e)=>{
        e.preventDefault();
        uploadpost.classList.add("visible");
        body.classList.add("darkback");
        });
    
    
});














