const router = require('express').Router();
const {User, Blog} = require('../models/index');
const checkLogin = require('../utils/auth');


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
        console.log(blogs);
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

});

router.get('/dashboard', checkLogin, async (req, res) => {

    try {

        if (!req.session.logged_in) {
            res.redirect('/');
        }
        else {

            //load personal dashboard with user data
            const userData = await User.findByPk(req.session.user_id, {
                attributes: {exclude: ['password']},
                include: [{model: Blog}],
            });
            const user = userData.get({plain: true});

            res.render('dashboard', {
                ...user,
                logged_in: true
            });
        }


    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }


});

router.get('/blog/new', checkLogin, async (req, res) => {

    try {
        if (!req.session.logged_in) {
            res.redirect('/login');
        }
        else {

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
            res.render('new-blog', {
                logged_in: loggedIn,
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});




module.exports = router;
