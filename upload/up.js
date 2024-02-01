function selectFile() {
    document.getElementById('file-input').click();
}

function uploadFile() {
    // ฟังก์ชันนี้จะถูกเรียกเมื่อคลิกปุ่ม "Upload"
    const fileInput = document.getElementById('file-input');
    const fileListDiv = document.getElementById('file-list');
    const resultParagraph = document.getElementById('result');

    // ตรวจสอบว่ามีไฟล์ถูกเลือกหรือไม่
    if (fileInput.files.length > 0) {
        // แสดงชื่อไฟล์ที่ถูกอัปโหลด
        fileListDiv.innerHTML += `<p>${fileInput.files[0].name}</p>`;
        resultParagraph.innerHTML = 'File uploaded successfully!';
    } else {
        resultParagraph.innerHTML = 'Please select a PDF file.';
    }
}

function resetForm() {
    // ฟังก์ชันนี้จะถูกเรียกเมื่อคลิกปุ่ม "Cancel"
    document.getElementById('file-input').value = ''; // รีเซ็ตค่าไฟล์ที่ถูกเลือก
    document.getElementById('file-list').innerHTML = ''; // ลบรายการไฟล์ที่แสดง
    document.getElementById('result').innerHTML = ''; // รีเซ็ตผลลัพธ์
}