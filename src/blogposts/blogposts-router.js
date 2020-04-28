const path = require("path");
const express = require("express");
const xss = require("xss");
const BlogpostsService = require("./blogposts-service");

const blogpostsRouter = express.Router();
const jsonParser = express.json();

//question: are URLs suceptible to XSS? Do they need to be sanitized?
const serializeBlogposts = blogpost => ({
	id: blogpost.id,
    url: blogpost.url,
});

blogpostssRouter
	.route("/")
	.get((req, res, next) => {
        // console.log("Entering blogposts-router... route= /")
		const knexInstance = req.app.get("db");
	    BlogpostsService.getAllBlogposts(knexInstance)
			.then(blogposts => {
				res.json(blogposts.map(serializeBlogposts));
			})
			.catch(next);
	})
	.post(jsonParser, (req, res, next) => {
		const { url } = req.body;
		const newBlogpost = {
            url
		};

		for (const [key, value] of Object.entries(newBlogpost))
			if (value == null)
				return res.status(400).json({
					error: {
						message: `Missing '${key}' in request body`
					}
                });
        
        BlogpostsService.insertBlogpost(req.app.get('db'), newBlogpost)
            .then(blogpost => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${blogpost.id}`))
                    .json(serializeBlogposts(blogpost));
            })
            .catch(next)
    });
    
blogpostsRouter
    .route('/:blogpost_id')
    .all((req, res, next) => {

                // comment these out when you are satisfied it works
                console.log("Entering blogposts-router... route= /:blogpost_id")
                console.log('blogposts-router.js: req.headers: ', req.headers);
                console.log('blogposts-router.js: req.originalUrl: ', req.originalUrl);
                console.log('blogposts-router.js: req.params: ', req.params);
                console.log('blogposts-router.js: req.query: ', req.query);
        
        BlogpostsService.getById(req.app.get('db'), req.params.blogpost_id)
            .then(blogpost => {
                if(!blogpost) {
                    return res.status(404).json({
						error: { message: `blogpost doesn't exist` }
					}); 
                }
                res.blogpost = blogpost;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(serializeblogposts(res.blogpost));
    })
    .delete((req, res, next) => {
        blogpostsService.deleteblogpost(req.app.get('db'), req.params.blogpost_id)
            .then(numRowsAffected => {
                res.status(204).end();
            })
            .catch(next);
    })
    .patch(jsonParser, (req, res, next) => {
        const {article } = req.body;
        const blogpostToUpdate = { article }

        const numberOfValues = Object.values(blogpostToUpdate).filter(Boolean)
			.length;
		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'article'`
				}
			});
        }
        blogpostsService.updateblogpost(
            req.app.get('db'),
            req.params.blogpost_id,
            blogpostToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end();
        })
        .catch(next)
    })

    blogpostsRouter
    .route('/:blogpost_id/articles')
    .all((req, res, next) => {

         // comment these out when you are satisfied it works
        // console.log("Entering blogposts-router... route= /:blogpost_id/names")
         //console.log('blogposts-router.js: req.headers: ', req.headers);
        //  console.log('blogposts-router.js: req.originalUrl: ', req.originalUrl);
        //  console.log('blogposts-router.js: req.params: ', req.params);
        //  console.log('blogposts-router.js: req.query: ', req.query);
 
         // First see if the blogpost ID points to an existing blogpost
         blogpostsService.getById(req.app.get('db'), req.params.blogpost_id)

            .then(blogpost => {
                if(!blogpost) {
                    return res.status(404).json({
						error: { message: `blogpost doesn't exist` }
					}); 
                }
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => { // now that we know the blogpost ID is ok, get the names
    blogpostsService.getArticlesByblogpostId(req.app.get('db'), req.params.blogpost_id)
        .then(articles => {
            // comment the following line out when you are satisfied
            //console.log("blogposts-router.js: get/:blogposts_id/articles)
            return res.json(articles); 
        })
        .catch(next);
    })
module.exports = blogpostsRouter;