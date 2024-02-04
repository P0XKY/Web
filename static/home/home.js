let postCount = 0;

function createPost() {
    const postsContainer = document.getElementById('posts-container');

    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `<h3>Post ${postCount + 1}</h3><p>This is the content of the post.</p>`;

    postsContainer.appendChild(postDiv);
    postCount++;
}

function loadMorePosts() {
    for (let i = 0; i < 5; i++) {
        createPost();
    }
}