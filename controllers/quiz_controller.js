var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(function (quiz) {
		if (quiz) {
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function(error) { next(error); });
}

exports.index = function(req, res) {
	var search ="%";
	if (req.query.search && req.query.search.trim().length > 0) {
		search = req.query.search.replace(/\s/g,"%");
		search = ('%' + search + '%').toUpperCase();
	}
	models.Quiz.findAll({where:["upper(pregunta) like ?", search], order:"pregunta"}).then(function (quizes) {
		res.render('quizes/index', { quizes: quizes, search: req.query.search});
	}).catch(function(error) { next(error); });
};

exports.show = function (req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function (req, res) {
	var resultado = 'Incorrecto';
	if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
		resultado = 'Correcto'
	} 
	res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});
};