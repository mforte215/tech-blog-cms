const editBlogHandler = async (blogID) => {
    event.preventDefault();

    console.log("Hello there fella!")
    const blogTitle = document.getElementById('blog_title').value.trim();
    const blogContent = document.getElementById('blog_content').value.trim();

    if (blogTitle && blogContent) {

        const newBlog = {
            title: blogTitle,
            content: blogContent
        }
        console.log("LOGGING New blog")
        console.log(newBlog);
        console.log("LOGGING ID")
        console.log(blogID);
        const responseData = await fetch(`/api/blogs/${blogID}`, {
            method: 'PUT',
            body: JSON.stringify(newBlog),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (responseData.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update blog');
        }
    }
};