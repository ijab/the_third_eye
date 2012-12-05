<?php
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");
$myFile = "log.txt";
$fh = fopen($myFile, 'w') or die("can't open file");
$stringData="Request received\r\n";
fwrite($fh, $stringData);
if(isset($_FILES["file"])&&isset($_POST["filename"])&&isset($_POST["owner"])&&isset($_POST["type"])){
    $stringData="File is ".$_POST["filename"]."  owner is ".$_POST["owner"]."     type is ".$_POST["type"]."\r\n";
    fwrite($fh, $stringData);
    if(move_uploaded_file($_FILES["file"]["tmp_name"],"download/" . $_POST["filename"])){
        $stringData="Upload complete, start writing database!\r\n";
        fwrite($fh, $stringData);
        $sql="select * from files where name='".$_POST["filename"]."' and owner='".$_POST["owner"]."'";
        $result=  mysql_query($sql);
        if(mysql_num_rows($result)==0){
            $sql1="insert into files (name,owner,type) values ('".$_POST["filename"]."','".$_POST["owner"]."','".$_POST["type"]."')";
            mysql_query($sql1);
        }else{
            $sql2="update files set type='".$_POST["type"]." where name='".$_POST["filename"]."' and owner='".$_POST["owner"]."'";
            mysql_query($sql2);
        }
    }else{
        $error=$_FILES["file"]["tmp_name"];
        fwrite($fh, $error);
    }
}else{
    if(isset($_POST["owner"])){
       $stringData="Got owner\r\n";
        fwrite($fh, $stringData); 
    }
    if(isset($_POST["type"])){
        $stringData="Got type\r\n";
        fwrite($fh, $stringData); 
    }
    if(isset($_FILES["file"])){
        $stringData="Got file length:".$_FILES["file"].length;
        fwrite($fh, $stringData); 
    }
    $stringData="Missing arguments\r\n";
    fwrite($fh, $stringData);
}
?>
