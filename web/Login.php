<?php
mysql_connect("localhost:3306", "root", "16886611");
mysql_select_db("sharemi");
if(isset($_POST["username"])&&isset($_POST["password"])){
    $sql="select password from users where username='".$_POST["username"]."'";
    $result=  mysql_query($sql);
    while($res=  mysql_fetch_row($result)){
        if($res[0]==$_POST["password"]){
            echo '{"msg":"success"}';
        }else{
            echo '{"msg":"fail to login","reason":"Invalid username or password"}';
        }
    }
    echo '{"msg":"fail to login","reason":"Invalid username or password"}';
}
?>
