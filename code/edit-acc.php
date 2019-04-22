<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href='dk_style.css' rel='stylesheet' type='text/css' />
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossOrigin="anonymous" class="next-head"/>
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Roboto:400,700&amp;amp;subset=latin-ext,vietnamese" class="next-head"/>
<link REL="SHORTCUT ICON" HREF="logo.ico">
<title>Chỉnh sửa thông tin</title>
</head>
<body>
<div id='top'>
	<div class='acc'>
		<img src='https://tinhte.vn/styles/uiflex/xenforo/avatars/avatar_male_m.png' width='36' height='36' style='float:left;' />
			<span><a href='mng-room.php'>Adminstrantors</a></span>
	</div>
	
</div>
<?php 
	$conn=mysql_connect("localhost","root","root");
	mysql_select_db("manager",$conn);
	$err=null;$id=$_GET['id'];
	$sql2 = "select * from member where id=$id;";
	$qr = mysql_query($sql2);
	$data=mysql_fetch_assoc($qr);
	$acc=$data['acc'];
	$level=$data['level'];
	$pwd=$data['pwd'];
	$name=$data['name'];
	$birthday=$data['birthday'];
	$a=explode("-",$birthday);
	$sex=$data['sex'];
	$number=$data['number'];
	$address=$data['address'];
	echo "<pre>";
	print_r($data);
	echo "</pre>";
	if(isset($_POST['ok']))
	{	
		if($_POST['acc'] && $_POST['level'] && $_POST['name'] && $_POST['year'] &&$_POST['day'] && $_POST['pwd'] && $_POST['re_pwd'])
		{
			
			$acc=$_POST['acc'];
			$level=$_POST['level'];
			$name=$_POST['name'];
			$year =$_POST['year'];
			$month=$_POST['month'];
			$day=$_POST['day'];
			$birthday = "$year/$month/$day";
			$sex = $_POST['sex'];
			$number=$_POST['number'];
			$address=$_POST['address'];
			$pwd = $_POST['pwd'];
			$re_pwd = $_POST['re_pwd'];
			if($pwd != $re_pwd)
				$err = "Mật khẩu không khớp";
			else{
				$sql = "update member set acc='$acc',pwd='$pwd',level='$level',name='$name',birthday='$birthday',sex='$sex',number='$number',address='$address' where id=$id;";
				mysql_query($sql);
				header("location:mng-acc.php");
			}
		}
		else
			$err = "Vui lòng điền đầy đủ thông tin";
	}
?>
<div id='main'>
	<div id='abc'>
		<div class='icon'>
			<img src='home.png' width='15' height='15' />
		</div>
		<img src='mt.png' width='12' height='38' style='float:left;' />
	</div>
	<div id='form'>
		<h1 style='font-size:25px;margin-top:15px;text-align:left;'>Chỉnh sửa tài khoản</h1>
		<div class='link'<a href='#' style='color:#176093;'>Facebook</a><br /><a href='#' style='text-align:right;color:#176093;'>Share</a></div>
		<div class='form-dk'>
			<form action='edit-acc.php?id=<?php echo $id;?>' method='POST'>
			<div class='tb'>
				<div class='tr'>
					<div class='js'>
						<label>Tên:</label><br />
						<span>Bắt buộc</span>
					</div>
					<div class='js2'>
						<input type='text' name='name' class='text' value="<?php echo $name;?>" /><br />
						<span>Đây là tên sẽ xuất hiện trong các bài viết của bạn. Bạn có thể sử dụng tên thật hoặc nick. Bạn không thể thay đổi tên này về sau.</span>
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Tên đăng nhập:</label><br />
						<span>Bắt buộc</span>
					</div>
					<div class='js2'>
						<input type='text' name='acc' class='text' value='<?php echo $acc;?>' />
					</div>
				</div>
			</div>
			<div class='tb'>
				<div class='tr'>
					<div class='js'>
						<label>Mật khẩu:</label><br />
						<span>Bắt buộc</span>
					</div>
					<div class='js2'>
						<input type='password' name='pwd' class='text' value='<?php echo $pwd;?>' />
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Xác nhận mật khẩu:</label><br />
						<span>Bắt buộc</span>
					</div>
					<div class='js2'>
						<input type='password' name='re_pwd' class='text' value='<?php echo $pwd;?>' /><br />
						<span>Nhập mật khẩu vào trong ô đầu tiên và xác nhận lại trong ô thứ 2</span>
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Tài khoản:</label><br />
					</div>
					<div class='js2'>
						<select name='level' style='height:26px;'>
							<option value='Admin' <?php if($level == 'Admin') echo "selected";?> >Admin</option>
							<option value='Mannager' <?php if($level == 'Mannager') echo "selected";?> >Mannager</option>
						</select>
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Giới tính:</label><br />
					</div>
					<div class='js2'>
						<input type='radio' name='sex' value='Nam' <?php if($sex == 'Nam') echo "checked";?> /> Nam<br />
						<input type='radio' name='sex' value='Nu' <?php if($sex == 'Nu') echo "checked";?> /> Nữ<br />
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Ngày sinh:</label><br />
						<span>Bắt buộc</span>
					</div>
					<div class='js2'>
						<select name='month'style='height:26px;'>
							<?php
								for($i=1;$i<=12;$i++)
								{
									if($i==$a[1])
										echo "<option value='$i' selected>Tháng $i</option>";
									else
										echo "<option value='$i'>Tháng $i</option>";
									
								}
							?>
						</select>
						<input type='text' name='day' size='1' placeholder="Ngày" style='height:16px;padding:3px;' value='<?php echo $a[2];?>' />
						<input type='text' name='year' size='2' placeholder="Năm" style='height:16px;padding:3px;' value='<?php echo $a[0];?>' />
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Số điện thoại:</label><br />
					</div>
					<div class='js2'>
						<input type='text' name='number' class='text' value='<?php echo $number;?>' />
					</div>
				</div>
				<div class='tr'>
					<div class='js'>
						<label>Địa chỉ</label><br />
					</div>
					<div class='js2'>
						<input type='text' name='address' class='text' value='<?php echo $address;?>' />
					</div>
				</div>
			</div>
			<input type='submit' name='ok' value='Cập nhật' class='submit' />
			<input type='reset' name='ok' value='Hủy' class='submit' />
			<center style='margin-top:25px;color:red; text-align:center;'><b><i>
			<?php 
				echo $err;
			?></i></b></center>
			</form>
		</div>
	</div>
</div>
<div id='bottom'>

</div>
</body>
</html>