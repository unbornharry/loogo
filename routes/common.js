let express = require('express');
let router = express.Router();
const request = require('sync-request');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Loogo' });
});

router.get('/addrestroom', function(req, res) {
    res.render('addrestroom', {});
});

router.get('/washrooms', function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let statusUrl = "http://52.25.29.73:5002/washrooms";
    statusResponse = request('GET', statusUrl);
    res.send(statusResponse.body);
});


module.exports = router;
