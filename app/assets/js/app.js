'use strict';

/* App Module */
var myApp = angular.module('myApp', ['ui.bootstrap', 'ngCookies', 'ui']);

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

  $rootScope.lang = {};

  $rootScope.data = myAppData;

  i18n.setLang($rootScope.data.options.default.lang).then(function(d){
    $rootScope.lang = d;
  });

  $rootScope.callFunction = function($options){
    if($options.name == "Log In"){
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
});

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    var loading = '<div ng-include="templateUrl"><div class="loading">Loading...</div></div>';

    // $.getJSON('partials/data/route.json', function(route) {
    //   for(var i=0; i<route.length; i++){
    //     $routeProvider.when(route[i].when,{
    //       controller: route[i].controller,
    //       template: loading
    //     });  
    //   }

    //   $routeProvider.otherwise({redirectTo: '/'});

    //   $locationProvider.html5Mode(false);
    // });

    // var route = [
    //   {"when":"/", "controller":HomeCtrl },
    //   {"when":"/about", "controller":AboutCtrl },
    //   {"when":"/tutorial", "controller":TutorialCtrl },
    //   {"when":"/events", "controller":EventsCtrl },
    //   {"when":"/login", "controller":LoginCtrl },
    //   {"when":"/projects", "controller":ProjectsCtrl },
    //   {"when":"/contact", "controller":ContactCtrl },
    //   {"when":"/wikis", "controller":WikisCtrl }
    // ]

    // for(var i=0; i<route.length; i++){
    //   $routeProvider.when(route[i].when,{
    //     controller: route[i].controller,
    //     template: loading
    //   });  
    // }

    var route = myAppData.route;
    for(var i=0; i<route.length; i++){
      $routeProvider.when(route[i].when,{
        controller: route[i].controller,
        template: loading
      });  
    }

    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(false);
}]);

