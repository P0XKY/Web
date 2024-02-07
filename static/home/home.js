// index.js

// สมมติว่าคุณมีข้อมูลโพสที่ได้รับมาจากที่อื่น เก็บไว้ในตัวแปร posts
const posts = [
    {
      profileImage: 'path/to/profile1.jpg',
      title: 'หัวข้อโพสที่ 1',
      details: 'รายละเอียดโพสที่ 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      profileImage: 'path/to/profile2.jpg',
      title: 'หัวข้อโพสที่ 2',
      details: 'รายละเอียดโพสที่ 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
        profileImage: 'path/to/profile2.jpg',
        title: 'หัวข้อโพสที่ 2',
        details: 'รายละเอียดโพสที่ 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    // เพิ่มโพสที่ต้องการแสดงต่อไป
  ];
  
  // เรียกฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', function () {
    displayPosts(posts);
    });
  
  // ฟังก์ชันสำหรับแสดงโพส
  function displayPosts(posts) {
    const postContainer = document.getElementById('post-container');

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');

        const profileImageElement = document.createElement('img');
        profileImageElement.src = post.profileImage;
        profileImageElement.alt = 'Profile Image';

        const titleElement = document.createElement('h2');
        titleElement.textContent = post.title;

        const detailsElement = document.createElement('p');
        detailsElement.textContent = post.details;

        // เพิ่ม element ลงใน postElement
        postElement.appendChild(profileImageElement);
        postElement.appendChild(titleElement);
        postElement.appendChild(detailsElement);

        // เพิ่มปุ่ม "ถูกใจ" และ "คอมเมนต์"
        const likeButton = createButton('Like', 'fas fa-thumbs-up', () => likePost(post.title));
        const commentButton = createButton('Comment', 'fas fa-comment', () => commentPost(post.title));

        postElement.appendChild(likeButton);
        postElement.appendChild(commentButton);

        // เพิ่ม postElement ลงใน postContainer
        postContainer.appendChild(postElement);
    });
}

function createButton(text, iconClass, clickHandler) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="${iconClass}"></i> ${text}`;
    button.addEventListener('click', clickHandler);
    return button;
}

function likePost(postTitle) {
    alert(`Liked post: ${postTitle}`);
    // ตรวจสอบโพสต์ที่ถูกใจและดำเนินการต่อไป
}

function commentPost(postTitle) {
    alert(`Commented on post: ${postTitle}`);
    // ตรวจสอบโพสต์ที่คอมเมนต์และดำเนินการต่อไป
}
