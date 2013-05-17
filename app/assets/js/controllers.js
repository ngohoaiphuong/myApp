'use strict';

/* Controllers */
function HomeCtrl($scope, $rootScope, $route, $routeParams){
  console.log('home');
  // gapi.client.load('oauth2','v2', function(){
  //   var request = gapi.client.oauth2.userinfo.get();
  //   request.execute( function(profile) {
  //     console.log(profile['email']);
  //     gapi.client.load('plus','v1', function(){
  //       var request = gapi.client.plus.people.get( {'userId' : 'me'} );
  //       request.execute( function(profile) {
  //         console.log(profile['displayName']);
  //         console.log(profile['gender']);
  //         console.log(profile['image']['url']);
  //       });
  //     });
  //   });
  // });

  console.log('completed');

  $scope.yourName = '';
  var url = $rootScope.data.generateURL($routeParams['lang'], '/home');
  $scope.templateUrl = url;
  $scope.items = ["Home", "Contact", "Tutorial", "Maya", "Language", "Events", "Wikis"];
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

function ContactCtrl($scope, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/contact');
  $scope.templateUrl = url;

  $scope.model = { myMap: undefined, myInfoWindow: undefined };

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
    streetViewControl: $rootScope.data.options.map.streetViewControl,
    disableDoubleClickZoom: $rootScope.data.options.map.disableDblZoom
  };

  $scope.myMarkers = [];

  $scope.onMapIdle = function() {
    var marker = new google.maps.Marker({
        map: $scope.model.myMap,
        position: ll
    });
    $scope.myMarkers = [marker, ];
  };
  
  $scope.openMarkerInfo = function(marker) {
    console.log($scope.myInfoWindow);
    $scope.currentMarker = marker;
    $scope.currentMarkerLat = marker.getPosition().lat();
    $scope.currentMarkerLng = marker.getPosition().lng();
    $scope.model.myInfoWindow.open($scope.model.myMap, marker);
  };

  $scope.notBlackListed = function(value) {
    var blacklist = ['bad@domain.com','verybad@domain.com'];
    return blacklist.indexOf(value) === -1;
  }  
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
    dialogHandle.close();
    console.log(LoginProfile);
  }
}

function ProjectsCtrl($scope, $dialog, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/projects');
  $scope.templateUrl = url;
}

function AboutCtrl($scope, $dialog, $rootScope, $routeParams){
  var url = $rootScope.data.generateURL($routeParams['lang'], '/about');
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

  dialogHandle = $rootScope.dialog.dialog($rootScope.data.options.dialog);
  dialogHandle.open().then(function(result){
    console.log('completed');
  });
}

function generateURL(){
  return "Hello";
}