const editBlogBtnHandler = (id) => {
    document.location.replace('edit/blog/' + id)
}

const deleteBlogBtnHandler = async (blogId) => {
    event.preventDefault();
    try {
        const relativePath = `/api/blogs/${blogId}`
        const response = await fetch(relativePath, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/dashboard')
        }
        else {
            document.location.replace('/')
        }


    } catch (error) {

    }
};

const loadBlogBtnHandler = async (blogId) => {
    event.preventDefault();

    try {
        document.location.replace(`/blog/${blogId}`)
    } catch (error) {

    }


}