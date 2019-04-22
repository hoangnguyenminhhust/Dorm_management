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
		<div class='search'>
			<form action='mng-room.php' method='POST'>
					<input type='text' name='search' size='20' placeholder="Mã phòng" style='border-radius:15px 0px 0px 15px;' />
					<input type='submit' name='ok' value='Tìm ' style='border-radius:0px 15px 15px 0px;margin-left:-4px;' />
			</form>
		</div>
	</div>
	<div id='jsx'>
		<h3>Danh sách phòng</h3>
		<span><a href='#'>Tạo mới/Nhập dữ liệu</a> - <a href='#'>Sửa</a> - <a href='#'>Xóa</a></span>
	</div>
	<div id='ds'>
		<ul>
			<li>
				<div class='js1'><b>Số phòng</b></div>
				<div class='js2'><b>Tình trạng</b></div>
				<div class='js3'><b>Số người/phòng</b></div>
				<div class='js4'><b>Đã thuê</b></div>
				<div class='js5'><b>Còn lại</b></div>
				<div class='js6' style='text-align:center;'><b>Người quản lý</b></div>
				<div class='js7'><b>Ghi chú</b></div>
			</li>
			<?php
			if(isset($_POST['ok']))
			{
				$search = $_POST['search'];
				$sql="select * from room where MaPhong = '$search';";
			}
			else
			{
				$sql="select * from room;";}
				$conn=mysql_connect("localhost","root","root");
				mysql_select_db("manager",$conn);
				$query=mysql_query($sql);
				$num=mysql_num_rows($query);
				while($data = mysql_fetch_assoc($query))
				{
					$toida=$data['ToiDa'];
					$dathue=$data['DaThue'];
					$number=$toida-$dathue;
					echo "<li>";
					echo "<a href='detail_r.php?room=$data[MaPhong]' style='color:black;'><div class='js1'>$data[MaPhong]</div>";
					echo "<div class='js2'>$data[TinhTrang]</div>";
					echo "<div class='js3'>$data[ToiDa]</div>";
					echo "<div class='js4'>$data[DaThue]</div>";
					echo "<div class='js5'>$number</div>";
					echo "<div class='js6'>$data[QuanLy]</div>";
					echo "<div class='js7'>$data[GhiChu]</div></a>";
					echo "</li>";
				}
			?>
		</ul>
	</div>
</div>
</body>
</html>