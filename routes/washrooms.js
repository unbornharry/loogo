var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Loogo' });
});

router.get('/washrooms', function(req, res){
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({washrooms:[{id:"SecondNorthMen", status:"red"},{id:"SecondNorthWomen", status:"green"}, {id:"SecondSouthMen", status:"orange"},{id:"SecondSouthWomen", status:"green"}]}))
});

module.exports = router;
