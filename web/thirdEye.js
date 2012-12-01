/**
 * The Third Eye for ubicomputing in the future
 * Mobile file sharing
 * Author: zhancaibao@gmail.com XuXun.
 * File: thirdEye.js
 */

var index = 0;
var scrollTimer;


/**
 * ThirdEyePlugin : Cordova Plugins to use Bump APIs
 * Constructor
 */
function ThirdEyePlugin()
{

}

/**
 * Bump to find nearest devices and auth them for file sharing
 *
 * @Method startBump
 * @param {Object} success callback
 * @param {Object} fail callback
 * @param {}
 */
ThirdEyePlugin.prototype.startBump = function(success, fail, resultType)
{
    return cordova.exec(success, fail, "Bump", "Action1", [resultType]);
}

/**
 * Load ThirdEyePlugin
 */

if (typeof window.navigator == 'undefined') {
    window.navigator = {};
}

if (!window.navigator.thirdeye) {
    window.navigator.thirdeye = new ThirdEyePlugin();
}


/**
 * Bind to Show Files and start Bump buttons
 */
$(function(){
    $("#driver").bind('vclick', function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
    });

    $("#startBump").bind('vclick', function(){
        useBumpPlugin("Dx");
    });

    startService();
});


/**
 * Refresh files list and current location every 5 seconds
 * @method startService
 */
function startService()
{
    window.clearInterval(scrollTimer);
    scrollTimer = setInterval(function(){
            ++index;
            getDocumentList(index);
    }, 5000);
}

/**
 * Get available documents list for current time
 * @method getDocumentList
 * @param {Integer} time
 */
function getDocumentList(time)
{
    updateLocation();
}

/**
 * Use cordova's geolocation plugin to get current user's location
 * @method updateLocation
 */
function updateLocation()
{
    navigator.geolocation.getCurrentPosition(onGeoSuccess, onError);
}

/**
 * Success callback function for Gelocation and it shows the current location on page
 * @method onGeoSuccess
 * @param {Object} postion
 */
function onGeoSuccess(position) {
    var content =   'Latitude: '           + position.coords.latitude              + '<br />' +
                    'Longitude: '          + position.coords.longitude             + '<br />' +
                    'Altitude: '           + position.coords.altitude              + '<br />' +
                    'Accuracy: '           + position.coords.accuracy              + '<br />' +
                    'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                    'Heading: '            + position.coords.heading               + '<br />' +
                    'Speed: '              + position.coords.speed                 + '<br />' +
                    'Timestamp: '          + position.timestamp                     + '<br />';
    $.get('list.php', 
        {
            location:content
        }, 
        function(data) {
            $("#stage").html(data);
        });
}

/**
 * Error callback function for Cordova plugins
 * @method onError
 */
function onError(error) 
{
    var message='code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n';
    $("#stage").html(message);
}

/**
 * Callback for Cordova's requestFileSystem and try to list local files on mobile devices
 * @method onFileSystemSuccess
 * @param {Object} fileSystem
 */
function onFileSystemSuccess(fileSystem)
{
    var dirEntry=fileSystem.root;
    var directoryReader = dirEntry.createReader();

    // Get a list of all the entries in the directory
    directoryReader.readEntries(successIterFileSystem, onError);
}

/**
 * Iterate filesyste
 * @method successIterFileSystem
 * @param {Object} entries
 */
function successIterFileSystem(entries) 
{
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

/**
 * start bump with BumpPlugin for Cordova
 * @method useBumpPlugin
 * @param {String} user_name
 */
function useBumpPlugin(user_name)
{
    navigator.thirdeye.startBump(bumpPluginSuccessHandler, bumpPluginErrorHandler, user_name ); 
}

/**
 * Success callback for startBump 
 * @method bumpPluginSuccessHandler
 * @param {Object} result
 */
function bumpPluginSuccessHandler(result)
{
    alert("SUCCESS: \r\n"+result ); 
}

/**
 * Error callback for startBump 
 * @method bumpPluginErrorHandler
 * @param {Object} result
 */
function bumpPluginErrorHandler (error)
{
    alert("ERROR: \r\n"+error );
}