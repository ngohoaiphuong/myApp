'use strict';

/* Controllers */
function HomeCtrl($scope, $rootScope, $route, $routeParams){
  $scope.yourName = '';
  var url = $rootScope.data.generateURL($routeParams['lang'], '/home');
  $scope.templateUrl = url;
}

function MainMenuCtrl($scope, $rootScope, $routeParams){
  $scope.navClass = function(page){
    var currentRoute = $rootScope.location.path();
    currentRoute = currentRoute.replace(/\//, '');
    return page.name.toLowerCase() === currentRoute.toLowerCase() ? 'active' : '';
  }
}

function MainOptionsCtrl($scope, $rootScope, $routeParams){
  $scope.accountList = $rootScope.data.menus.top_menu.account;
  $scope.languageList = $rootScope.data.menus.top_menu.language;

  for(var i=0; i<$scope.languageList.length; i++){
    $scope.languageList[i].name = $scope.languageList[i].name.toProperCase();
    $scope.languageList[i].path = $rootScope.data.options.default.img + 
            $scope.languageList[i].short + '.png';
    $scope.languageList[i].url += "/" + $scope.languageList[i].short;
  }

  $scope.description = function(lang){
    for(var i=0; i<$scope.languageList.length; i++){
      if($scope.languageList[i].short == lang.toLowerCase()){
        return $scope.languageList[i].name;
      }
    }
    return "Language";
  }
}

function MainFooterCtrl($scope, $rootScope, $routeParams){
}

function AboutCtrl($scope, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/about');
  $scope.templateUrl = url;

  var lat, lng;
  lat = $rootScope.data.options.map.lat;
  lng = $rootScope.data.options.map.lng;
  var ll = new google.maps.LatLng(lat, lng);

  $scope.mapOptions = {
    center: ll,
    zoom: $rootScope.data.options.map.zoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: $rootScope.data.options.map.zoomControl,
    panControl: $rootScope.data.options.map.panControl,
    draggable: $rootScope.data.options.map.draggable,
    mapMaker: $rootScope.data.options.map.mapMaker,
    scrollwheel: $rootScope.data.options.map.scrollwheel,
    disableDoubleClickZoom: $rootScope.data.options.map.disableDblZoom
  };

  var marker = new google.maps.Marker({
    map: $scope.myMap,
    position: ll
  });

  $scope.myMarkers = [];
  $scope.myMarkers = [marker];

  $scope.addMarker = function($event) {
    alert('alert');
    $scope.myMarkers.push(new google.maps.Marker({
      map: $scope.myMap,
      position: $event.latLng
    }));
  };

  $scope.setZoomMessage = function(zoom) {
    console.log('zoomed:' + zoom);
  };
}

function EventsCtrl($scope, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/events');
  $scope.templateUrl = url;
}

function TutorialCtrl($scope, $dialog, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/tutorial');
  $scope.templateUrl = url;
}

function LoginCtrl($scope, $dialog, $rootScope, $routeParams){
  $scope.opts = $rootScope.data.options.dialog;
  $scope.opts.templateUrl = 'partials/login.html';
  $scope.login = function(){
    alert('Login:You call login method');
  }
}

function ProjectsCtrl($scope, $dialog, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/projects');
  $scope.templateUrl = url;
}

function ContactCtrl($scope, $dialog, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/contact');
  $scope.templateUrl = url;
}

function WikisCtrl($scope, $dialog, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/wikis');
  $scope.templateUrl = url;
}

//--------------------------------

function DialogController($scope, dialog, $routeParams){
  $scope.close = function(result){
    dialog.close(result);
  };
}

function openDialogLogin($rootScope, $template){
  $rootScope.data.options.dialog.templateUrl = $template;

  var d = $rootScope.dialog.dialog($rootScope.data.options.dialog);
  d.open().then(function(result){
  });
}

function generateURL(){
  return "Hello";
}