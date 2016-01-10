<!DOCTYPE HTML>
<html ng-app="ytlas">
    <head>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-beta.2/angular.min.js"></script>
	<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/aes.js"></script>
	<script src="js/script.js"></script>
	<title>Cutie</title>
    </head>
    <body ng-controller="hCtrl">
	    <header>
		<a href="http://ytlas.com"><b class="title">?YTLAS.com</b></a>
		<br>
		<span style="font-size:0.8em;color:{{usernameStyle(loginName)}}">{{loginName}}</span><span style="font-size:0.7em">@<?php echo $_SERVER['REMOTE_ADDR']; ?></span>
	    </header>
	    <nav>
		<ul>
		    <li class="button"ng-hide="isLoggedIn" ng-click="logReg(1);ts=false;showUsersBox=false;chatVis=false;">Login</li>
		    <li class="button"ng-hide="isLoggedIn" ng-click="logReg(0);ts=false;showUsersBox=false;chatVis=false;">Register</li>
		    <li class="button" ng-show="isLoggedIn" ng-click="logout();ts=false;showUsersBox=false;dLogin=false;dRegister=false;chatVis=false;">Logout</li>
		    <li class="button" ng-show="isLoggedIn" ng-click="chatVis=!chatVis;ts=false;dLogin=false;dRegister=false;showUsersBox=false;">Chat</li>
		    <li class="button" ng-show="isLoggedIn" ng-click="chatVis=false;ts=false;dLogin=false;dRegister=false;showUsersBox=false;settings=!settings;">Settings</li>
		    <li class="button" ng-click="showUsers();ts=false;dLogin=false;dRegister=false;chatVis=false;">Users</li>
		    <li class="button" ng-click="ts=!ts;dLogin=false;dRegister=false;showUsersBox=false;chatVis=false;">Teamspeak</li>
		</ul>
	    </nav>
	    <br>
	    <section>
		<article><div ng-keypress="keyLogReg($event)" ng-show="dLogin && !isLoggedIn || dRegister && !isLoggedIn">Username: <input class="aInput" ng-model="username" type="text"><br>Password: <input class="aInput" type="password" ng-model="password"><div class="button" ng-click="login()" ng-show="dLogin">Login</div><div class="button" ng-click="register()" ng-show="dRegister">Register</div></div></article>
		<article id="chat" ng-show="isLoggedIn && chatVis">
		    <input ng-keypress="keySend($event)" style="float:left" class="aInput" ng-model="message"><div class="button" style="float:left" ng-click="send()">Send</div><br><br>
		    <span ng-repeat="x in chatArray"><span style="font-size:0.8em">{{x.date.substring(11);}} </span><span style="color:{{usernameStyle(x.username)}}">{{x.username}}</span>> {{x.content}}<br></span>
		</article>
		<article id="users" ng-show="showUsersBox">
		    <span ng-repeat="y in usersArray">Username>[{{y.username}}] Date_registered>{{y.date}}<br></span>
		</article>
		<article ng-show="isLoggedIn && settings">
		    Account name: {{loginName}}
		    Password change: <input type="password" ng-model="changePassword">
		    Avatar URL: <input type="text" ng-moder="changeAvatarURL">
		    Date_Registered: {{loginDateRegistered}}
		    Rank: {{LoginRank}}
		</article>
	    </section>
    </body>
<div ng-show="ts">
     <iframe src="http://cache.www.gametracker.com/components/html0/?host=leafscript.net:9987&bgColor=333333&fontColor=CCCCCC&titleBgColor=222222&titleColor=FF9900&borderColor=555555&linkColor=FFCC00&borderLinkColor=222222&showMap=0&currentPlayersHeight=2000&showCurrPlayers=1&showTopPlayers=0&showBlogs=0&width=300" frameborder="0" scrolling="no" width="300" height="2188"></iframe>
</div>
</html>
