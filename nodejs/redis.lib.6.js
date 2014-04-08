var redis = require('redis'),
    talkativeClient = redis.createClient(),
    pensiveClient = redis.createClient();

pensiveClient.on('subscribe', function(chan, count) {
    talkativeClient.publish(chan, 'Welcome to ' + chan);
    talkativeClient.publish(chan, 'You subscribed to ' + count + 'channels!');
});
pensiveClient.on('unsubscribe', function(chan, count) {
    if (count == 0) {
        talkativeClient.end();
        pensiveClient.end();
    }
});

pensiveClient.on('message', function(chan, message) {
    console.log(chan + ': ' + message);
});

pensiveClient.on('ready', function() {
    pensiveClient.subscribe('quiet channel',
        'peaceful channel', 'noisy channel');
    setTimeout(function() {
        pensiveClient.unsubscribe('quiet channel',
            'peaceful channel', 'noisy channel');
    }, 1000);
});

talkativeClient.on('ready', function() {
    setTimeout(function() {
        talkativeClient.publish('quiet channel', 'Hello, It is time to go.');
        talkativeClient.publish('peaceful channel', 'Hello, from peaceful');
        talkativeClient.publish('noisy channel', 'this will shout to you.');
    }, 500);
});