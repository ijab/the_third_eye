<?php
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");
/*
|-----------------
| Chip Error Manipulation
|------------------
*/

error_reporting(-1);

/*
|-----------------
| Chip Constant Manipulation
|------------------
*/

define( "CHIP_DEMO_FSROOT",				__DIR__ . "/" );

/*
|-----------------
| Chip Download Class
|------------------
*/

require_once("class.chip_download.php");

/*
|-----------------
| Class Instance
|------------------
*/

$download_path = CHIP_DEMO_FSROOT . "download/";
$sql="select name from files where fileid=".$_GET['fileid'];
$result=  mysql_query($sql);
$res=  mysql_fetch_row($result);
$file = $res[0];

$args = array(
		'download_path'		=>	$download_path,
		'file'				=>	$file,		
		'extension_check'	=>	TRUE,
		'referrer_check'	=>	FALSE,
		'referrer'			=>	NULL,
		);
$download = new chip_download( $args );

/*
|-----------------
| Pre Download Hook
|------------------
*/

$download_hook = $download->get_download_hook();
//$download->chip_print($download_hook);
//exit;

/*
|-----------------
| Download
|------------------
*/

if( $download_hook['download'] == TRUE ) {

	/* You can write your logic before proceeding to download */
	
	/* Let's download file */
	$download->get_download();

}

?>