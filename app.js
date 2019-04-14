const app = require('express')();
const http = require('http').Server(app);
const port = 9999
const bodyParser = require('body-parser')
const routes = require('./routes/index');
const enableWs = require('express-ws')
const redis = require('redis').createClient('redis://redis-19059.c1.ap-southeast-1-1.ec2.cloud.redislabs.com:19059'
,{ password: 'weqweq21' });
// Set redis client for app
app.set('redisClient',redis);
// Enable express-ws
enableWs(app)

app.use(bodyParser.json());

app.use('/v1',routes);

app.listen(port);