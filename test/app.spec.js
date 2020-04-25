const app = require("../src/app");
const expect = require('chai').expect;

describe("App", () => {
	it('GET / responds with 200 containing "Hello, world!"', () => {
		return supertest(app)
			.get("/")
			.expect(200, "Hello, world!");
	});
});


const getAllBlogpostss = require('../blogposts/blogposts-service');

describe('getAllBlogposts', () => {
  it('should return a list of all the blogs in the database', () => {
    // define inputs
    const blogsArray = [],
      updatedArray = blogsArray + i,
      expectedAnswer = blogsArray[i];

    // invoke the function
    const actualAnswer = getAllBlogpostss(blogsArray);

    // assert that expected === actual
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  it('should throw an error when there are no blogs in the database', () => {
    // define inputs
    const blogsArray, i;

    // set up the function call
    const fn = () => { getAllBlogpostss(blogsArray) };

    // assert that exception is thrown
    expect(fn).to.throw();
  });
});