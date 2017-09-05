let pool = require('./connections');

module.exports = {
    createFloor: function(buildingid, floornumber, floorname, callback){
        pool.query("INSERT INTO FLOOR (floorid, buildingid, floornumber, floorname, createdtime, updatedtime) " +
            "VALUES (null, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", [buildingid, floornumber, floorname], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },
    getFloor: function(floorid, callback){
        pool.query("SELECT * FROM FLOOR " +
            "WHERE floorid = ?", [floorid], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },
    getFloorsForBuilding: function(buildingid, callback){
        pool.query("SELECT * FROM FLOOR " +
            "WHERE buildingid = ?", [buildingid], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },
    updateFloor: function(floorid, buildingid, floornumber, floorname, callback){
        pool.query("UPDATE FLOOR SET buildingid = ?, floornumber = ?, floorname = ? " +
            "WHERE floorid = ?", [buildingid, floornumber, floorname, floorid], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },
    deleteFloor: function(floorid, callback){
        pool.query("DELETE FROM FLOOR " +
            "WHERE floorid = ?", [floorid], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    }
};