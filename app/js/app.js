'use strict';

/* App Module */

angular.module('myApp', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        otherwise({redirectTo: '/'});
}]);
