var redis = require('redis'),
    client = redis.createClient();

client.on('error', function(err) {
    console.log('Error' + err);
});

console.log('Setting user hash');
client.hset('user', 'username', 'johndoe');
client.hset('user', 'firstname', 'john');
client.hset('user', 'lastname', 'doe');

client.hmset('user', 'address', 'Beijing China', 'mobile', '13912345678');

client.hkeys('user', function(err, replies) {
    console.log('Result for user: ');
    console.log(replies.length + ' replies:');
    replies.forEach(function(reply, i) {
        console.log(i + ': ' + reply);
    });
    //client.end();
});

var hash = {
    username: 'jackchan',
    firstname: 'jack',
    lastname: 'chan',
    address: 'Shanghai China',
    mobile: '13872362345'
};
client.hmset('newuser', hash);
client.hscan('newuser', 0, function(err, replies) {
    console.log('Result for newuser: ');
    console.log(replies.length + ' replies');
    replies.forEach(function(reply, i) {
        console.log(i + ': ' + reply);
    });
    client.end();
});