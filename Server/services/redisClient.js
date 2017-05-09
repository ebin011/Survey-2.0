const redis = require('redis');

const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;
const client = redis.createClient(redisPort, redisHost);

client.on('error', (err) => {
	console.log('Error in Redis Connection', err);
});

client.on('ready', () => {
	console.log('Redis cliient is Ready');
});

client.on('connect', () => {
	console.log('client is Connected to Redis Server');
});

client.on('end', () => {
	console.log('Client has closed the connection to the REDIS server');
});

module.exports = client;
