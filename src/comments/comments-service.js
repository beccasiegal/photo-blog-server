const CommentsService = {
    getAllComments(knex) {
        return knex.select('*').from('comments')
    },
    insertComment(knex, newComment) {
        return knex
            .insert(newComment)
            .into('comments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('comments')
            .select('*')
            .where('id', id)
            .first()
    },
    deletecomment(knex, id) {
        return knex('comments')
            .where({ id })
            .delete()
    },
    updatecomment(knex, id, newcommentFields) {
        return knex('comments')
            .where({ id })
            .update(newcommentFields)
    },
        

}

module.exports = commentsService