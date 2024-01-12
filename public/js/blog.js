const newCommentHandler = async (event) => {
    event.preventDefault();


    const blogTitle = document.getElementById('comment-text').value.trim();
    const blogId = document.getElementById('blog-value').value.trim();

    if (blogTitle && blogId) {

        const newComment = {
            text: blogTitle,
            blog_id: blogId,
        }
        console.log("LOGGING NEW COMMENT");
        console.log(newComment)
        const responseData = await fetch('/api/comments', {
            method: 'POST',
            body: newComment,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (responseData.ok) {
            document.location.replace('/blog/' + blogId);
        } else {
            alert('Failed to create blog');
        }
    }
};

document.getElementById('comment-form').addEventListener('submit', newCommentHandler);