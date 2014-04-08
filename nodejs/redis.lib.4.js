var redis = require('redis'),
    client = redis.createClient();

client.on('error', function(err) {
    console.log('Error: ' + err);
});

var name = ['Neil', 'Peter', 'Brian', 'Scott', 'Brian'];
for (var i = 0; i < name.length; i++) {
    client.sadd('myteam', name[i]);
}

client.smembers('myteam', function(err, members) {
    console.log(members);
    client.end();
});