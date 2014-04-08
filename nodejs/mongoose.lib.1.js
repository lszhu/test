var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    commenter: String,
    body: String,
    posted: Date
});
var ArticleSchema = new Schema({
    author: ObjectId,
    title: String,
    contents: String,
    published: Date,
    comments: [CommentSchema]
});

var Article = mongoose.model('Article', ArticleSchema);
var Comment = mongoose.model('Comment', CommentSchema);

mongoose.connect('mongodb://localhost:27017/nodejs', function(err) {
    if (err) {
        console.log('Could not connect to mongo');
    }
});


var newComment = new Comment({
    commenter: 'all the students must attend.',
    body: 'nothing to say at all',
    posted: new Date()
});
var newArticle = new Article({
    title: 'study math',
    contents: 'about geometry and algebra',
    published: new Date(),
    comments: newComment
});
newArticle.save(function(err) {
    if (err) {
        console.log('Could not save author');
    } else {
        console.log('Author saved');
        Article.find(function(err, doc) {
            console.dir(doc);
            mongoose.disconnect();
        });
    }
});
