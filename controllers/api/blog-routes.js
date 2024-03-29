const router = require('express').Router();
const {Blog} = require('../../models');
const checkLogin = require('../../utils/auth');

router.post('/', checkLogin, async (req, res) => {

    try {

        //create new blog with a copy of request body and the logged in user's id
        const newBlog = {
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id,
        }

        const createdBlog = await Blog.create(newBlog);

        res.status(200).json(createdBlog);


    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        //destroy the given blog if you own it
        console.log("********************************");
        console.log("DELETING THE BLOG");
        console.log("********************************");
        const foundBlog = await Blog.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });
        //the model destroy method will return null/false/0 if the destory was not success
        if (!foundBlog) {
            res.status(404).json({message: 'No project found with this id!'});
            return;
        }

        res.status(200).json(foundBlog);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedBlog = await Blog.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id,
            }
        });
        console.log("WhAT IS UPDATED BLOG");
        console.log(updatedBlog);
        if (!updatedBlog) {
            console.log("DID NOT WORK")
            res.status(500).json('SORRY SOMETHING WENT WRONG!');
        }
        else {
            console.log("WORKED")
            res.status(200).json(updatedBlog);
        }



    } catch (error) {

    }



})

module.exports = router;
