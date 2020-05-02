const knex = require('knex');
const app = require("./app");
const { SERVER_PORT, DATABASE_URL } = require('./config')
//console.log("Database url", DATABASE_URL);
const db = knex({
	client: 'pg',
	connection: {
		host: process.env.HOST,
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: process.env.DATABASE,
		ssl: true
	}
})

app.set('db', db)
// console.log('server.js: db.connection: ', db.connection)
app.listen(SERVER_PORT, () => {
	console.log(`Server listening at localhost:${SERVER_PORT}`);
});
