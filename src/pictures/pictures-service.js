const PicturesService = {
    getAllPictures(knex) {
        return knex.select('*').from('pictures')
    },
    insertPicture(knex, newPicture) {
        return knex
            .insert(newPicture)
            .into('Picture')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('pictures')
            .select('*')
            .where('id', id)
            .first()
    },
    deletePicture(knex, id) {
        return knex('pictures')
            .where({ id })
            .delete()
    },
    updatePicture(knex, id, newPictureFields) {
        return knex('pictures')
            .where({ id })
            .update(newPictureFields)
    },
        

}

module.exports = ArticlesService