<?php
    function acrypt($str){
	return crypt($str,"atlas");
    }
    function displayUsername($uid){
	$con=new mysqli("localhost","adam","Qw!kmdo<","ytlas");
	$result=$con->query("SELECT * FROM users WHERE id='$uid'");
	$row=$result->fetch_assoc();
	return $row['username'];
    }
    $secret="solrun";
    $un=false;
    if($_COOKIE['login']){
	list($c_username,$cookie_hash)=split(',',$_COOKIE['login']);
	if(crypt($c_username,$secret)==$cookie_hash){
	    $un=$c_username;
	}
    }
    if(isset($_GET['request'])){
	$request=$_GET['request'];
	$con=new mysqli("localhost","adam","Qw!kmdo<","ytlas");
	date_default_timezone_set('Europe/Stockholm');
	if($con->connect_error){
	    die("Connection failed: ".$con->connect_error);
	    exit;
	}
	else{
	    if($request==="test"){
		echo "Success";
	    }
	    if($request==="login" && !$un && isset($_GET['username']) && isset($_GET['password'])){
		$username=$con->real_escape_string($_GET['username']);
		$password=$con->real_escape_string(acrypt($_GET['password']));
		$result=$con->query("SELECT * FROM users WHERE username='$username' AND password='$password' LIMIT 1");
		if(mysqli_num_rows($result)>0){
		    $row=$result->fetch_assoc();
		    $id=$row['id'];
		    setcookie('login',$username.','.crypt($username,$secret),time()+(86400*30),"/");
		    echo '{ "uid": "'.$username.'" }';
		}
	    }
	    elseif($request==="login" && $un){
		echo '{ "uid": "'.$un.'" }';
	    }
	    elseif($request==="register" && !$un && isset($_GET['username']) && isset($_GET['password'])){
		$username=$con->real_escape_string($_GET['username']);
		$password=$con->real_escape_string(acrypt($_GET['password']));
		$date=date("Y-m-d H:i:s");
		$ip=$_SERVER['REMOTE_ADDR'];
		if(strlen($_GET['username'])>2 && preg_match("#^[a-zA-Z0-9\-\_\.]+$#",$_GET['username']) && mysqli_num_rows($con->query("SELECT * FROM users WHERE username='$username'"))==0){
		    if($con->query("INSERT INTO users (username,password,ip,date_registered) VALUES ('$username','$password','$ip','$date')")){
			$result=$con->query("SELECT * FROM users WHERE username='$username'");
			$row=$result->fetch_assoc();
			echo '{ "uid": '.$row['id'].' }';
		    }
		}
	    }
	    elseif($request==="logout" && $un){
		echo $un."<br>".$_COOKIE['login'];
		unset($_COOKIE['login']);
		setcookie('login',null,-1,'/');
		echo $_COOKIE['login'];
	    }
	    elseif(substr($request,0,4)==="chat" && $un){
		if($request==="chat"){
		    $result=$con->query("SELECT * FROM chat ORDER BY date DESC LIMIT 25");
		    $outp="";
		    while($row=$result->fetch_array()){
			$username=$row["username"];
			if($outp!=""){$outp.=",";}
			$outp.='{"username":"'.$username.'",';
			$content=str_replace("'","",$row["content"]);
			$outp.='"content":"'.addslashes($content).'",';
			$outp.='"id":"'.$row["id"].'",';
			$outp.='"date":"'.$row["date"].'"}';
		    }
		    $outp='{"chat":['.$outp.']}';
		    echo $outp;
		}
		elseif($request==="chatMessage" && $un && isset($_GET['message'])){
		    if(strlen(str_replace("'","",$_GET['message']))>1 && strlen($_GET['message'])<256){
			$message=$con->real_escape_string($_GET['message']);
			$username=$un;
			$ip=$con->real_escape_string($_SERVER['REMOTE_ADDR']);
			$date=date("Y-m-d H:i:s");
			$con->query("INSERT INTO chat (username,content,ip,date) VALUES ('$username','$message','$ip','$date')");
		    }
		}
	    }
	    elseif($request==="users"){
		$result=$con->query("SELECT * FROM users");
		$outp="";
		while($row=$result->fetch_array()){
		    if($outp!=""){$outp.=",";}
		    $outp.='{"username":"'.$row["username"].'",';
		    $outp.='"date":"'.$row["date_registered"].'"}';
		}
		$outp='{"users":['.$outp.']}';
		echo $outp;
	    }
	    $con->close();
	}
    }
    else{
    }
?>
