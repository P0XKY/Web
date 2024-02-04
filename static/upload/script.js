// ฟังก์ชันสำหรับแสดงชื่อไฟล์ที่ถูกเลือก
function displayFileName() {
    const fileUpload = document.getElementById('file-upload');
    const fileNameDisplay = document.getElementById('file-name');

    // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือไม่
    if (fileUpload.files.length > 0) {
        const fileName = fileUpload.files[0].name;
        fileNameDisplay.textContent = `ไฟล์ที่เลือก: ${fileName}`;
        fileNameDisplay.style.display = 'block'; // แสดงชื่อไฟล์
    } else {
        fileNameDisplay.textContent = ''; // ล้างข้อความถ้าไม่มีไฟล์
        fileNameDisplay.style.display = 'none';
    }
}

// เพิ่มการเรียกใช้ฟังก์ชัน displayFileName() เมื่อมีการเปลี่ยนแปลงใน input file
document.getElementById('file-upload').addEventListener('change', displayFileName);

// ฟังก์ชันสำหรับการโพสต์
function createPost() {
    const postTitle = document.getElementById('post-title').value;
    const postText = document.getElementById('post-text').value;
    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (postTitle.trim() !== '' || postText.trim() !== '' || file) {
        const postsContainer = document.getElementById('posts-container');

        // สร้าง div สำหรับโพสต์ใหม่
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        // เพิ่มหัวข้อ
        if (postTitle.trim() !== '') {
            const titleElement = document.createElement('h3');
            titleElement.textContent = postTitle;
            postDiv.appendChild(titleElement);
        }

        // เพิ่มรายระเอียด
        if (postText.trim() !== '') {
            const postContent = document.createElement('p');
            postContent.textContent = postText;
            postDiv.appendChild(postContent);
        }

        // เพิ่มลิงก์ไฟล์ถ้ามีไฟล์
        if (file) {
            const fileName = file.name;
            const fileLinkElement = document.createElement('a');
            fileLinkElement.href = URL.createObjectURL(file);
            fileLinkElement.download = fileName;
            fileLinkElement.textContent = `ดาวน์โหลดไฟล์: ${fileName}`;
            postDiv.appendChild(fileLinkElement);
        }

        // เพิ่มโพสต์ลงใน container
        postsContainer.appendChild(postDiv);

        // ล้างค่า input fields และ file input หลังจากโพสต์
        document.getElementById('post-title').value = '';
        document.getElementById('post-text').value = '';
        fileInput.value = null;

        // ล้างแสดงชื่อไฟล์
        displayFileName();

        // เปลี่ยน URL ไปยังหน้าอื่น
        window.location.href = 'ตำแหน่งหน้าที่คุณต้องการ';
    }
}
