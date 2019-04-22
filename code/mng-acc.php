<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href='stl.css' rel='stylesheet' type='text/css' />
<title>Quản lý</title>
</head>
<body>
<div id='top'>
	<div class='acc'>
		<img src='https://tinhte.vn/styles/uiflex/xenforo/avatars/avatar_male_m.png' width='36' height='36' style='float:left;' />
			<span><a href='mng-room.php'>Adminstrantors</a></span>
	</div>
</div>
<div id='menu-left'>
	<ul>
					<li><a href='mng-room.php'>Quản Lý Phòng</a></li>
					<li><a href='mng-acc.php'>Quản Lý Tài Khoản</a></li>
					<li><a href='edit-acc.php'>Chỉnh Sửa Tài Khoản</a></li>
					<li><a href='add_acc.php'>Thêm Tài Khoán</a></li>
					<li><a href='#'>Quit</a></li>
				</ul>
</div>
<div id='main'>
	<div id='top-main'>
		<h3>Quản lý tài khoản</h3>
		<div class='search'>
			<form action='mng-acc.php' method='POST'>
					<input type='text' name='search' size='20' placeholder=" Tên....	" style='border-radius:15px 0px 0px 15px;' />
					<input type='submit' name='ok' value='Tìm ' style='border-radius:0px 15px 15px 0px;margin-left:-4px;' />
			</form>
		</div>
	</div>
	<div id='jsx'>
		<h3>Thông tin tài khoản</h3>
		<span><a href='add_acc.php'>Tạo mới/Nhập dữ liệu</a> - <a href='#'>Yêu cầu (0)</a></span>
	</div>
	<div id='ds'>
		<ul>
			<li>
				<div class='ac1' style='width:55px;'><b>Stt</b></div>
				<div class='ac1' style='width:220px;'><b>Tên</b></div>
				<div class='ac1'><b>Tên đăng nhập</b></div>
				<div class='ac1'><b>Tài khoản</b></div>
				<div class='ac1'><b>Ngày sinh</b></div>
				<div class='ac1'><b>Giới tính</b></div>
				<div class='ac1' style='width:150px' ><b>SDT</b></div>
				<div class='ac1' style='width:240px;'><b>Địa chỉ</b></div>
				<div class='ac1'><b>Ngày đăng kí</b></div>
				<div class='ac1' style='width:100px;border-right:1px solid #969696;'></div>
			</li>
			<?php
			$i=0;
				if(isset($_POST['ok']))
			{
				$search = $_POST['search'];
				$sql="select * from member where name = '$search';";
			}
			else
			{
				$sql="select * from member;";}
				$conn=mysql_connect("localhost","root","root");
				mysql_select_db("manager",$conn);
				$query=mysql_query($sql);
				$num=mysql_num_rows($query);
				while($data = mysql_fetch_assoc($query))
				{	
					$id=$data['id'];
					$i++;
					echo "
					<li>
						<div class='ac1' style='width:55px;'>$i</div>
						<div class='ac1' style='width:220px;'>$data[name]</div>
						<div class='ac1'>$data[acc]</div>
						<div class='ac1'>$data[level]</div>
						<div class='ac1'>$data[birthday]</div>
						<div class='ac1'>$data[sex]</div>
						<div class='ac1' style='width:150px' >$data[number]</div>
						<div class='ac1' style='width:240px;'>$data[address]</div>
						<div class='ac1'>$data[date_up]</div>
						<div class='ac1' style='width:100px;border-right:1px solid #969696;'><a href='edit-acc.php?id=$id'><img src='edit.png' width='17px' height='17px' /></a>
				<a href='del-acc.php?id=$id'><img src='delete.png' width='17px' height='17px' /></a></div>
					</li>
					";
				}
			?>
		</ul>
	</div>
</div>
</body>
</html>