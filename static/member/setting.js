function displayFileName() {
    var input = document.getElementById('newProfilePicture');
    var fileName = input.files[0].name;
    document.getElementById('selectedFileName').textContent = 'Selected File: ' + fileName;
  }
  
  function updateProfile() {
    var newUsername = document.getElementById('newUsername').value;
    var oldPassword = document.getElementById('Password').value;
    var newPassword = document.getElementById('newPassword').value;
    var selectedFileName = document.getElementById('selectedFileName').textContent;
  
    // You can perform further actions here, such as updating the profile information on the server.
    console.log('Updating profile...');
    console.log('New Username:', newUsername);
    console.log('Old Password:', oldPassword);
    console.log('New Password:', newPassword);
    console.log(selectedFileName);
  }
  
  function validateImage() {
    var input = document.getElementById('newProfilePicture');
    var file = input.files[0];
  
    if (file) {
        var fileName = file.name;
  
        // แสดงชื่อไฟล์ที่ถูกเลือก
        document.getElementById('selectedFileName').textContent = 'Selected File: ' + fileName;
  
        var fileExtension = fileName.split('.').pop().toLowerCase();
  
        if (fileExtension === 'jpg') {
            // ทำงานที่ต้องการเมื่อไฟล์ถูกต้อง
            alert('ไฟล์ถูกต้อง');
        } else {
            // แจ้งเตือนถ้าไฟล์ไม่ใช่ประเภท JPG
            alert('กรุณาเลือกไฟล์ที่เป็นรูปภาพประเภท JPG เท่านั้น');
        }
    } else {
        // แจ้งเตือนถ้าไม่มีไฟล์ถูกเลือก
        alert('กรุณาเลือกไฟล์');
    }
    
  }
  document.getElementById('newProfilePicture').addEventListener('change', function () {
      var selectedFile = document.getElementById('newProfilePicture').files[0];
      document.getElementById('selectedFileName').innerText = "Selected File: " + selectedFile.name;
  });