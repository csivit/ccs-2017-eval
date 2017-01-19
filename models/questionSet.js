var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSetSchema = new Schema({
        type: String,
        _questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
        answers: Object,
        attemptedOn: Date,
        completedOn: Date,
        _user: {type: Schema.Types.ObjectId, ref: 'User'},
        score: {type: Number, default: -1}
});

module.exports = mongoose.model('QuestionSet', questionSetSchema);