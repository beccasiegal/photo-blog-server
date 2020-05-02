module.exports = {
	SERVER_PORT: process.env.SERVER_PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || "development",
	DATABASE_URL: 
		process.env.DATABASE_URL || 
		"",
	TEST_DATABASE_URL:
		process.env.TEST_DATABASE_URL ||
		"postgresql://rebecca@localhost/photoblog-test",
	
};