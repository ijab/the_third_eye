<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require_once ("gps_class.php");
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");

function checkDistance($x1,$y1,$x2,$y2){
    $distance = new calcMiles ($y1,$x1,$y2,$x2, "meter");
    $numericalDistance = $distance->lastResult;
    if($numericalDistance>5){
        return false;
    }else{
        return true;
    }
}

if(isset($_GET["x"])&&isset($_GET["y"])&&isset($_GET["username"])){
    date_default_timezone_set('America/New_York');
    $time=date("Y-m-d H:i:s");
    $sql1="select * from currentlocation where user='".$_GET["username"]."'";
    $result1=mysql_query($sql1);
    if(mysql_num_rows($result1)==0){
        $sql2="insert into currentlocation values ('".$_GET["username"]."',".$_GET["x"].",".$_GET["y"].",'".$time."')";
        mysql_query($sql2);
    }else{
        $sql3="update currentlocation set cordx=".$_GET["x"].", cordy=".$_GET["y"].", time='".$time."' where user='".$_GET["username"]."'";
        mysql_query($sql3);
    }
    $sql4="select fileid,name as filename,owner,type from files, currentlocation where owner=user and TIME_TO_SEC(TIMEDIFF('".$time."',currentlocation.time))<8 and owner<>'".$_GET["username"]."'";
    $result4=mysql_query($sql4);
    $json='{ "msg":"success","data":{"files":';
    $rows = array();
    while ($res4=  mysql_fetch_assoc($result4)){
        $lsql="select cordx,cordy from currentlocation where user='".$res4['owner']."'";
        $lresult=mysql_query($lsql);
        $lres=mysql_fetch_row($lresult);
        if(checkDistance($_GET["x"], $_GET["y"], $lres[0], $lres[1])){
            $rows[] = $res4;
        }
    }
    $json=$json.json_encode($rows).',"myfiles":';
    $sql5="select fileid,name as filename,owner,type from files where owner='".$_GET["username"]."'";
    $result5=mysql_query($sql5);
    $rows1 = array();
    while ($res5=  mysql_fetch_assoc($result5)){
        $rows1[] = $res5;
    }
    $json=$json.json_encode($rows1).',"bump":';
    $sql6="select name as filename,owner,fileid,requestor as requestee,time from files where owner='".$_GET["username"]."' and requestor is not null and status='nonrequested'";
    $result6=mysql_query($sql6);
    $rows2 = array();
    while ($res6=  mysql_fetch_assoc($result6)){
        $rows2[] = $res6;
    }
    $json=$json.json_encode($rows2).'}}';
    echo $json;
    $sql7="update files set status = 'requested' where owner = '".$_GET["username"]."' and requestor is not null";
    mysql_query($sql7);
}else{
    echo '{"msg":"error","reason":"lack arguments"}';
}
?>
 


