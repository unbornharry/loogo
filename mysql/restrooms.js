const cassandra = require('mysql');
const config = require('../config/config.json');
const guid = require('../utils/guid');

const db = new cassandra.Client({ contactPoints: [config.cassandra], keyspace: 'loogo' });

module.exports = {
    getFloorsForBuilding: function(buildingid){
        const query = "SELECT * FROM renopushnotification.archive WHERE messageid = '" + userRandomMessage.id + "' AND deviceguid = 'ORIGIN' ALLOW FILTERING";
    },

    addRestroom: function(buildingid, buildingname, floornumber, gender, name){
        const addrestroomquery = "INSERT INTO restrooms (id, buildingid, buildingname, floornumber, gender, name) VALUES (?,?,?,?,?)";
        const addrestroomparams = [guid.uuid(), buildingid, floornumber, gender, name]
    },

    removeRestroom: function(id){
        const removerestroomquery = "DELETE FROM restrooms where id = ?";
        const removerestroomparams = [id];
    }

};