let express = require('express');
let building = express.Router();
let mysqlbuilding = require('../mysql/building');

//POST Building
building.post('/building', function(req, res){
    mysqlbuilding.createBuilding(req.body.buildingname, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, function(passed, response){
        if(passed) res.send({buildingId: response.insertId});
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//Get Building
building.get('/building/:buildingId', function(req, res){
    let buildingId = req.params.buildingId;
    mysqlbuilding.getBuilding(buildingId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//PUT Building
building.put('/building/:buildingId', function(req, res){
    let buildingId = parseInt(req.params.buildingId);
    mysqlbuilding.updateBuilding(buildingId, req.body.buildingname, req.body.address1, req.body.address2, req.body.city, req.body.state, req.body.zip, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//DELETE Building
building.delete('/building/:buildingId', function(req, res){
    let buildingId = parseInt(req.params.buildingId);
    mysqlbuilding.deleteBuilding(buildingId, function(passed, response){
        if(passed) res.status(200).send();
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

module.exports = building;