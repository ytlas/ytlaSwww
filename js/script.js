var app=angular.module('ytlas',[]);
app.controller('hCtrl',function($scope,$http,$interval){
    $scope.isLoggedIn=false;
    $scope.dLogin=false;
    $scope.dRegister=false;
    $scope.showUsersBox=false;
    $scope.username;
    $scope.password;
    $scope.chatVis=false;
    $scope.uid;
    $scope.ts=false;
    $scope.loginName;
    $scope.settings;
    var chat;
    var audio = new Audio('sound/coin.ogg');
    audio.volume=.1;
    $scope.chatArray;
    $scope.$watch('chatVis',function(){
	if($scope.isLoggedIn && $scope.chatVis){
	    chat=$interval(function(){
		$http.get("lib/ajax.php?request=chat").success(function(response){
		    if($scope.chatArray==undefined){
			$scope.chatArray=response.chat;
		    }
		    else if($scope.chatArray.length<response.chat.length || $scope.chatArray.length>response.chat.length || !angular.equals($scope.chatArray,response.chat)){
			$scope.chatArray=response.chat;
			audio.play();
		    }
		});
	    },1000);
	}
	else{
	    $interval.cancel(chat);
	}
    });
    $scope.logReg=function(num){
	if(num==1){
	    $scope.dLogin=!$scope.dLogin;
	    if($scope.dRegister){
		$scope.dRegister=!$scope.dRegister;
	    }
	}
	if(num==0){
	    $scope.dRegister=!$scope.dRegister;
	    if($scope.dLogin){
		$scope.dLogin=!$scope.dLogin;
	    }
	}
    }
    $http.get("lib/ajax.php?request=login").success(function(response){
	if(response.uid){
	    $scope.isLoggedIn=true;
	    $scope.loginName=response.uid;
	}
	else{
	    $scope.isLoggedIn=false;
	}
    });
    $scope.login=function(){
	$http.get("lib/ajax.php?request=login&username="+$scope.username+"&password="+$scope.password).success(function(response){
	    $scope.username="";
	    $scope.password="";
	    if(response.uid){
		$scope.isLoggedIn=true;
		$scope.chatPerm=true;
		$scope.dLogin=false;
		$scope.dRegister=false;
		$scope.loginName=response.uid;
	    }
	    else{
		$scope.isLoggedIn=false;
		alert("Invalid username/password");
	    }
	});
    };
    $scope.register=function(){
	$http.get("lib/ajax.php?request=register&username="+$scope.username+"&password="+$scope.password).success(function(response){
	    $scope.password="";
	    if(response.uid){
		alert("You successfully registered, you can now log in.");
	    }
	    else{
		alert("Something went wrong. This can happen because you might: Have picked an existing username - Have picked a username or password that is too short.");
	    }
	});
    }
    $scope.keyLogReg=function($event){
	var keyCode=$event.which || $event.keyCode;
	if(keyCode===13){
	    if($scope.dLogin && !$scope.dRegister){
		$scope.login();
	    }
	    else{
		$scope.register();
	    }
	}
    }
    $scope.isKing=function(str){
	return true;
    }
    $scope.logout=function(){
	$http.get("lib/ajax.php?request=logout").success(function(response){
	    $scope.username="";
	    $scope.loginName="";
	    $scope.isLoggedIn=false;
	});
    };
    $scope.message;
    $scope.send=function(){
	$http.get("lib/ajax.php?request=chatMessage&message="+$scope.message).success(function(response){
	    $scope.message="";
	});
    };
    $scope.keySend=function($event){
	var keyCode=$event.which || $event.keyCode;
	if(keyCode===13){
	    $scope.send();
	}
    };
    $scope.showUsers=function(){
	$scope.showUsersBox=!$scope.showUsersBox;
	if($scope.showUsersBox){
	    $http.get("lib/ajax.php?request=users").success(function(response){
		$scope.usersArray=response.users;
	    });
	}
    };
    $scope.usernameStyle=function(name){
	if(name=="ytlas"){
	    return "darkcyan";
	}
	else if(name=="lunatic"){
	    return "purple";
	}
	else{
	    return "black";
	}
    };
});
//$(document).ready(function(){
    //var colors=["blue","red","green","purple","cyan","darkcyan"];
    //var count=0;
    //$('.titleChild').each(function(i){
	//if(count==colors.length){
	    //count=0;
	//}
	//$(this).attr("style","color:"+colors[count]);
	//count++;
    //});
    //setInterval(function(){
	//$('.titleChild').each(function(i){
	    //if(count==colors.length){
		//count=0;
	    //}
	    //$(this).attr("style","color:"+colors[count]);
	    //count++;
	//});
    //},5000);
//});
