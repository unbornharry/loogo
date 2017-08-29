let pool = require('./connections');

module.exports = {
    createBuilding: function (buildingname, address1, address2, city, state, zip, callback) {
        pool.query("INSERT INTO BUILDING (buildingid, buildingname, address1, address2, city, state, zip, createdtime, updatedtime) " +
            "VALUES (null, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)", [buildingname, address1, address2, city, state, zip], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results.insertId);
        });
    },
    getBuilding: function (buildingId, callback) {
        pool.query("SELECT buildingid, buildingname, address1, address2, city, state, zip, createdtime, updatedtime " +
            "FROM building WHERE buildingId = ?", [buildingId], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, JSON.stringify(
                    {
                        buildingid: results[0].buildingid,
                        buildingname: results[0].buildingname,
                        address1: results[0].address1,
                        address2: results[0].address2,
                        city: results[0].city,
                        state: results[0].state,
                        zip: results[0].zip,
                        createdtime: results[0].createdtime,
                        updatedtime: results[0].updatedtime
                    }
                ));
            }
        );
    },
    updateBuilding: function (buildingid, buildingname, address1, address2, city, state, zip, callback) {
        pool.query("UPDATE BUILDING SET buildingname = ?, address1 = ?, address2 = ?, city = ?, state = ?, zip = ? " +
            "WHERE buildingid = ?", [buildingname, address1, address2, city, state, zip, buildingid], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results.insertId);
        });
    },
    deleteBuilding: function (buildingid, callback) {
        pool.query("DELETE from building " +
            "WHERE buildingid = ?", [buildingid], function (err, results) {
            if (err)
                return callback(false, err.sqlMessage);
            else
                return callback(true, results);
        });
    },
};