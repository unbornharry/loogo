var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Loogo' });
});

router.get('/washrooms', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({washrooms:[{id:"90MainNorth", status:"green"},{id:"90MainSouth", status:"green"}, {id:"90SecondNorth", status:"green"},{id:"90SecondSouth", status:"green"}]}))
})

module.exports = router;
