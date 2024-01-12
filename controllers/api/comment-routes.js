const router = require('express').Router();
const {Comment} = require('../../models/Comment');
const checkLogin = require('../../utils/auth');

router.post('/', checkLogin, async (req, res) => {

    try {
        console.log("IN THE POST OF THE COMMENT ROUTE")
        //create new blog with a copy of request body and the logged in user's id
        const newComment = {
            text: req.body.text,
            user_id: req.session.user_id,
            blog_id: parseInt(req.body.blog_id),
        }
        console.log("LOGGING NEW COMMENT");
        console.log(newComment);
        const createdComment = await Comment.create(newComment);
        console.log("Response After the call")
        console.log(createdComment);
        res.status(200).json(createdComment);


    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
