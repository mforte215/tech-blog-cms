const router = require('express').Router();
const {User, Blog} = require('../models/index');



// GET for homepage, needs blog feed data from DB
router.get('/', async (req, res) => {
    try {

        const foundBlogs = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        })
        const blogs = foundBlogs.map((blog) => blog.get({plain: true}));
        const UserLoggedIn = req.session.logged_in
        console.log("LOGGING IF LOGGED IN:")
        console.log(UserLoggedIn);
        let loggedIn;
        if (UserLoggedIn) {
            loggedIn = true;
        }
        else {
            loggedIn = false;
        }
        res.render('home', {
            blogs: blogs,
            logged_in: loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


//Get the login page
router.get('/login', async (req, res) => {

    try {

        //check if the user is logged in and then redirect if they are
        if (req.session.logged_in) {
            res.redirect('/');
        }
        else {

            res.render('login', {});
        }




    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

})


router.get('/sign-up', async (req, res) => {

    try {

        //check if the user is logged in and then redirect if they are
        if (req.session.logged_in) {
            res.redirect('/');
        }
        else {

            res.render('sign-up', {});
        }




    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

})


module.exports = router;
