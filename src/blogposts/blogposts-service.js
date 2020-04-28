const blogpostsService = {
    getAllBlogposts(knex) {
        return knex.select('*').from('blogposts');
    },
    insertBlogpost(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('blogposts')
            .returning('*')
            .then(rows => {
                return rows[0];
            });
    },
    getById(knex, id) {
        return knex
            .from('blogposts')
            .select('*')
            .where('id', id)
            .first();
    },
    deleteBlogpost(knex, id) {
        return knex('blogposts')
            .where({ id })
            .delete();
    },
    updateBlogposts(knex, id, newBlogpostsFields) {
        return knex('blogposts')
            .where({ id })
            .update(newBlogpostsFields);

        },
        getArticleByBlogpostId(knex, blogpost_id){
            return knex
                .from('articles')
                .select('*')
                .where('blogpostlsid', blogpost_id)
    }
}

module.exports = blogpostsService;