const app = require("../src/app");
const expect = require('chai').expect;

describe("App", () => {
	it('GET / responds with 200 containing "Hello, world!"', () => {
		return supertest(app)
			.get("/")
			.expect(200, "Hello, world!");
	});
});


// you should put the blogpost tests in their own file

// Declare the database connection so that you can inject it into any function that depends on it.
const knex = require('knex');
let db;


// the service file exports the entire service object, so that's what you need to require here. Then, you'll use this const to get access to the specific function, like 'blogpostsService.getAllBlogposts()'

const blogpostsService = require('../src/blogposts/blogposts-service');

describe('getAllBlogposts', () => {

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,  // don't know if this works with heroku
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  it('should return a list of all the blogs in the database', () => {
    // define inputs

        // what is the intention for the following three lines? Is it really a complicated 'const' declaration, or should it be three separate statements. This looks like it was copied from somewhere. What is 'i' doing? It wasn't declared originally. What is 'updatedArray' doing? It doesn't seem to be used. Finally, why are you indexing into blogsArray for your expected answer when you later expect to get the whole array?
        const i=0; // temp to get tests to run


    const blogsArray = [],
      updatedArray = blogsArray + i,
      expectedAnswer = blogsArray[i];

    // invoke the function
    const actualAnswer = blogpostsService.getAllBlogposts(db, blogsArray);

    // assert that expected === actual
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  it('should throw an error when there are no blogs in the database', () => {
    // define inputs
    // const blogsArray, i;
    const blogsArray =[];

    // set up the function call
    const fn = () => { blogpostsService.getAllBlogposts(db, blogsArray) };

    // assert that exception is thrown

    // NOTE: there is no code in the getAllBlogposts function to throw an exception. Is this test supposed to pass?
    expect(fn).to.throw();
  });
});