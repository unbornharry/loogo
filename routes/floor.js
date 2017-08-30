let express = require('express');
let floor = express.Router();
let mysqlfloor = require('../mysql/floor');

//POST floor
floor.post('/floor', function(req, res){
    mysqlfloor.createFloor(req.body.buildingid, req.body.floornumber, req.body.floorname, function(passed, response){
        if(passed) res.send({floorId: response.insertId});
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//Get floor
floor.get('/floor/:floorId', function(req, res){
    let floorId = req.params.floorId;
    mysqlfloor.getFloor(floorId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//PUT floor
floor.put('/floor/:floorId', function(req, res){
    let floorId = parseInt(req.params.floorId);
    mysqlfloor.updateFloor(floorId, req.body.buildingid, req.body.floornumber, req.body.floorname, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//DELETE floor
floor.delete('/floor/:floorId', function(req, res){
    let floorId = parseInt(req.params.floorId);
    mysqlfloor.deleteFloor(floorId, function(passed, response){
        if(passed) res.status(200).send();
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

module.exports = floor;