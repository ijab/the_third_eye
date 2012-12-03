<!DOCTYPE html>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    
    <title>The Third Eye</title>

    <link rel="stylesheet"  href="jquery.mobile-1.2.0.min.css" />
    <?php
      echo '<script type="text/javascript">';
      $ssl = "OFF";

      if ( isset($_SERVER['HTTPS']) )
       $ssl = $_SERVER['HTTPS'];
      elseif ( isset($_SERVER['HTTP_FRONT_END_HTTPS']) )
       $ssl = $_SERVER['HTTP_FRONT_END_HTTPS'];
      else
       $ssl = "OFF";

      $base_host = (stripos($ssl, "ON") !== FALSE) ? "https" : "http";

      /* Many pages/apps served through the same domain */
      if ( isset($_SERVER['HTTP_X_FORWARDED_HOST']) ) 
      {
       list($host) = explode(',', str_replace(' ', '', $_SERVER['HTTP_X_FORWARDED_HOST']));
      } else {
       $host = $_SERVER['HTTP_HOST'];
      }

      $base_host .= "://".$host;

      if ( ! isset($_SERVER['ORIG_SCRIPT_NAME']) )
      {
       $base_host .= str_replace(basename($_SERVER['SCRIPT_NAME']),"",$_SERVER['SCRIPT_NAME']);
      }
      else
      {
       $base_host .= str_replace(basename($_SERVER['ORIG_SCRIPT_NAME']),"",$_SERVER['ORIG_SCRIPT_NAME']);
      }

      echo 'var baseURL = "' . $base_host . '"';
      echo '</script>';
    ?>

    <script type="text/javascript" charset="utf-8" src="cordova-2.2.0.js"></script>
    <script type="text/javascript" src="jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="jquery.mobile-1.2.0.min.js"></script>
    <script type="text/javascript" src="thirdEye.js"></script>
  </head>
  <body>

     <!-- Start of second page: #login_register -->
    <div data-role="page" id="login_register" data-theme="a">

      <div data-role="header">
        <h1>Login/Register</h1>
      </div><!-- /header -->

      <div data-role="content" data-inset="true">
        <center>
        <form method="post" id="loginForm">
          <fieldset>
            <p id="output"></p>
            <p>
            <label for="username">User:</label>
            <input name="username" type="text" id="username" value=""  />
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value="" />
            <input id="login_submit" type="button" value="Login" data-role="button" data-inline="true" data-theme="b" />
            <input id="register_submit" type="button" value="Register" data-role="button" data-inline="true" data-theme="b" />
            <hr />
          </fieldset>
        </form>
        </center>
      </div> <!-- content -->

      <div data-role="footer">
        <h4>Copyright Zhan Caibao & XuXun</h4>
      </div> <!-- footer -->

    </div><!-- /page two register -->

   
     <!-- Start of first page: #one -->
    <div data-role="page" id="files_list">

      <div data-role="header">
        <h1>Shared Files List</h1>
      </div><!-- /header -->

      <div data-role="content" >  
        <div data-role="collapsible-set">
          <div data-role="collapsible" data-collapsed="false">
            <h3>Shared with me</h3>
            <ul data-role="listview" id="shared_with_me_files_list">
              <li><a href="index.html">Inbox <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Outbox <span class="ui-li-count">private</span></a></li>
              <li><a href="index.html">Drafts <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Sent <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Trash <span class="ui-li-count">private</span></a></li>
            </ul>
          </div>
          
          <div data-role="collapsible" data-collapsed="true">
            <h3>My Shared Files</h3>
            <ul data-role="listview" id="my_shared_files_list">
              <li><a href="index.html">Inbox <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Outbox <span class="ui-li-count">private</span></a></li>
              <li><a href="index.html">Drafts <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Sent <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Trash <span class="ui-li-count">private</span></a></li>
            </ul>
            <div data-theme="d"><a href="#select_file_page" data-rel="page" data-position-to="window" data-theme="b" data-role="button" data-inline="true" data-mini="true">Share Files</a></div>
          </div>
        </div>

      </div><!-- /content -->
      
      <div data-role="footer" data-theme="d">
        
      </div><!-- /footer -->

      <div data-role="popup" id="popupInfo" class="ui-content" data-theme="e" style="max-width:350px;">
          <p id="info_tip">Here is a <strong>tiny popup</strong> being used like a tooltip. The text will wrap to multiple lines as needed.</p>
    </div>

    </div><!-- /page one -->

    <div data-role="page" id="select_file_page" data-theme="a">

      <div data-role="header">
        <a href="#files_list"  data-rel="page" data-position-to="window" data-theme="a" data-role="button" data-inline="true" data-mini="true" class="ui-btn-left">Back</a>
        <h1 style="text-align: center; margin: 11px">Select Files to Share</h1>
      </div>

      <div data-role="content" data-inset="true" id="local_files_list"  data-theme="b">
       <h3>Files & Folders</h3>
      </div> 

      <div data-role="popup" id="shareFileMenu" data-overlay-theme="b">
        <ul data-role="listview" data-inset="true" style="width:180px;" data-theme="b">
          <li><a href="" id="share_file_public">Share Public</a></li>
          <li><a href="" id="share_file_private">Share Private</a></li>
        </ul>
        <input type="hidden" id="try_to_share_file_name" name="try_to_share_file_name" value="" />
        <input type="hidden" id="try_to_share_file" name="try_to_share_file" value="" />
      </div>

    </div>
   
    <input type="hidden" id="logged_user_name" name="logged_user_name" value="" />
  </body>
=======
<!DOCTYPE html>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    
    <title>The Third Eye</title>

    <link rel="stylesheet"  href="jquery.mobile-1.2.0.min.css" />
    <?php
      echo '<script type="text/javascript">';
      $ssl = "OFF";

      if ( isset($_SERVER['HTTPS']) )
       $ssl = $_SERVER['HTTPS'];
      elseif ( isset($_SERVER['HTTP_FRONT_END_HTTPS']) )
       $ssl = $_SERVER['HTTP_FRONT_END_HTTPS'];
      else
       $ssl = "OFF";

      $base_host = (stripos($ssl, "ON") !== FALSE) ? "https" : "http";

      /* Many pages/apps served through the same domain */
      if ( isset($_SERVER['HTTP_X_FORWARDED_HOST']) ) 
      {
       list($host) = explode(',', str_replace(' ', '', $_SERVER['HTTP_X_FORWARDED_HOST']));
      } else {
       $host = $_SERVER['HTTP_HOST'];
      }

      $base_host .= "://".$host;

      if ( ! isset($_SERVER['ORIG_SCRIPT_NAME']) )
      {
       $base_host .= str_replace(basename($_SERVER['SCRIPT_NAME']),"",$_SERVER['SCRIPT_NAME']);
      }
      else
      {
       $base_host .= str_replace(basename($_SERVER['ORIG_SCRIPT_NAME']),"",$_SERVER['ORIG_SCRIPT_NAME']);
      }

      echo 'var baseURL = "' . $base_host . '"';
      echo '</script>';
    ?>

    <script type="text/javascript" charset="utf-8" src="cordova-2.2.0.js"></script>
    <script type="text/javascript" src="jquery-1.8.2.min.js"></script>
    <script type="text/javascript" src="jquery.mobile-1.2.0.min.js"></script>
    <script type="text/javascript" src="thirdEye.js"></script>
  </head>
  <body>
    <!-- Start of second page: #login_register -->
    <div data-role="page" id="login_register" data-theme="a">

      <div data-role="header">
        <h1>Login/Register</h1>
      </div><!-- /header -->

      <div data-role="content" data-inset="true">
        <center>
        <form method="post" id="loginForm">
          <fieldset>
            <p id="output"></p>
            <p>
            <label for="username">User:</label>
            <input name="username" type="text" id="username" value=""  />
            <label for="password">Password:</label>
            <input type="password" name="password" id="password" value="" />
            <input id="login_submit" type="button" value="Login" data-role="button" data-inline="true" data-theme="b" />
            <input id="register_submit" type="button" value="Register" data-role="button" data-inline="true" data-theme="b" />
            <hr />
          </fieldset>
        </form>
        </center>
      </div> <!-- content -->

      <div data-role="footer">
        <h4>Copyright Zhan Caibao & XuXun</h4>
      </div> <!-- footer -->

    </div><!-- /page two register -->

    <!-- Start of first page: #one -->
    <div data-role="page" id="files_list">

      <div data-role="header">
        <h1>Shared Files List</h1>
      </div><!-- /header -->

      <div data-role="content" >  
        <div data-role="collapsible-set">
          <div data-role="collapsible" data-collapsed="false">
            <h3>Shared with me</h3>
            <ul data-role="listview" id="shared_with_me_files_list">
              <li><a href="index.html">Inbox <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Outbox <span class="ui-li-count">private</span></a></li>
              <li><a href="index.html">Drafts <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Sent <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Trash <span class="ui-li-count">private</span></a></li>
            </ul>
          </div>
          
          <div data-role="collapsible" data-collapsed="true">
            <h3>My Shared Files</h3>
            <ul data-role="listview" id="my_shared_files_list">
              <li><a href="index.html">Inbox <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Outbox <span class="ui-li-count">private</span></a></li>
              <li><a href="index.html">Drafts <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Sent <span class="ui-li-count">public</span></a></li>
              <li><a href="index.html">Trash <span class="ui-li-count">private</span></a></li>
            </ul>
            <div data-theme="d"><a href="#select_file"  data-direction="reverse" data-role="button" data-theme="b">Share Files</a></div>
          </div>
        </div>

      </div><!-- /content -->
      
      <div data-role="footer" data-theme="d">
        
      </div><!-- /footer -->

      <div data-role="popup" id="popupInfo" class="ui-content" data-theme="e" style="max-width:350px;">
          <p id="info_tip">Here is a <strong>tiny popup</strong> being used like a tooltip. The text will wrap to multiple lines as needed.</p>
    </div>

    </div><!-- /page one -->


    <!-- Start of third page: #select_file -->
    <div data-role="page" id="select_file" data-theme="a">

      <div data-role="header">
        <a href="#files_list"  data-rel="page" data-position-to="window" data-theme="a" data-role="button" data-inline="true" data-mini="true" class="ui-btn-left">Back</a>
        <h1 style="text-align: center; margin: 11px">Select Files to Share</h1>
      </div><!-- /header -->

      <div data-role="content" data-inset="true" id="local_files_list">
        
      </div> <!-- content -->

      <div data-role="footer">
        
      </div> <!-- footer -->

      <!-- popup share file menu -->
      <div data-role="popup" id="shareFileMenu" data-overlay-theme="b">
        <ul data-role="listview" data-inset="true" style="width:180px;" data-theme="b">
          <li><a href="" id="share_file_public">Share Public</a></li>
          <li><a href="" id="share_file_private">Share Private</a></li>
        </ul>
        <input type="hidden" id="try_to_share_file_name" name="try_to_share_file_name" value="" />
        <input type="hidden" id="try_to_share_file" name="try_to_share_file" value="" />
      </div>

    </div><!-- /page three register -->

    <input type="hidden" id="logged_user_name" name="logged_user_name" value="" />
  </body>
>>>>>>> 432cc8b7d166fab3c331d04cf1ff969bb57997f4
</html>