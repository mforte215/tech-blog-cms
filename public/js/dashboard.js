const newBlogBtnHandler = () => {
    document.location.replace('/blog/new');
}

document.getElementById('new-blog-btn-dash').addEventListener('click', newBlogBtnHandler);