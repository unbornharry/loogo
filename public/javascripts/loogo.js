var urlWashroom= "http://" + document.location.host + "/washrooms";

$.ajax({
	url: urlWashroom,
	type: 'GET',
	crossDomain: true,
	contentType: 'application/x-www-form-urlencoded',
	success: function (result) {
		var washroomsArray = result.washrooms
		if(washroomsArray.length > 0){
			for(var iter=0; iter < washroomsArray.length; iter++){
				$('#' + washroomsArray[iter].id).css('background-color', washroomsArray[iter].status);
			}
		}
	},
	error: function (error) {
		console.log (error);
	}
})

var url90SecondNorth= "http://34.208.93.80:5002/washrooms";
$.ajax({
	url: url90SecondNorth,
	type: 'GET',
	crossDomain: true,
	contentType: 'application/x-www-form-urlencoded',
	success: function (washroomsArray) {
		if(washroomsArray.length > 0){
			for(var iter=0; iter < washroomsArray.length; iter++){
				var color = "black";
				switch(washroomsArray[iter].status) {
					case "in service":
						color = "red"
						break;
					case "closed for cleaning":
						color = "orange"
						break;
					case "active":
						color = "green"
						break;
					default:
						color = "green"
				}
				$('#' + washroomsArray[iter].name).css('background-color', color);
			}
		}
	},
	error: function (error) {
		console.log (error);
	}
})


