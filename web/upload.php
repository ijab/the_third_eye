<?php
if(isset($_FILES["file"]["filename"])&&isset($_POST["owner"])&&isset($_POST["type"])){
    move_uploaded_file($_FILES["file"]["filename"],"downloads/" . $_FILES["file"]["filename"]);
    $sql="select * from files where name='".$_FILES["file"]["filename"]."' and owner='".$_POST["owner"]."'";
    $result=  mysql_query($sql);
    if(mysql_num_rows($result)==0){
        $sql1="insert into files (name,owner,type) values ('".$_FILES["file"]["filename"]."','".$_POST["owner"]."','".$_POST["type"]."')";
        mysql_query($sql1);
    }else{
        $sql2="update files set type='".$_POST["type"]." where name='".$_FILES["file"]["filename"]."' and owner='".$_POST["owner"]."'";
        mysql_query($sql2);
    }
}
?>
