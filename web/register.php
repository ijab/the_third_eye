<?php
if(isset($_POST["username"])&&isset($_POST["password"])&&isset($_POST["name"])){
    $sql="insert into users values('".$_POST["username"]."','".$_POST["password"]."','".$_POST["name"]."')";
    if(!mysql_query($sql)){
        echo '{"msg":"error","reason":"username is occupied!"}';
    }
    echo '{"msg":"success"}';;
}else{
    echo '{"msg":"error","reason":"some fields are missing"}';
}
?>
