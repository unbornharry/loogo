let pool = require('./connections');

module.exports = {
    createRestroom: function(buildingid, floorid, restroomname, restroomdisplayname, gender, numberofstalls, numberofurinals, deviceserialnumber, status, location, callback){
        pool.query("INSERT INTO RESTROOM (restroomid, buildingid, floorid, restroomname, restroomdisplayname, gender, numberofstalls, numberofurinals, deviceserialnumber, status, location, createdtime, updatedtime) " +
            "VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
            [buildingid, floorid, restroomname, restroomdisplayname, gender, numberofstalls, numberofurinals, deviceserialnumber, status, location], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    updateRestroom: function(restroomid, buildingid, floorid, restroomname, restroomdisplayname, gender, numberofstalls, numberofurinals, deviceserialnumber, status, location, callback){
        pool.query("UPDATE RESTROOM SET " +
            "buildingid = ?, " +
            "floorid = ?, " +
            "restroomname = ?, " +
            "restroomdisplayname = ?, " +
            "gender = ?, " +
            "numberofstalls = ?, " +
            "numberofurinals = ?, " +
            "status = ?, " +
            "location = ? " +
            " WHERE restroomid = ?", [buildingid, floorid, restroomname, restroomdisplayname, gender, numberofstalls, numberofurinals, status, location, restroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    updateRestroomStatus: function(restroomName, status, callback){
        pool.query("UPDATE RESTROOM SET " +
            "status = ? " +
            " WHERE restroomname = ?", [status, restroomName], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    deleteRestroom: function(restroomid, callback){
        pool.query("DELETE FROM RESTROOM WHERE restroomid = ?", [restroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getRestroomByRestroomid: function(restroomid, callback){
        pool.query("SELECT * FROM RESTROOM WHERE restroomid = ?", [restroomid], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },

    getRestroomsByFloorid: function(floorid, gender, callback){
        pool.query("SELECT * FROM RESTROOM WHERE floorid = ? AND gender like ?", [floorid, gender], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },
    getRestroomsByBuildingid: function(buildingid, gender, callback){
        pool.query("SELECT * FROM RESTROOM WHERE buildingid = ? AND gender like ?", [buildingid, gender], function (err, results){
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    }

};