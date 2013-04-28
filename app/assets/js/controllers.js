'use strict';

var language = 'vi';

/* Controllers */
function HomeCtrl($scope, $rootScope, $route, $routeParams){
  console.log($routeParams);
  console.log($route);
  console.log($route.current.templateUrl);
  $scope.yourName = '';
  // i18n.setLang($rootScope.data.options.default.lang).then(function(d){
  //   $rootScope.lang = d;
  // });
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
    $scope.languageList[i].path = $rootScope.data.options.default.img + 
            $scope.languageList[i].short + '.png';
    $scope.languageList[i].url += "/" + $scope.languageList[i].short;
  }
  $scope.description = function(lang){
    switch(lang.toLowerCase())
    {
      case "vi":
        return "Vietnamese";
        break;
      case "en":
        return "English";
        break;
      default:
        return "Language";
    }
  }
}

function MainFooterCtrl($scope, $rootScope, $routeParams){
}

function AboutCtrl($scope, $rootScope, $routeParams){
  var lat = 10.796865;
  var lng = 106.66486;
  var enabled = false;
  var ll = new google.maps.LatLng(lat, lng);

  $scope.mapOptions = {
    center: ll,
    zoom: 16,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoomControl: enabled,
    panControl: enabled,
    draggable: enabled,
    mapMaker: enabled
  };

  $scope.events = {
    'map-click': 'addMarker($event)'
  }

  var marker = new google.maps.Marker({
    map: $scope.myMap,
    position: ll
  });

  $scope.myMarkers = [];
  $scope.myMarkers = [marker];

  $scope.addMarker = function($event) {
    alert('alert');
  };

  $scope.setZoomMessage = function(zoom) {
    console.log(zoom,'zoomed')
  };
}

function EventsCtrl($scope, $rootScope, $routeParams){

}

function TutorialCtrl($scope, $dialog, $rootScope, $routeParams){
}

// the dialog is injected in the specified controller
function DialogController($scope, dialog, $routeParams){
  $scope.close = function(result){
    dialog.close(result);
  };
}

function GlobalCtrl($scope, $rootScope, $routeParams){
  $scope.data_ = {imgLanguage:'img/languages', language:'vi'};
}

function LoginCtrl($scope, $dialog, $rootScope, $routeParams){
  $scope.opts = $rootScope.data.options.dialog;
  $scope.opts.templateUrl = 'partials/login.html';
  $scope.login = function(){
    alert('Login:You call login method');
  }
}

function openDialogLogin($rootScope, $template){
  $rootScope.data.options.dialog.templateUrl = $template;

  var d = $rootScope.dialog.dialog($rootScope.data.options.dialog);
  d.open().then(function(result){
  });
}