'use strict';

var dialogHandle;

var LoginProfile;
/* App Module */
var myApp = angular.module('onlineASK', ['ui.bootstrap', 'ngCookies', 'ui']);

myApp.run(function($rootScope, $location, $route, $dialog, $http, i18n){
  $rootScope.root = window.location.href;
  $rootScope.root = $rootScope.root.replace(/(\#\/)+/, '');
  $rootScope.root = $rootScope.root.replace(/[^\/]+$/, '');

  $rootScope.location = $location;
  $rootScope.route = $route;
  $rootScope.dialog = $dialog;

  $rootScope.username = myAppData.options.username;
  
  $rootScope.footer = myAppData.templates.footer;
  $rootScope.header = myAppData.templates.header;
  $rootScope.welcome= myAppData.templates.welcome;
  $rootScope.search = {
    "filter":undefined
  };

  $rootScope.contact_detail = {
    "name": undefined,
    "email": undefined,
    "content": undefined
  };

  $rootScope.lang = {};
  $rootScope.data = myAppData;

  var arrMatch = window.location.href.match(/\?lang\=.*$/); 
  if(arrMatch){
    $rootScope.data.options.default.lang = arrMatch[0].replace(/\?lang\=/, '');
  }

  i18n.setLang($rootScope.data.options.default.lang).then(function(d){
    $rootScope.lang = d;
  });

  $rootScope.callFunction = function($options){
    console.log($options);
    if($options.name == "login"){
      openDialogLogin(this, 'partials/template/login.html');
    }
  };

  $rootScope.Switch = function(language){
    $rootScope.data.options.default.lang = language.short;
    var text = $('#language').text();
    $('#language').text(language.name);
    i18n.setLang(language.short).then(function(d){
      $rootScope.lang = d;
      var href = window.location.href;

      if(href.match(/\?lang\=.*$/)){
        href = href.replace(/\?lang\=.*$/, '');
      }
      href+= '?lang=' + language.short;

      window.location.href = href;
    });
  }

  $rootScope.i18n = function(key){
    return $rootScope.lang[key];
  }

  $rootScope.hostlink = function(){
    return $rootScope.data.options.default.hostlink;
  }

  $rootScope.hostname = function(){
    return $rootScope.data.options.default.hostname;
  }

  $rootScope.currentLanguage = function(){
    return i18n.getLang();
  }

  $rootScope.url = function(){
    return $rootScope.data.options.default.url;
  }

  $rootScope.$on('getComplete', function(){
    alert('completed');
  });
});

myApp.config(['$locationProvider', function($location) {
    // $location.html5Mode(true).hashPrefix('!');
    $location.html5Mode(false);
}]);

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    var loading = '<div ng-include="templateUrl"><div class="loading">Loading...</div></div>';

    var route = myAppData.route;
    for(var i=0; i<route.length; i++){
      $routeProvider.when(route[i].when,{
        controller: route[i].controller,
        template: loading
      });  
    }

    $routeProvider.otherwise({redirectTo: '/'});
}]);

$(function(){
  var x = screen.width - 70 + 'px';
  var y = (screen.height/2) + (screen.height/4) + 'px';
  x = $(document).width() - 70 + 'px';
  y = $(document).height() - 60 + 'px';
  console.log('X = ' + x);
  console.log('Y = ' + y);
  console.log('height = ' + $(document).height());
  console.log('width = ' + ($(document).width() - 60));

  $('#onTop').css({
    'top': y, 
    'left': x, 
    'cursor': 'pointer',
    'position': 'fixed',
    'z-index': 100
  });

  $('#onTop').click(function(e){
    $("html, body").animate({ scrollTop: "0px" });
  });

  function OnLoadCallback(){
    console.log('OnLoadCallback');
  }
});

