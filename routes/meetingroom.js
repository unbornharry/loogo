let express = require('express');
let meetingroom = express.Router();
let mysqlmeetingroom = require('../mysql/meetingroom');

//POST meetingroom
meetingroom.post('/meetingroom', function(req, res){
    mysqlmeetingroom.createMeetingroom(req.body.buildingid,
        req.body.floorid,
        req.body.meetingroomname,
        req.body.meetingroomdisplayname,
        req.body.deviceid,
        req.body.occupantcount,
        req.body.occupancy,
        req.body.location, function(passed, response){
        if(passed) res.send({meetingroomId: response.insertId});
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//Get meetingroom by id
meetingroom.get('/meetingroom/:meetingroomId', function(req, res){
    let meetingroomId = req.params.meetingroomId;
    mysqlmeetingroom.getMeetingroomByMeetingroomid(meetingroomId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

//GET meetingrooms with query
meetingroom.get('/meetingroom', function(req, res){
    let floorId = req.query.floorid;
    let buildingId = req.query.buildingid;
    if(floorId){
        mysqlmeetingroom.getMeetingroomsByFloorid(floorId, function(passed, response){
            if(passed) res.send(response);
            else res.status(400).send(JSON.stringify({error: response}));
        });
    }
    else if(buildingId){
        mysqlmeetingroom.getMeetingroomsByBuildingid(buildingId, function(passed, response){
            if(passed) res.send(response);
            else res.status(400).send(JSON.stringify({error: response}));
        });
    }
});

//PUT meetingroom
meetingroom.put('/meetingroom/:meetingroomId', function(req, res){
    let meetingroomId = parseInt(req.params.meetingroomId);
    mysqlmeetingroom.updateMeetingroom(meetingroomId,
        req.body.buildingid,
        req.body.floorid,
        req.body.meetingroomname,
        req.body.meetingroomdisplayname,
        req.body.deviceid,
        req.body.occupantcount,
        req.body.occupancy,
        req.body.location, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT meetingroom increment count
meetingroom.put('/meetingroom/:deviceId/increment', function(req, res){
    let deviceid = parseInt(req.params.deviceId);
    mysqlmeetingroom.incrementMeetingroomOccupantCount(deviceid, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT meetingroom decrement count
meetingroom.put('/meetingroom/:deviceId/decrement', function(req, res){
    let deviceid = parseInt(req.params.deviceId);
    mysqlmeetingroom.decrementMeetingroomOccupantCount(deviceid, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT Reserve meetingroom
meetingroom.put('/meetingroom/:meetingroomId/reserve', function(req, res){
    let meetingroomId = parseInt(req.params.meetingroomId);
    mysqlmeetingroom.reserveMeetingroom(meetingroomId, function(passed, response){
            if(passed) {
                setTimeout(function() {
                    mysqlmeetingroom.unreserveMeetingroom(meetingroomId, function (passed, response) {
                        if (passed) console.log("Successfully auto unreserved meetingroomid : " + meetingroomId + " " + response);
                        else console.log("ERROR: Auto unreserve failed for meetingroomid : " + meetingroomId + " " + response);
                    })
                }, 150000);
                res.send(response);
            }
            else res.status(400).send(response);
        });
});

//PUT Unreserve meetingroom
meetingroom.put('/meetingroom/:meetingroomId/unreserve', function(req, res){
    let meetingroomId = parseInt(req.params.meetingroomId);
    mysqlmeetingroom.unreserveMeetingroom(meetingroomId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT Occupy meetingroom
meetingroom.put('/meetingroom/:meetingroomId/occupy', function(req, res){
    let meetingroomId = parseInt(req.params.meetingroomId);
    mysqlmeetingroom.occupyMeetingroom(meetingroomId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT Unoccupy meetingroom
meetingroom.put('/meetingroom/:meetingroomId/unoccupy', function(req, res){
    let meetingroomId = parseInt(req.params.meetingroomId);
    mysqlmeetingroom.unoccupyMeetingroom(meetingroomId, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//PUT meetingroom status
meetingroom.put('/meetingroom', function(req, res){
    let deviceid = req.body.deviceid;
    let occupantcount = req.body.occupantcount;
    mysqlmeetingroom.updateMeetingroomOccupantcount(deviceid, occupantcount, function(passed, response){
        if(passed) res.send(response);
        else res.status(400).send(response);
    });
});

//DELETE meetingroom
meetingroom.delete('/meetingroom/:meetingroomId', function(req, res){
    let meetingroomId = parseInt(req.params.meetingroomId);
    mysqlmeetingroom.deleteMeetingroom(meetingroomId, function(passed, response){
        if(passed) res.status(200).send();
        else res.status(400).send(JSON.stringify({error: response}));
    });
});

module.exports = meetingroom;
