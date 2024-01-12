const router = require('express').Router();
const {User, Blog} = require('../models/index');
const checkLogin = require('../utils/auth');
const {format_date} = require('../utils/helpers');


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
        const localizedBlogs = blogs.map((blog) => {
            blog.dateCreated = format_date(blog.dateCreated);
            return blog;
        })
        const UserLoggedIn = req.session.logged_in
        let loggedIn;
        if (UserLoggedIn) {
            loggedIn = true;
        }
        else {
            loggedIn = false;
        }
        res.render('home', {
            blogs: localizedBlogs,
            logged_in: loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Edit personal block
router.get('/edit/blog/:id', async (req, res) => {

    try {
        //get the blog 
        const foundBlog = await Blog.findByPk(req.params.id);
        console.log("LOGGING BLOG OBJ");
        console.log(foundBlog)
        console.log("OWNER OF BLOG ID:" + foundBlog.user_id);
        console.log("SESSION USER ID: " + req.session.user_id);
        if (foundBlog.user_id == req.session.user_id) {
            //render the edit page with the values from the object
            const blog = foundBlog.get({plain: true});
            const UserLoggedIn = req.session.logged_in
            let loggedIn;
            if (UserLoggedIn) {
                loggedIn = true;
            }
            else {
                loggedIn = false;
            }


            res.render('edit-blog', {
                ...blog,
                logged_in: loggedIn
            })

        }
        else {
            //restrict access to owner of the blog
            res.redirect('/');
        }
    } catch (error) {

    }


});

router.get('/blog/new', checkLogin, async (req, res) => {

    try {
        console.log("ENTERING BLOG NEW")
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



//GET one article and display it
router.get('/blog/:id', async (req, res) => {

    try {
        const foundBlog = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        if (foundBlog) {

            const blog = foundBlog.get({plain: true});
            blog.dateCreated = format_date(blog.dateCreated);
            const UserLoggedIn = req.session.logged_in
            let loggedIn;
            if (UserLoggedIn) {
                loggedIn = true;
            }
            else {
                loggedIn = false;
            }
            res.render('blog', {
                ...blog,
                logged_in: loggedIn
            })


        }
        else {
            res.status(500).json("SOMETHING WENT WRONG");
        }


    } catch (error) {

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
            user.blogs = user.blogs.map((blog) => {
                blog.dateCreated = format_date(blog.dateCreated);
                return blog;
            })
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





module.exports = router;
