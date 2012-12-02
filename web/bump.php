<?php
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");
if(isset($_GET["requestor"])&&isset($_GET["fileid"])&&isset($_GET["action"])){
    if($_GET["action"]=="startBump"){
        $sql="select requestor from files where requestor is not null and fileid=".$_GET["fileid"];
        $result=  mysql_query($sql);
        if(mysql_num_rows($result)==0){
            $sql2="update files set requestor = '".$_GET["requestor"]."' where fileid=".$_GET["fileid"];
            echo $sql2;
            mysql_query($sql2);
            echo '{"msg":"success"}';
        }else{
            echo '{"msg":"error","reason":"The file is not available!"}';
        }
    }else{
        $sql3="update files set requestor = null where fileid=".$_GET["fileid"];
        mysql_query($sql3);
        echo '{"msg":"success"}';
    }
}else{
    echo '{"msg":"error","reason":"no requestor is specified"}';
}
?>
