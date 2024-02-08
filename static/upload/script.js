// script.js สำหรับ post.html
function submitPost() {
    var postTitle = document.getElementById('post-title').value;
    var postDetails = document.getElementById('post-details').value;
    var fileInput = document.getElementById('file-upload');
    
    if (postTitle.trim() !== '' && postDetails.trim() !== '') {
        // ดึงข้อมูลที่มีอยู่ใน local storage และเพิ่มข้อมูลใหม่
        var posts = JSON.parse(localStorage.getItem('posts')) || [];
        
        // สร้างอ็อบเจ็กต์ข้อมูลโพส
        var newPost = {
            title: postTitle,
            details: postDetails,
            file: fileInput.files[0] || null  // ใช้ fileInput.files เพื่อเข้าถึงไฟล์ที่ผู้ใช้เลือก
        };

        posts.push(newPost);
        localStorage.setItem('posts', JSON.stringify(posts));

        // ล้างค่า input
        document.getElementById('post-title').value = '';
        document.getElementById('post-details').value = '';
        document.getElementById('file-upload').value = '';  // ล้างค่า input ไฟล์
    } else {
        alert('กรุณากรอกหัวข้อและรายละเอียดของโพส');
    }
}
// แสดงโพสต์ที่มีอยู่ใน Local Storage เมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function () {
    displayPosts();
});

function displayFileName() {
    const fileInput = document.getElementById("file-upload");
    const fileNameDisplay = document.getElementById("file-name");

    if (fileInput.files.length > 0) {
        fileNameDisplay.innerText = "ชื่อไฟล์: " + fileInput.files[0].name;
    } else {
        fileNameDisplay.innerText = "";
    }
}

function displayPosts() {
    var posts = JSON.parse(localStorage.getItem('posts')) || [];
    var postContainer = document.getElementById('post-container');

    // เคลียร์เนื้อหาที่อยู่ใน postContainer ก่อนที่จะแสดงข้อมูลใหม่
    postContainer.innerHTML = '';

    posts.forEach(function (post) {
        var postElement = document.createElement('div');
        postElement.classList.add('post');

        var titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        var detailsElement = document.createElement('p');
        detailsElement.textContent = post.details;

        // แสดงรายละเอียดของไฟล์ (ถ้ามี)
        if (post.file) {
            var fileElement = document.createElement('p');
            fileElement.textContent = 'ไฟล์: ' + post.file.name;
            postElement.appendChild(fileElement);
        }

        // เพิ่ม element ลงใน postElement
        postElement.appendChild(titleElement);
        postElement.appendChild(detailsElement);

        // เพิ่ม postElement ลงใน postContainer
        postContainer.appendChild(postElement);
    });
}