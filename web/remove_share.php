<?php
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");
$json="";
if(isset($_GET["fileid"])){
    $sql="delete from files where fileid = ".$_GET["fileid"];
    mysql_query($sql);
    $json= '{"msg":"success"}';
}else{
    $json= '{"msg":"error","reason":"Missing Arguments!"}';
}
echo $json;
?>
