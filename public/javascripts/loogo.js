var urlWashroom= window.location.href + "washrooms";

setInterval(updateRestroomStatuses, 3000);

function updateRestroomStatuses(){
    $.ajax({
        url: urlWashroom,
        type: 'GET',
        crossDomain: true,
        contentType: 'application/x-www-form-urlencoded',
        success: function (washroomsArray) {
            if(washroomsArray.length > 0){
                for(var iter=0; iter < washroomsArray.length; iter++){
                    var color = "black";
                    switch(washroomsArray[iter].status) {
                        case "under service":
                            color = "red";
                            break;
                        case "closed for cleaning":
                            color = "yellow";
                            break;
                        case "active":
                            color = "green";
                            break;
                        default:
                            color = "green";
                    }
                    $('#' + washroomsArray[iter].name).css('background-color', color);
                }
            }
        },
        error: function (error) {
            console.log (error);
        }
    })
}