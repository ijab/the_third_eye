<?php
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");
$json="";
if(isset($_GET["fileid"])&&isset($_GET["action"])){
    if($_GET["action"]=="startBump"){
        date_default_timezone_set('America/New_York');
        $time=date("Y-m-d H:i:s");
        $sql0="update files set requestor=null, time= null, status=null where TIME_TO_SEC(TIMEDIFF('".$time."',time))>20";
        mysql_query($sql0);
        $sql="select requestor from files where requestor is not null and fileid=".$_GET["fileid"];
        $result=  mysql_query($sql);
        if(mysql_num_rows($result)==0){
            $sql2="update files set requestor = '".$_GET["requestee"]."', time='".$time."', status='nonrequested' where fileid=".$_GET["fileid"];
            mysql_query($sql2);
            $json= '{"msg":"success"}';
        }else{
            $json= '{"msg":"error","reason":"The file is not available!"}';
        }
    }else{
        $sql3="update files set requestor = null,time=null, status=null where fileid=".$_GET["fileid"];
        mysql_query($sql3);
        $json= '{"msg":"success"}';
    }
}else{
    $json= '{"msg":"error","reason":"no requestor is specified"}';
}
echo $json;
?>
