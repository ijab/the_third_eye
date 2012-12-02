<?php
if(isset($_GET["fileid"])){
    $sql="delete from files where fileid = ".$_GET["fileid"];
    mysql_query($sql);
}
?>
