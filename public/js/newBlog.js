const newBlogHandler = async (event) => {
    event.preventDefault();


    const blogTitle = document.getElementById('blog_title').value.trim();
    const blogContent = document.getElementById('blog_content').value.trim();

    if (blogTitle && blogContent) {

        const newBlog = {
            title: blogTitle,
            content: blogContent
        }

        const responseData = await fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify(newBlog),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (responseData.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to create blog');
        }
    }
};


document.getElementById("new-blog-form").addEventListener('submit', newBlogHandler);