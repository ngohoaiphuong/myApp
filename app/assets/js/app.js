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

  $http.get('partials/data/data.json').success(function(data) {
    $rootScope.username = data.options.username;
    
    $rootScope.footer = data.templates.footer;
    $rootScope.header = data.templates.header;
    $rootScope.welcome= data.templates.welcome;
    
    $rootScope.data = data;
    $rootScope.lang = {};
    // $rootScope.lang = i18n.setLang($rootScope.data.options.default.lang);
    i18n.setLang($rootScope.data.options.default.lang).then(function(d){
      $rootScope.lang = d;
    });
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
});

myApp.config(['$locationProvider', function($location) {
    // $location.html5Mode(true); //now there won't be a hashbang within URLs for browers that support HTML5 history
  }]);

myApp.config(['$routeProvider', '$locationProvider', '$httpProvider', 
  function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider.
      when('/home', {templateUrl: 'partials/template/home.html',   controller: HomeCtrl}).
      when('/about', {templateUrl: 'partials/template/about.html',   controller: AboutCtrl}).
      when('/tutorial', {templateUrl: 'partials/template/tutorial.html',   controller: TutorialCtrl}).
      when('/events', {templateUrl: 'partials/template/events.html',   controller: EventsCtrl}).
      // when('/login', {templateUrl: 'partials/login.html',   controller: LoginCtrl}).
      when('/login', {templateUrl: 'auth/login.html',   controller: LoginCtrl}).
      when('/projects', {templateUrl: 'partials/template/projects.html',   controller: LoginCtrl}).
      when('/contact', {templateUrl: 'partials/template/contact.html',   controller: LoginCtrl}).
      when('/wikis', {templateUrl: 'partials/template/wikis.html',   controller: LoginCtrl}).
      when('/', {templateUrl: 'partials/welcome.html', controller: HomeCtrl}).
      otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(false);
}]);

