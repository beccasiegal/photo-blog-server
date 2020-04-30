const path = require('path')
const express = require('express')
const xss = require('xss')
const articlesService = require('./articles-service')

const articlesRouter = express.Router()
const jsonParser = express.json()

const serializearticle = article => ({
    id: article.id,
    title: xss(article.titletext),
    photoUrl: imageurl,
    content: xss(article.articletext),
    blogpostsid: xss(article.blogpostsid),
    
})

articlesRouter
.route('/')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    articlesService.getAllArticles(knexInstance)
        .then(articles => {
            res.json(articles.map(serializearticle))
        })
        .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { title, content, imageurl  } = req.body
    const newarticle = { title, content, imageurl}

    for (const [key, value] of Object.entries(newarticle))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    articlesService.insertarticle(
        req.app.get('db'),
        newarticle
    )
    .then(article => {
        res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${article.id}`))
            .json(serializearticle(article))
    })
    .catch(next)
})

articlesRouter
    .route('/:articleId')
    .all((req, res, next) => {
        articlesService.getById(
            req.app.get('db'),
            req.params.articleId
        )
        .then(article => {
            if(!article) {
                return res.status(404).json({
                    error: { message: `article doesn't exist` }
                })
            }
            res.article = article
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializearticle(res.article))
    })
    .delete((req, res, next) => {
        articlesService.deletearticle(
            req.app.get('db'),
            req.params.articleId
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {article, votes, animalid } = req.body;
        console.log("articles-router.js : req.body : ", req.body)
        const articleToUpdate = { article, votes, animalid }
        console.log("articles-router.js : articleToUpdate : ", articleToUpdate)

        const numberOfValues = Object.values(articleToUpdate).filter(Boolean)
			.length;
		if (numberOfValues ===0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'article, vote or animalid'`
				}
			});
        }
        articlesService.updatearticle(
            req.app.get('db'),
            req.params.articleId,
            articleToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end();
        })
        .catch(next)
    })

    module.exports = articlesRouter