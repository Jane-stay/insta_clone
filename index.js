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

    const uploadpost = document.getElementById("uploadpost");
    const newpost = document.getElementById("newpost");
    const uploadpost1 = document.getElementById("uploadpost1");
    const newpostimg = document.getElementById("newpostimg");
    const sharePost = document.getElementById("sharepost");
    const postText = document.querySelector('.content1-right textarea');

    const threeposts = document.querySelector(".threeposts");
    const postDivs = threeposts.querySelectorAll('div');
    
    const nopost = document.getElementById("nopost");


    let imageData = "";
    let imageData1 = "";

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
        modal.showModal();
        inputimg.src=profileimage.src;
        modalId.value = nickname.textContent;
        modalName.value = name.textContent;
        modalSite.value = site.href;
        modalProfile.value = text.textContent;
    });

    closeButton.addEventListener("click", ()=>{
        closeModal();
    });
   
    function closeModal() {
        modal.close();
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
                const imageData = e.target.result;
                inputimg.src = imageData; 
                profileimage.src = imageData; 
                saveToLocal()
            };
            reader.readAsDataURL(file);
        }
    })
    loadImage();
    loadFromLocal();

    function closeSecondModal() {
        uploadpost.style.display = 'none';
        uploadpost.close();
    }


    upload.addEventListener("click", (e)=>{
        e.preventDefault();
        uploadpost.style.display = '';
        uploadpost.showModal();
    });

    newpost.addEventListener('change', (e)=>{
        console.log("change 이벤트 발생:", e.target.files);
        const file = e.target.files[0];
        if(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                newpostimg.src = e.target.result;
                uploadpost.style.display = 'none';  
                showUploadPost1();  
                close.classList.add("visible");
            };
            reader.readAsDataURL(file);
        }
    });
    


    //공유하기 이후 단계
    sharePost.addEventListener('click', ()=>{
        if(newpostimg.src) {
            const posts = JSON.parse(localStorage.getItem('posts')) || [];
            const newPost = {
                postimage: newpostimg.src,
                postText: postText.value
            };
            posts.push(newPost);
            localStorage.setItem('posts', JSON.stringify(posts));
            
            nopost.remove;
            displayPosts();
            uploadpost1.close();
            
        }
    });

    function saveToLocal1() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push({
            postimage: newpostimg.src,
            postText: postText.value,
        });
        localStorage.setItem('posts', JSON.stringify(posts));
    }
    
    function loadFromLocal1() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.forEach((post, index) => {
            if (index < postDivs.length) {
                postDivs[index].innerHTML = `<img src="${post.postimage}" alt="post">`;
            }
        });
    }

 

   
    // function showUploadPost1() {
    //     uploadpost1.style.display = '';
    //     uploadpost1.showModal();
    // }


    loadFromLocal1();

    const closeUploadPost = document.querySelector('.uploadpost .close');
    if (closeUploadPost) {
        closeUploadPost.addEventListener('click', closeSecondModal);
    }

   
    function displayPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        threeposts.innerHTML = ''; 
        
        posts.forEach((post, index) => {
            const div = document.createElement('div');
            div.className = 'post-item';
            div.innerHTML = `<img src="${post.postimage}" alt="post">`;
            
            
            // div.addEventListener('click', () => {
            //     showPostModal(post, index);
            // });
            
            threeposts.appendChild(div);
        });
    }
    

   
    // function showPostModal(post, index) {
    //     uploadpost1.innerHTML = `
    //         <div class="newpost-header1">
    //             <span>게시물</span>
    //             // <div class="post-actions">
    //             //     <button class="edit-btn">수정</button>
    //             //     <button class="delete-btn">삭제</button>
    //             // </div>
    //         </div>
    //         <div class="newpost-content1">
    //             <div class="content1-left">
    //                 <img src="${post.postimage}">
    //             </div>
    //             <div class="content1-right">
    //                 <textarea readonly>${post.postText}</textarea>
    //             </div>
    //         </div>
    //     `;
   
    // }

    
});














