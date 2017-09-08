let express = require('express');
let restroom = express.Router();
let mysqlrestroom = require('../mysql/restroom');

//POST restroom
restroom.post('/restroom', function(req, res){
    mysqlrestroom.createRestroom(req.body.buildingid,
        req.body.floorid,
        req.body.restroomname,
        req.body.restroomdisplayname,
        req.body.gender,
        req.body.numberofstalls,
        req.body.numberofurinals,
        req.body.deviceserialnumber,
        req.body.status,
        req.body.location, function(passed, response){
        if(passed) res.send({restroomId: response.insertId});
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//Get restroom by id
restroom.get('/restroom/:restroomId', function(req, res){
    let restroomId = req.params.restroomId;
    mysqlrestroom.getRestroomByRestroomid(restroomId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//GET restrooms with query
restroom.get('/restroom', function(req, res){
    let floorId = req.query.floorid;
    let buildingId = req.query.buildingid;
    let gender = req.query.gender || '%';
    if(floorId){
        mysqlrestroom.getRestroomsByFloorid(floorId, gender, function(passed, response){
            if(passed) res.send(response);
            else res.status(400).send(JSON.stringify({error: response}));
        });
    }
    else if(buildingId){
        mysqlrestroom.getRestroomsByBuildingid(buildingId, gender, function(passed, response){
            if(passed) res.send(response);
            else res.status(400).send(JSON.stringify({error: response}));
        });
    }
});

//PUT restroom
restroom.put('/restroom/:restroomId', function(req, res){
    let restroomId = parseInt(req.params.restroomId);
    mysqlrestroom.updateRestroom(restroomId,
        req.body.buildingid,
        req.body.floorid,
        req.body.restroomname,
        req.body.restroomdisplayname,
        req.body.gender,
        req.body.numberofstalls,
        req.body.numberofurinals,
        req.body.deviceserialnumber,
        req.body.status,
        req.body.location, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT restroom status
restroom.put('/restroom', function(req, res){
    let restroomName = req.body.restroomname;
    let status = req.body.status;
    mysqlrestroom.updateRestroomStatus(restroomName, status, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//DELETE restroom
restroom.delete('/restroom/:restroomId', function(req, res){
    let restroomId = parseInt(req.params.restroomId);
    mysqlrestroom.deleteRestroom(restroomId, function(passed, response){
        if(passed) res.status(200).send();
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

module.exports = restroom;


