var express = require('express');
var router = express.Router();

var quizControler = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', quizControler.question);
router.get('/quizes/answer', quizControler.answer);

module.exports = router;
