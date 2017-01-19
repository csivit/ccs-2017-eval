var express = require('express');
var router = express.Router();
var User = require('../models/user');
var QuestionSet = require('../models/questionSet');
var Question = require('../models/question');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/responses/:type', function (req, res) {
  var type = req.params.type;
  QuestionSet.find({
    type: type,
    answers: {
      $exists: true
    }
  }, '_user score').populate('_user').exec(function (err, sets) {
    res.json(sets);
  })
});

router.get('/response/:id', function (req, res) {
  var id = req.params.id;
  QuestionSet.findByIdAndUpdate(id, {
    score: -1
  }).populate('_user _questions').exec(function (err, set) {
    res.json(set);
  })
});

router.post('/submit', function (req, res) {
  var rating = req.body.rating;
  var id = req.body.id;
  var type = req.body.type;

  QuestionSet.findByIdAndUpdate(id, {
    score: rating
  }, function (err) {
    QuestionSet.findOne({
      type: type,
      answers: {
        $exists: true
      },
      score: {
        $exists: false
      }
    }, function (err, questionSet) {
      res.json({
        id: questionSet._id
      })
    })
  });


})

module.exports = router;