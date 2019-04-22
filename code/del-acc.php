<?php
	$id=$_GET['id'];
	$conn=mysql_connect("localhost","root","root");
	mysql_select_db("manager",$conn);
	$sql="delete from member where id=$id;";
	mysql_query($sql);
	header("location:mng-acc.php");
?>