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
        <div data-role="collapsible" data-collapsed="false" data-theme="e" data-content-theme="c">
          <h3>I'm a header</h3>
          <p>I'm the collapsible content. By default I'm open and displayed on the page, but you can click the header to hide me.</p>
          
          <div data-role="collapsible" data-theme="c" data-content-theme="c">
            <h3>I'm a nested collapsible with a child collapsible</h3>
            <p>I'm a child collapsible.</p>
              <div data-role="collapsible" data-theme="d" data-content-theme="d">
                <h3>Nested inside again.</h3>
                <p>Three levels deep now.</p>
              </div><!-- /section 1A -->
          </div><!-- /section 1 -->

          
          <div data-role="collapsible" data-content-theme="c">
            <h3>Section 3: Form elements</h3>
            <form action="#" method="get">
              <div data-role="fieldcontain">
                <label for="textarea">Textarea:</label>
                <textarea cols="40" rows="8" name="textarea" id="textarea"></textarea>
              </div>
              <div data-role="fieldcontain">
                <label for="slider">Input slider:</label>
                <input type="range" name="slider" id="slider" value="0" min="0" max="100"  />
              </div>
              <fieldset class="ui-grid-a">
                  <div class="ui-block-a"><button type="submit" data-theme="c">Cancel</button></div>
                  <div class="ui-block-b"><button type="submit" data-theme="b">Submit</button></div>     
                </fieldset>
            </form>
          </div><!-- /section 2 -->

          <div data-role="collapsible" data-content-theme="c">
            <h3>Section 4: Collapsed list</h3>
            <p>Here is an inset list:</p>
            <ul data-role="listview" data-inset="true" data-theme="d">
              <li><a href="index.html">Acura</a></li>
              <li><a href="index.html">Audi</a></li>
              <li><a href="index.html">BMW</a></li>
              <li><a href="index.html">Cadillac</a></li>
              <li><a href="index.html">Chrysler</a></li>
              <li><a href="index.html">Dodge</a></li>
              <li><a href="index.html">Ferrari</a></li>
              <li><a href="index.html">Ford</a></li>
            </ul>
          </div><!-- /section 3 -->
        </div>
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
</html>