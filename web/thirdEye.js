/**
 * The Third Eye for ubicomputing in the future
 * Mobile file sharing
 * Author: zhancaibao@gmail.com XuXun.
 * File: thirdEye.js
 */

var _debug = false;
var refreshTimer = null;

// String.prototype.hashCode = function(){
//     var hash = 0;
//     if (this.length == 0) return hash;
//     for (i = 0; i < this.length; i++) {
//         char = this.charCodeAt(i);
//         hash = ((hash<<5)-hash)+char;
//         hash = hash & hash; // Convert to 32bit integer
//     }
//     return hash;
// }


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
   
    // Bind to login submit button
    $("#login_submit").bind('vclick', function(){
        $('#logged_user_name').val($('#username').val());
        $.mobile.changePage($("#files_list"));
    });

    // Bind to share public and private button
    $("#share_file_public").bind('vclick', function(){
        uploadFileForSharing('public');
    });

    $("#share_file_private").bind('vclick', function(){
        uploadFileForSharing('private');
    });

   

    // When change to file list page, try to get shared files
    $('#files_list').live('pageinit',function (){
        if(!_debug)
        {
            startService();
        }
        else
        {//Test
            updateFilesList();
        }    
    });


    // When change to select file page, try to list local files for choosing to share
    $('#select_file_page').live('pageinit',function(){
        if(window.requestFileSystem)
        {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
        }
        else
        {
            var testData = [{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/LOST.DIR","name":"LOST.DIR"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Android","name":"Android"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/DCIM","name":"DCIM"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.GuoheAd","name":".GuoheAd"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.0102","name":".0102"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/sogou","name":"sogou"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/tencent","name":"tencent"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/openfeint","name":"openfeint"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/MTGIF","name":"MTGIF"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/bluetooth","name":"bluetooth"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ibuka","name":"ibuka"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.pps","name":".pps"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/msf","name":"msf"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ndcommplatform","name":"ndcommplatform"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/youmicache","name":"youmicache"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/wowfish","name":"wowfish"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Youdao","name":"Youdao"},{"isDirectory":false,"isFile":true,"fullPath":"file:\/\/\/storage\/sdcard0\/robo_defense_full.bak","name":"robo_defense_full.bak"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/MTXX","name":"MTXX"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/UCDownloads","name":"UCDownloads"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Songs","name":"Songs"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/bugreports","name":"bugreports"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/PandaSpace","name":"PandaSpace"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.estrongs","name":".estrongs"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/snesroms","name":"snesroms"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/91PandaReader","name":"91PandaReader"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/backups","name":"backups"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.cerience","name":".cerience"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/catstudio","name":"catstudio"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/QQBrowser","name":"QQBrowser"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/KuwoMusic","name":"KuwoMusic"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/byread","name":"byread"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Meterial","name":"Meterial"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/My Documents","name":"My Documents"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ONS","name":"ONS"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/wallpaper","name":"wallpaper"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ringtones","name":"ringtones"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/music","name":"music"}];
            successIterFileSystem(testData, null);
        }
    });

    // Make it happy on Cordova
    $( document ).bind( "mobileinit", function() {
        // Make your jQuery Mobile framework configuration changes here!
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.mobile.pushStateEnabled = false;
    });
});


/**
 * Refresh files list and current location every 5 seconds
 * @method startService
 */
function startService()
{
    // Refresh file list for the origin time
    getDocumentList();

    // Then setup timer every 5 seconds
    if(refreshTimer) 
    {
        window.clearInterval(refreshTimer);
    }

    refreshTimer = setInterval(function(){
            getDocumentList();
    }, 5000);
}

/**
 * Get available documents list for current time
 * @method getDocumentList
 * 
 */
function getDocumentList()
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
 * Update Files List and handle Bump request
 * @method updateFilesList
 * @param {Object} resp
 */
function updateFilesList(resp)
{
     if(!_debug && resp.msg != 'success')
     {
         return;
     }

    // update shared with me files list
    $('#shared_with_me_files_list li').remove();
    var files = null;
    if(!_debug) 
    {
        files = resp.data.files;
    }
    else
    {
        files = [{fileid:"1", filename:"nat.pdf", owner:"ijab", type:"public"},
                 {fileid:"2", filename:"abcc.doc", owner:"ijab", type:"public"},
                 {fileid:"3", filename:"gowhere.xls", owner:"ijab", type:"private"}];
    }
    $.each(files, function(index, file) {
        if (typeof console != "undefined") { 
            console.log("Add shared with me: " + file.filename);
        }

        $('#shared_with_me_files_list').append(
                '<li id="' + file.fileid + '">' + 
                '<a href="javascript:downloadFile(\'' + file.fileid + '\', \'' + file.filename + '\', \'' + file.owner + '\', \'' + file.type + '\')">' +
                '<h4>' + file.filename + '</h4>' +
                '<span class="ui-li-count">' + file.owner + '</span>' +
                '<span class="ui-li-count">' + file.type + '</span></a></li>');
    });
    $('#shared_with_me_files_list').listview('refresh');

    
    // update my shared files list
    $('#my_shared_files_list li').remove();
    if(!_debug) 
    {
        files = resp.data.myfiles;
    }
    else
    {
        files = [{fileid:"1", filename:"nat.gps", owner:"ijab", type:"public"},
             {fileid:"2", filename:"abcc.html", owner:"ijab", type:"public"},
             {fileid:"3", filename:"gowhere.php", owner:"ijab", type:"private"}];
    }
    $.each(files, function(index, file) {
        if (typeof console != "undefined") { 
            console.log("Add my shared: " + file.filename);
        }

        $('#my_shared_files_list').append('<li id="' + file.fileid + '">' + 
                '<a href="javascript:removeSharedFile(\'' + file.fileid + '\', \'' + file.filename + '\', \'' + file.type + '\')">' +
                '<h4>' + file.filename + '</h4>' +
                '<span class="ui-li-count">' + file.owner + '</span>' +
                '<span class="ui-li-count">' + file.type + '</span></a></li>');
    });
    $('#my_shared_files_list').listview('refresh');


    // If somebody ask to bump
    if(!_debug && resp.data.bump.length > 0)
    {
        // Give some info to user that somebody want to ask his/her file
        var param = {};
        param.username = $('#logged_user_name').val();
        param.fileid = resp.data.bump[0].fileid;
        param.filename = resp.data.bump[0].filename;
        param.requestee = resp.data.bump[0].requestee;
        param.isRequestee = 'false';
        useBumpPlugin(param);
    }
}

/**
 * Helper funciton for download file
 */

function getDirForDownload(fileSystem, fileid, filename){
    $("#info_tip").html("getDirForDownload " + filename);
    var dirEntry=fileSystem.root;
    var callbackFun = function(dir)
    {
        readyForDownload(dir, fileid, filename);
    };
    dirEntry.getDirectory("SharemiDocs", {create: true, exclusive: false}, callbackFun, onError);
}

function readyForDownload(dir, fileid, filename){
    $("#info_tip").html("Ready for download " + filename);
    var fileTransfer = new FileTransfer();
    var thisHREF = document.location.href;  
    var rootURL =thisHREF.split("Sharemi")[0];
    var uri = encodeURI(rootURL+"Sharemi/download.php?fileid="+ fileid);
    fileTransfer.onprogress = function(progressEvent) {
    if (progressEvent.lengthComputable) {
            $("#info_tip").html("Finished "+progressEvent.loaded+"/"+progressEvent.total);
          } else {
            $("#info_tip").html("downloading!");
          }
      };
    fileTransfer.download(
        uri,
        dir.fullPath+"/"+ filename,
        function(entry) {
            $("#info_tip").html("Completely download "+entry.fullPath);
        },
        function(error) {
            $("#info_tip").html("Fail to download "+error.message);
        }
    );
}

function saveFile(fileid, filename)
{
    // !! Assumes filePath is a valid path on the device

    $("#info_tip").html("Start downloading ...");
    $('#popupInfo').popup('open');

    var callbackFun = function(dir)
    {
       getDirForDownload(dir, fileid, filename);
    };
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, callbackFun, onError);
}

/**
 * Try to download a file from shared devices
 */
function downloadFile(fileid, filename, owner, type)
{
    if(type == 'public')
    {
        saveFile(fileid, filename);
    }
    else // Send Bump request to file owner
    {
        $.get(baseURL + 'bump.php', 
        {
            action : 'startBump',
            fileid : fileid,
            filename : filename,
            requestee : $('#logged_user_name').val()
        }, 
        function(data) {
            $('#info_tip').text('Please BUMP with ' + owner + ' to get the permission for downloading file in 20 seconds.');
            $('#popupInfo').popup('open');

            var param = {};
            param.fileid = fileid;
            param.filename = filename;
            param.requestee = $('#logged_user_name').val();
            param.isRequestee = 'true';
            useBumpPlugin(param);
        },
        'json');

    }
}


/**
 * Try to remove my shared file
 */
function removeSharedFile(fileid, filename, type)
{
    $.get(baseURL + 'remove_share.php', 
        {
            username : $('#logged_user_name').val(),
            fileid : fileid,
            type : type
        }, 
        function(data) {
            $('#' + fileid).remove();
            $('#my_shared_files_list').listview('refresh');
        },
        'json');
}


/**
 * Success callback function for Gelocation and it shows the current location on page
 * @method onGeoSuccess
 * @param {Object} postion
 */
function onGeoSuccess(position) {
    $.get(baseURL + 'getLocation.php', 
        {
            username : $('#logged_user_name').val(),
            x : position.coords.longitude,
            y : position.coords.latitude
        }, 
        function(data) {
            updateFilesList(data);
        },
        'json');
}

/**
 * Error callback function for Cordova plugins
 * @method onError
 */
function onError(error) 
{
    $('#info_tip').text(error.message);
    $('#popupInfo').popup('open');
}

/**
 * Callback for Cordova's requestFileSystem and try to list local files on mobile devices
 * @method onFileSystemSuccess
 * @param {Object} fileSystem
 */
var local_file_ix = 0;
var local_parent_node = null;

function onFileSystemSuccess(fileSystem)
{
    var dirEntry=fileSystem.root;
    var directoryReader = dirEntry.createReader();

    // Remove current local list
    $('#local_files_list').removeChildren();

    // Get a list of all the entries in the directory
    var onReadEntry = function(entries)
                    {
                        successIterFileSystem(entries, local_parent_node);
                    };
    directoryReader.readEntries(onReadEntry, onError);
}

/**
 * Iterate filesyste
 * @method successIterFileSystem
 * @param {Object} entries
 */
function successIterFileSystem(entries, parent_node) 
{
    var i;
    var message="";

   
    for (i=0; i<entries.length; i++) 
    {
        if(entries[i].name[0] == '.' || entries[i].name == 'LOST.DIR') continue;
         
        if(entries[i].isDirectory)
        {
            // Add directory node
            var colID = entries[i].name.replace(/ /g,'_')
            var html = '<div id="' + colID;
                html += '" data-role="collapsible" data-collapsed="true" data-theme="b" data-content-theme="c">';
                html += '<h3>' + entries[i].name + '</h3></div>';
            local_parent_node = colID;
            

            if(!parent_node)
            {
                $('#local_files_list').append(html);
            }
            else
            {
                $('#' + parent_node).append(html);
            }

            // Refresh collapsibleset
            $("#" + colID ).collapsible();
            if (typeof console != "undefined") { 
                console.log("Append collapsible element " + entries[i].name);
            }

            local_file_ix++;

            // Recursively read it
            // if(!_debug)
            // {
            //     var directoryReader = entries[i].createReader();

            //     // Get a list of all the entries in the directory
            //     var onReadEntry = function(sub_entries)
            //                     {
            //                         successIterFileSystem(sub_entries, local_parent_node);
            //                     };
            //     directoryReader.readEntries(onReadEntry, onError);
            // }
        }
        else
        {
            var ulID = parent_node ? parent_node + local_file_ix : 'local_files_list' + local_file_ix;
            var ulHtml = '<ul id="' + ulID + '" data-role="listview" data-inset="true" data-theme="d"></ul>';
            var liEl = '<li><span>' + entries[i].name;
                liEl += '<span><a href="javascript:popupShareMenu(\'' + entries[i].name + '\', \'' + entries[i].fullPath + '\')"';
                liEl += ' data-rel="popup" data-role="button" data-inline="true" data-icon="arrow-d">Share</a></li>';
            if(!parent_node)
            {
                if($('#' + ulID).length < 1) 
                {
                    $('#local_files_list').append(ulHtml);
                    $('#' + ulID).listview();
                }
            }
            else
            {
               if($('#' + ulID).length < 1) 
                {
                    $('#' + parent_node).append(ulHtml);
                }
            }
            $('#' + ulID).append(liEl);
            $('#' + ulID).listview('refresh');
            if (typeof console != "undefined") { 
                console.log("Append list element " + entries[i].name);
            }

            local_file_ix++;
        }
    }
}

function uploadFileForSharing(type)
{
    var filename = $('#try_to_share_file_name').val();
    var filepath = $('#try_to_share_file').val();

    if(!filename || !filepath)
    {
        return;
    }

    $('#info_tip').text('Start uploading ...');
    $('#popupInfo').popup('open');

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = filename;
    options.chunkedMode = false;

    var params = {};
    params.owner = $('#logged_user_name').val();
    params.type = type;

    options.params = params;

    var succ = function(r)
            {
                $('#info_tip').text('Finished uploading ' + filename);
            };

    var fail = function(err)
            {
                $('#info_tip').text('Failed uploading ' + filename);
            };

    var ft = new FileTransfer();
    ft.upload(filepath, encodeURI(baseURL + "upload.php"), succ, fail, options);
}

function popupShareMenu(filename, filepath, isDirectory)
{
    if(isDirectory)
    {

    }
    else
    {
        $('#try_to_share_file_name').val(filename);
        $('#try_to_share_file').val(filepath);

        $('#shareFileMenu').popup('open');
    }
}

/**
 * start bump with BumpPlugin for Cordova
 * @method useBumpPlugin
 * @param {Object} param
 */
function useBumpPlugin(param)
{
    navigator.thirdeye.startBump(bumpPluginSuccessHandler, bumpPluginErrorHandler,  param); 
}

/**
 * Success callback for startBump 
 * @method bumpPluginSuccessHandler
 * @param {Object} result
 */
function bumpPluginSuccessHandler(result)
{

    // Match success and notify the server
    if(result.isRequestee == 'true')
    {
        $.get(baseURL + 'bump.php', 
            {
                action : "stopBump",
                fileid : result.fileid,
                filename : result.filename
            }, 
            function(data) {
                
            });
    }

    // Try to download the file
    saveFile(result.fileid, result.filename);
}

/**
 * Error callback for startBump 
 * @method bumpPluginErrorHandler
 * @param {Object} result
 */
function bumpPluginErrorHandler(error)
{
    $('#info_tip').text(error);
    $('#popupInfo').popup('open');
=======
/**
 * The Third Eye for ubicomputing in the future
 * Mobile file sharing
 * Author: zhancaibao@gmail.com XuXun.
 * File: thirdEye.js
 */

var _debug = true;
var refreshTimer = null;

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
   
    // Bind to login submit button
    $("#login_submit").bind('vclick', function(){
        $('#logged_user_name').val($('#username').val());
        $.mobile.changePage($("#files_list"));
    });

    // Bind to share public and private button
    $("#share_file_public").bind('vclick', function(){
        uploadFileForSharing('public');
    });

    $("#share_file_private").bind('vclick', function(){
        uploadFileForSharing('private');
    });

    // When change to file list page, try to get shared files
    $('#files_list').live('pageshow',function (){
        if(!_debug)
        {
            startService();
        }
        else
        {//Test
            updateFilesList();
        }    
    });

    // When change to select file page, try to list local files for choosing to share
    $('#select_file').live('pageshow',function (){
        if(window.requestFileSystem)
        {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFileSystemSuccess, onError);
        }
        else
        {
            var testData = [{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/LOST.DIR","name":"LOST.DIR"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Android","name":"Android"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/DCIM","name":"DCIM"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.GuoheAd","name":".GuoheAd"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.0102","name":".0102"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/sogou","name":"sogou"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/tencent","name":"tencent"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/openfeint","name":"openfeint"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/MTGIF","name":"MTGIF"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/bluetooth","name":"bluetooth"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ibuka","name":"ibuka"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.pps","name":".pps"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/msf","name":"msf"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ndcommplatform","name":"ndcommplatform"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/youmicache","name":"youmicache"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/wowfish","name":"wowfish"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Youdao","name":"Youdao"},{"isDirectory":false,"isFile":true,"fullPath":"file:\/\/\/storage\/sdcard0\/robo_defense_full.bak","name":"robo_defense_full.bak"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/MTXX","name":"MTXX"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/UCDownloads","name":"UCDownloads"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Songs","name":"Songs"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/bugreports","name":"bugreports"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/PandaSpace","name":"PandaSpace"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.estrongs","name":".estrongs"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/snesroms","name":"snesroms"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/91PandaReader","name":"91PandaReader"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/backups","name":"backups"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/.cerience","name":".cerience"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/catstudio","name":"catstudio"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/QQBrowser","name":"QQBrowser"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/KuwoMusic","name":"KuwoMusic"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/byread","name":"byread"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/Meterial","name":"Meterial"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/My Documents","name":"My Documents"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ONS","name":"ONS"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/wallpaper","name":"wallpaper"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/ringtones","name":"ringtones"},{"isDirectory":true,"isFile":false,"fullPath":"file:\/\/\/storage\/sdcard0\/music","name":"music"}];
            successIterFileSystem(testData, null);
        }
    });

    // Make it happy on Cordova
    $( document ).bind( "mobileinit", function() {
        // Make your jQuery Mobile framework configuration changes here!
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
        $.mobile.pushStateEnabled = false;
    });
});


/**
 * Refresh files list and current location every 5 seconds
 * @method startService
 */
function startService()
{
    // Refresh file list for the origin time
    getDocumentList();

    // Then setup timer every 5 seconds
    if(refreshTimer) 
    {
        window.clearInterval(refreshTimer);
    }

    refreshTimer = setInterval(function(){
            getDocumentList();
    }, 5000);
}

/**
 * Get available documents list for current time
 * @method getDocumentList
 * 
 */
function getDocumentList()
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
 * Update Files List and handle Bump request
 * @method updateFilesList
 * @param {Object} resp
 */
function updateFilesList(resp)
{
     if(!_debug && resp.msg != 'success')
     {
         return;
     }

    // update shared with me files list
    $('#shared_with_me_files_list li').remove();
    var files = null;
    if(!_debug) 
    {
        files = resp.data.files;
    }
    else
    {
        files = [{fileid:"1", filename:"nat.pdf", owner:"ijab", type:"public"},
                 {fileid:"2", filename:"abcc.doc", owner:"ijab", type:"public"},
                 {fileid:"3", filename:"gowhere.xls", owner:"ijab", type:"private"}];
    }
    $.each(files, function(index, file) {
        $('#shared_with_me_files_list').append(
                '<li id="' + file.fileid + '">' + 
                '<a href="javascript:downloadFile(\'' + file.fileid + '\', \'' + file.filename + '\', \'' + file.owner + '\', \'' + file.type + '\')">' +
                '<h4>' + file.filename + '</h4>' +
                '<span class="ui-li-count">' + file.owner + '</span>' +
                '<span class="ui-li-count">' + file.type + '</span></a></li>');
    });
    $('#shared_with_me_files_list').listview('refresh');

    
    // update my shared files list
    $('#my_shared_files_list li').remove();
    if(!_debug) 
    {
        files = resp.data.myfiles;
    }
    else
    {
        files = [{fileid:"1", filename:"nat.gps", owner:"ijab", type:"public"},
             {fileid:"2", filename:"abcc.html", owner:"ijab", type:"public"},
             {fileid:"3", filename:"gowhere.php", owner:"ijab", type:"private"}];
    }
    $.each(files, function(index, file) {
        $('#my_shared_files_list').append('<li id="' + file.fileid + '">' + 
                '<a href="javascript:removeSharedFile(\'' + file.fileid + '\', \'' + file.filename + '\', \'' + file.type + '\')">' +
                '<h4>' + file.filename + '</h4>' +
                '<span class="ui-li-count">' + file.owner + '</span>' +
                '<span class="ui-li-count">' + file.type + '</span></a></li>');
    });
    $('#my_shared_files_list').listview('refresh');


    // If somebody ask to bump
    if(!_debug && resp.data.bump.length > 0)
    {
        // Give some info to user that somebody want to ask his/her file
        var param = {};
        param.username = $('#logged_user_name').val();
        param.fileid = resp.data.bump[0].fileid;
        param.filename = resp.data.bump[0].filename;
        param.requestee = resp.data.bump[0].requestee;
        param.isRequestee = 'false';
        useBumpPlugin(param);
    }
}

/**
 * Helper funciton for download file
 */
function saveFile(fileid, filename)
{
    // !! Assumes filePath is a valid path on the device

    $("#info_tip").html("Start downloading ...");
    $('#popupInfo').popup('open');

    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, getDirForDownload, onError);
    function getDirForDownload(fileSystem){
        var dirEntry = fileSystem.root;
        dirEntry.getDirectory("SharemiDocs", {create: true, exclusive: false}, readyForDownload, onError);
        
        function readyForDownload(dir){
            var fileTransfer = new FileTransfer();
            var uri = encodeURI(baseURL+"download.php?fileid="+fileid);
            fileTransfer.onprogress = function(progressEvent) {
                                    if (progressEvent.lengthComputable) {
                                        $("#info_tip").html("Finished " + progressEvent.loaded + "/" + progressEvent.total);
                                    }
            };

            fileTransfer.download(
                uri,
                dir.fullPath+"/" + filename,
                function(entry) {
                    $("#info_tip").html("Completely download " + entry.fullPath);
                },
                function(error) {
                    $("#info_tip").html("Fail to download " + error.message);
                }
            );
        }
    }
}

/**
 * Try to download a file from shared devices
 */
function downloadFile(fileid, filename, owner, type)
{
    if(type == 'public')
    {
        saveFile(fileid, filename);
    }
    else // Send Bump request to file owner
    {
        $.get(baseURL + 'bump.php', 
        {
            fileid : fileid,
            filename : filename,
            requestee : $('#logged_user_name').val()
        }, 
        function(data) {
            $('#info_tip').text('Please BUMP with ' + owner + ' to get the permission for downloading file in 20 seconds.');
            $('#popupInfo').popup('open');

            var param = {};
            param.fileid = fileid;
            param.filename = filename;
            param.requestee = $('#logged_user_name').val();
            param.isRequestee = 'true';
            useBumpPlugin(param);
        },
        'json');

    }
}


/**
 * Try to remove my shared file
 */
function removeSharedFile(fileid, filename, type)
{
    $.get(baseURL + 'remove_share.php', 
        {
            username : $('#logged_user_name').val(),
            fileid : fileid,
            type : type
        }, 
        function(data) {
            $('#' + fileid).remove();
            $('#my_shared_files_list').listview('refresh');
        },
        'json');
}


/**
 * Success callback function for Gelocation and it shows the current location on page
 * @method onGeoSuccess
 * @param {Object} postion
 */
function onGeoSuccess(position) {
    $.get(baseURL + 'getLocation.php', 
        {
            username : $('#logged_user_name').val(),
            x : position.coords.longitude,
            y : position.coords.latitude
        }, 
        function(data) {
            updateFilesList(data);
        },
        'json');
}

/**
 * Error callback function for Cordova plugins
 * @method onError
 */
function onError(error) 
{
    $('#info_tip').text(error.message);
    $('#popupInfo').popup('open');
}

/**
 * Callback for Cordova's requestFileSystem and try to list local files on mobile devices
 * @method onFileSystemSuccess
 * @param {Object} fileSystem
 */
var local_file_ix = 0;
var local_parent_node = null;

function onFileSystemSuccess(fileSystem)
{
    var dirEntry=fileSystem.root;
    var directoryReader = dirEntry.createReader();

    // Remove current local list
    $('#local_files_list').remove();

    // Get a list of all the entries in the directory
    var onReadEntry = function(entries)
                    {
                        successIterFileSystem(entries, local_parent_node);
                    };
    directoryReader.readEntries(onReadEntry, onError);
}

/**
 * Iterate filesyste
 * @method successIterFileSystem
 * @param {Object} entries
 */
function successIterFileSystem(entries, parent_node) 
{
    var i;
    var message="";


    for (i=0; i<entries.length; i++) 
    {
        if(entries[i].name[0] == '.' || entries[i].name == 'LOST.DIR') continue;
        try
        {
            $( "#" + entries[i].name + local_file_ix );
        }
        catch(err)
        {
            continue;
        }

 
        if(entries[i].isDirectory)
        {
            // Add directory node
            var html = '<div id="' + entries[i].name + local_file_ix;
                html += '" data-role="collapsible" data-collapsed="false" data-theme="e" data-content-theme="c">';
                html += '<h3>' + entries[i].name + '</h3></div>';
            local_parent_node = entries[i].name + local_file_ix;
            local_file_ix++;

            if(!parent_node)
            {
                $('#local_files_list').append(html);
            }
            else
            {
                $('#' + parent_node).append(html);
            }

            // Refresh collapsibleset
            $( "#" + entries[i].name + local_file_ix ).collapsible();

            // Recursively read it
            if(!_debug)
            {
                var directoryReader = entries[i].createReader();

                // Get a list of all the entries in the directory
                var onReadEntry = function(sub_entries)
                                {
                                    successIterFileSystem(sub_entries, local_parent_node);
                                };
                directoryReader.readEntries(onReadEntry, onError);
            }
        }
        else
        {
            var ulID = parent_node ? parent_node + local_file_ix : 'local_files_list' + local_file_ix;
            var ulHtml = '<ul id="' + ulID + '" data-role="listview" data-inset="true" data-theme="d"></ul>';
            var liEl = '<li><span>' + entries[i].name;
                liEl += '<span><a href="javascript:popupShareMenu(\'' + entries[i].name + '\', \'' + entries[i].fullPath + '\')"';
                liEl += ' data-rel="popup" data-role="button" data-inline="true" data-icon="arrow-d">Share</a></li>';
            if(!parent_node)
            {
                if($('#' + ulID).length < 1) 
                {
                    $('#local_files_list').append(ulHtml);
                    $('#' + ulID).listview();
                }
            }
            else
            {
               if($('#' + ulID).length < 1) 
                {
                    $('#' + parent_node).append(ulHtml);
                }
            }
            $('#' + ulID).append(liEl);
            $('#' + ulID).listview('refresh');

            local_file_ix++;
        }
    }
}

function uploadFileForSharing(type)
{
    var filename = $('#try_to_share_file_name').val();
    var filepath = $('#try_to_share_file').val();

    if(!filename || !filepath)
    {
        return;
    }

    $('#info_tip').text('Start uploading ...');
    $('#popupInfo').popup('open');

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = filename;
    options.chunkedMode = false;

    var params = {};
    params.owner = $('#logged_user_name').val();
    params.type = type;

    options.params = params;

    var succ = function(r)
            {
                $('#info_tip').text('Finished uploading ' + filename);
            };

    var fail = function(err)
            {
                $('#info_tip').text('Failed uploading ' + filename);
            };

    var ft = new FileTransfer();
    ft.upload(filepath, encodeURI(baseURL + "upload.php"), succ, fail, options);
}

function popupShareMenu(filename, filepath)
{
    $('#try_to_share_file_name').val(filename);
    $('#try_to_share_file').val(filepath);

    $('#shareFileMenu').popup('open');
}

/**
 * start bump with BumpPlugin for Cordova
 * @method useBumpPlugin
 * @param {Object} param
 */
function useBumpPlugin(param)
{
    navigator.thirdeye.startBump(bumpPluginSuccessHandler, bumpPluginErrorHandler,  param); 
}

/**
 * Success callback for startBump 
 * @method bumpPluginSuccessHandler
 * @param {Object} result
 */
function bumpPluginSuccessHandler(result)
{

    // Match success and notify the server
    if(result.isRequestee == 'true')
    {
        $.get(baseURL + 'bump.php', 
            {
                action : "stopBump",
                fileid : result.fileid,
                filename : result.filename
            }, 
            function(data) {
                
            });
    }

    // Try to download the file
    saveFile(result.fileid, result.filename);
}

/**
 * Error callback for startBump 
 * @method bumpPluginErrorHandler
 * @param {Object} result
 */
function bumpPluginErrorHandler (error)
{
    $('#info_tip').text(error);
    $('#popupInfo').popup('open');
>>>>>>> 432cc8b7d166fab3c331d04cf1ff969bb57997f4
}