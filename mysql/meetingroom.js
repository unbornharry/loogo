let pool = require('./connections');

module.exports = {
    createMeetingroom: function(buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, callback){
        pool.query("INSERT INTO Meetingroom (Meetingroomid, buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, createdtime, updatedtime) " +
            "VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            [buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    updateMeetingroom: function(Meetingroomid, buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, callback){
        pool.query("UPDATE Meetingroom SET " +
            "buildingid = ?, " +
            "floorid = ?, " +
            "Meetingroomname = ?, " +
            "Meetingroomdisplayname = ?, " +
            "deviceid = ?, " +
            "occupantcount = ?, " +
            "occupancy = ?, " +
            "location = ? " +
            " WHERE Meetingroomid = ?", [buildingid, floorid, Meetingroomname, Meetingroomdisplayname, deviceid, occupantcount, occupancy, location, Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    updateMeetingroomOccupantcount: function(deviceid, occupantcount, callback){
        pool.query("UPDATE Meetingroom SET " +
            "occupantcount = ? " +
            " WHERE deviceid = ?", [occupantcount, deviceid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    reserveMeetingroom: function(Meetingroomid, callback) {
        pool.query("UPDATE Meetingroom SET " +
            "reserved = ? " +
            " WHERE meetingroomid = ?", ['reserved', Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    unreserveMeetingroom: function(Meetingroomid, callback) {
        pool.query("UPDATE Meetingroom SET " +
            "reserved = ? " +
            " WHERE meetingroomid = ?", ['unreserved', Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    deleteMeetingroom: function(Meetingroomid, callback){
        pool.query("DELETE FROM Meetingroom WHERE Meetingroomid = ?", [Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getMeetingroomByMeetingroomid: function(Meetingroomid, callback){
        pool.query("SELECT * FROM Meetingroom WHERE Meetingroomid = ?", [Meetingroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getMeetingroomsByFloorid: function(floorid, callback){
        pool.query("SELECT * FROM Meetingroom WHERE floorid = ?", [floorid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getMeetingroomsByBuildingid: function(buildingid, callback){
        pool.query("SELECT * FROM Meetingroom WHERE buildingid = ?", [buildingid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    }
};