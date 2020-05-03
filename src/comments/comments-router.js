const path = require('path')
const express = require('express')
const xss = require('xss')
const commentsService = require('./comments-service')

const commentsRouter = express.Router()
const jsonParser = express.json()

const serializecomment = comment => ({
    id: comment.id,
    authorName: xss(comment.authorName),
    title: xss(comment.title),
    content: xss(comment.content),
    articleId: xss(articleId)
})

commentsRouter
.route('/')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    commentsService.getAllcomments(knexInstance)
        .then(comments => {
            res.json(comments.map(serializecomment))
        })
        .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { authorName, title, content } = req.body
    const newcomment = { authorName, title, conetent}

    for (const [key, value] of Object.entries(newcomment))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    commentsService.insertcomment(
        req.app.get('db'),
        newcomment
    )
    .then(comment => {
        res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${comment.id}`))
            .json(serializecomment(comment))
    })
    .catch(next)
})

commentsRouter
    .route('/:commentId')
    .all((req, res, next) => {
        commentsService.getById(
            req.app.get('db'),
            req.params.commentId
        )
        .then(comment => {
            if(!comment) {
                return res.status(404).json({
                    error: { message: `comment doesn't exist` }
                })
            }
            res.comment = comment
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializecomment(res.comment))
    })
    .delete((req, res, next) => {
        commentsService.deletecomment(
            req.app.get('db'),
            req.params.commentId
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {title, content} = req.body;
        console.log("comments-router.js : req.body : ", req.body)
        const commentToUpdate = { title, content}
        console.log("comments-router.js : commentToUpdate : ", commentToUpdate)

        const numberOfValues = Object.values(commentToUpdate).filter(Boolean)
			.length;
		if (numberOfValues ===0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'title or content'`
				}
			});
        }
        commentsService.updatecomment(
            req.app.get('db'),
            req.params.commentId,
            commentToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end();
        })
        .catch(next)
    })

    module.exports = commentsRouter