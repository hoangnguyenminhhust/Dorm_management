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
		<h3>Quản lý phòng</h3>
		<!--<div class='search'>
			<form action='mng-room.php' method='POST'>
					<input type='text' name='search' size='20' placeholder="Tìm thông tin phòng" style='border-radius:15px 0px 0px 15px;' />
					<input type='submit' name='ok' value='Tìm ' style='border-radius:0px 15px 15px 0px;margin-left:-4px;' />
			</form>
		</div>-->
	</div>
	<div id='jsx'>
		<h3>Danh sách phòng</h3>
		<span><a href='#'>Xuất Excel</a> - <a href='#'>Xuất PDF</a> - <a href='#'>Tạo mới/Nhập dữ liệu</a></span>
	</div>
	<div id='ds'>
		<ul>
			<li>
				<div class='js8'><b>MSV</b></div>
				<div class='js8'><b>Họ và tên</b></div>
				<div class='js8'><b>Lớp</b></div>
				<div class='js8'><b>Khoa</b></div>
				<div class='js8'><b>Số điện thoại</b></div>
				<div class='js8'><b>Phòng</b></div>
				<div class='js8' style='width:98px;border-right:1px solid #969696;'></div>
			</li>
			<?php
				$room = $_GET['room'];
				$sql="select * from student where MaPhong = '$room';";
				$conn=mysql_connect("localhost","root","root");
				mysql_select_db("manager",$conn);
				$query=mysql_query($sql);
				$num=mysql_num_rows($query);
				while($data = mysql_fetch_assoc($query))
				{
					echo "<li>";
					echo "<div class='js8'>$data[MSV]</div>";
					echo "<div class='js8'>$data[Ten]</div>";
					echo "<div class='js8'>$data[Lop]</div>";
					echo "<div class='js8'>$data[Khoa]</div>";
					echo "<div class='js8'>$data[SDT]</div>";
					echo "<div class='js8'>$data[MaPhong]</div>";
					echo "<div class='js8' style='width:98px;border-right:1px solid #969696;'><a href='#'><img src='edit.png' width='17px' height='17px' /></a>
				<a href='#'><img src='delete.png' width='17px' height='17px' /></a></div>";
					echo "</li>";
				}
			?>
		</ul>
	</div>
</div>
</body>
</html>