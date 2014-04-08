var redis = require('redis'),
    client = redis.createClient();

client.on('error', function(err) {
    console.log('Error: ' + err);
});

var name = ['Neil', 'Peter', 'Brian', 'Scott', 'Brian', 'Deborah', 'John',
    'Patrick', 'Mike', 'Courtney', 'Jennifer', 'Jessica', 'Joe', 'Bonnie',
    'Vinny', 'Ramon', 'Becky', 'Sunny', 'Antone', 'John'];
for (var i = 0; i < name.length; i++) {
    client.zadd('contestants', Math.ceil(Math.random() * 12) + 18, name[i]);
}

client.zcard('contestants', function(err, length) {
    if (err) {
        return;
    }
    var n = Math.ceil(length / 3);
    client.zrange('contestants', 0, n - 1, function(err, values) {
        console.log('Young team; ' + values);
    });
    client.zrange('contestants', n, 2 * n - 1, function(err, values) {
        console.log('Middle team: ' + values);
    });
    client.zrange('contestants', 2 * n, length, function(err, values) {
        console.log('Elder team: ' + values);
    });
    client.end();
});