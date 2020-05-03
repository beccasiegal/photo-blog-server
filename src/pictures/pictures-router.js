const path = require('path')
const express = require('express')
const xss = require('xss')
const picturesService = require('./pictures-service')

const picturesRouter = express.Router()
const jsonParser = express.json()

const serializepicture = picture => ({
    id: picture.id,
    altText: xss(picture.altTexttext),
    imageUrl: xss(picture.imageUrl),
    articleId: xss(article.articleId)
})

picturesRouter
.route('/')
.get((req, res, next) => {
    const knexInstance = req.app.get('db')
    picturesService.getAllPictures(knexInstance)
        .then(pictures => {
            res.json(pictures.map(serializepicture))
        })
        .catch(next)
})
.post(jsonParser, (req, res, next) => {
    const { altText, imageUrl } = req.body
    const newpicture = { altText, imageUrl}

    for (const [key, value] of Object.entries(newpicture))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })

    picturesService.insertpicture(
        req.app.get('db'),
        newpicture
    )
    .then(picture => {
        res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${picture.id}`))
            .json(serializepicture(picture))
    })
    .catch(next)
})

picturesRouter
    .route('/:pictureId')
    .all((req, res, next) => {
        picturesService.getById(
            req.app.get('db'),
            req.params.pictureId
        )
        .then(picture => {
            if(!picture) {
                return res.status(404).json({
                    error: { message: `picture doesn't exist` }
                })
            }
            res.picture = picture
            next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
        res.json(serializepicture(res.picture))
    })
    .delete((req, res, next) => {
        picturesService.deletepicture(
            req.app.get('db'),
            req.params.pictureId
        )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
    })
    .patch(jsonParser, (req, res, next) => {
        const {altText, imageUrl} = req.body;
        console.log("pictures-router.js : req.body : ", req.body)
        const pictureToUpdate = { pictureId, altText, imageUrl}
        console.log("pictures-router.js : pictureToUpdate : ", pictureToUpdate)

        const numberOfValues = Object.values(pictureToUpdate).filter(Boolean)
			.length;
		if (numberOfValues ===0) {
			return res.status(400).json({
				error: {
					message: `Request body must contain 'article or content'`
				}
			});
        }
        picturesService.updatepicture(
            req.app.get('db'),
            req.params.pictureId,
            pictureToUpdate
        )
        .then(numRowsAffected => {
            res.status(204).end();
        })
        .catch(next)
    })

    module.exports = picturesRouter