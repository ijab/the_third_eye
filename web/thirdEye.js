/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var index = 0;
var scrollTimer;
var ThirdEyePlugin = { 
    callNativeFunction: function (success, fail, resultType) { 
         return cordova.exec( success, fail, 
                           "Bump", 
                           "Action1", [resultType]); 
    } 
};

$(function(){
    $("#driver").bind('vclick', function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onfileSystemSuccess, onError);
    });
    $("#startBump").bind('vclick', function(){
        usePlugin("Dx");
    });
    startService();
});

function startService(){
    window.clearInterval(scrollTimer);
    scrollTimer = setInterval(function(){
            ++index;
            getDocumentList(index);
    }, 1000);
}

function getDocumentList(time){
    updateLocation();
}

function updateLocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
        var content =   'Latitude: '           + position.coords.latitude              + '<br />' +
                        'Longitude: '          + position.coords.longitude             + '<br />' +
                        'Altitude: '           + position.coords.altitude              + '<br />' +
                        'Accuracy: '           + position.coords.accuracy              + '<br />' +
                        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                        'Heading: '            + position.coords.heading               + '<br />' +
                        'Speed: '              + position.coords.speed                 + '<br />' +
                        'Timestamp: '          + position.timestamp                     + '<br />';
        $.get('list.jsp', 
          {
            location:content
        }, function(data) {
            $("#stage").html(data);
        });
}

function onError(error) {
    var message='code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n';
    $("#stage").html(message);
}

function onfileSystemSuccess(fileSystem){
    var dirEntry=fileSystem.root;
    var directoryReader = dirEntry.createReader();

    // Get a list of all the entries in the directory
    directoryReader.readEntries(success,onError);
}

function success(entries) {
    var i;
    var message="";
    for (i=0; i<entries.length; i++) {
        if(entries[i].isDirectory){
             message=message+"Directory: "+entries[i].name+"<br/>";
        }else{
            message=message+"File: "+entries[i].name+"<br/>";
        }
    }
    $("#filelist").html(message);
}

function usePlugin(user_name){
    ThirdEyePlugin.callNativeFunction( nativePluginResultHandler, nativePluginErrorHandler, user_name ); 
}

function nativePluginResultHandler (result){
    alert("SUCCESS: \r\n"+result ); 
}

function nativePluginErrorHandler (error){
    alert("ERROR: \r\n"+error );
}