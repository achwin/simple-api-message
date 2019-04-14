const store = async (req, res, next) => {
	// Define redis client
	const client = req.app.get('redisClient');
	// Define websocket from given url
	const WebSocket = require('ws');
	const ws = new WebSocket('ws://localhost:9999/v1/messages');
	// Get parameter text from request
	const text = req.body.text
	// Store text to redis
	client.rpush(['messages', text], (err, reply) => {
	    if (err) throw err;
    	ws.onopen = () => {
    		// When text is stored, call ws to display all message
    	    ws.send('You have new message.');
    	}
	    // Sending response that notify the message is sent
	    res.status(201).json(
	    	{ 
	    		status: 'success',
	    		data: text
	    	}
	    );
    });
}

const index = async (req, res, next) => {
	// Define redis client
	const client = req.app.get('redisClient');
	// Collect all messages from redis
	// Params 0 meaning get from index 0
	// Params -1 meaning get till end of index
	client.lrange('messages', 0, -1, (err, reply) => {
		if (err) throw err;
		// Sending all messages
	    res.json({
	    	status: 'success',
	    	data: reply
	    });
	});
}

const websocket = async (ws, req) => {
    ws.on('message', msg => {
    	const client = req.app.get('redisClient');
    	// Get all messages and display it
    	client.lrange('messages', 0, -1, (err, reply) => {
    		if (err) throw err;
    		console.log(JSON.stringify(reply))
    		ws.send(JSON.stringify(reply));
    	});
    })
}

module.exports = {index, store, websocket};
