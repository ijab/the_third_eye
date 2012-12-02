<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
        <meta name="apple-mobile-web-app-capable" content="yes">

        <title>The Third Eye</title>

        <link rel="stylesheet"  href="jquery.mobile-1.2.0.min.css" />

        <script type="text/javascript" charset="utf-8" src="cordova-2.2.0.js"></script>
        <script type="text/javascript" src="jquery-1.8.2.min.js"></script>
        <script type="text/javascript" src="jquery.mobile-1.2.0.min.js"></script>
        <script type="text/javascript" src="thirdEye.js"></script>
    </head>
    <body>
        <h1>Available Docs</h1>
        <?php
            echo urldecode($_GET["location"]);
        ?>
    </body>
</html>